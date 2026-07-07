'use client'

import toast from 'react-hot-toast'

import { useQueryClient } from '@tanstack/react-query'

import { getErrorMessage } from '@ozanplanviu/planviu-core'

import { Button, CircularProgress } from '@mui/material'

import PaymentDialog from '../../shared/components/payment-dialog/PaymentDialog'
import type { TSongRequest } from '../types/song-request'
import { useSongRequestMutation } from '../hooks/song-request'

import { QUERY_KEY } from '@/data/internal/query-keys'

type TSongPaymentDialog = {
  open: boolean
  onClose: () => void
  data: TSongRequest
}

function SongPaymentDialog({ data, onClose, open }: TSongPaymentDialog) {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useSongRequestMutation({
    onSuccess: () => {
      toast.success('Song requested! Keep an eye on your history for updates.')
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.MY_SONG_REQUEST.INDEX]
      })
      onClose()
    },
    onError: err => {
      toast.error(getErrorMessage(err))
    }
  })

  const onProceed = () => {
    mutate({
      method: 'POST',
      data: {
        ...data,
        donation_amount: data?.donation === 'custom' ? data?.donation_amount : data?.donation
      }
    })
  }

  return (
    <PaymentDialog
      open={open}
      onClose={onClose}
      renderButton={
        <div className='flex flex-col gap-2'>
          <Button onClick={onProceed} variant='contained' className='bg-yellow-600 hover:bg-yellow-700 transition-all'>
            {isPending ? <CircularProgress size={18} className='text-white' /> : 'Saya sudah bayar'}
          </Button>
          <div
            onClick={onClose}
            className='px-4 py-2 text-gray-300 text-center cursor-pointer hover:bg-gray-950 rounded-lg transition-all'
          >
            Batal
          </div>
        </div>
      }
      nominal={
        data.donation !== 'custom'
          ? (Number(data?.donation) + 12)?.toLocaleString()
          : Number(data?.donation_amount)?.toLocaleString()
      }
    />
  )
}

export default SongPaymentDialog
