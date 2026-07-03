'use client'

import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

import toast from 'react-hot-toast'
import { getErrorMessage } from '@ozanplanviu/planviu-core'

import { useQueryClient } from '@tanstack/react-query'

import { useFedbacksStaffMutation } from '../hooks/feedback'
import { QUERY_KEY } from '@/data/internal/query-keys'

type TMarkAsReadDialog = {
  open: boolean
  onClose: () => void
  id: string
}

function MarkAsReadDialog({ onClose, open, id }: TMarkAsReadDialog) {
  const { handleSubmit } = useForm()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useFedbacksStaffMutation({
    onSuccess: () => {
      toast.success('Success')
      onClose()
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.FEEDBACKS_STAFF.INDEX]
      })
    },
    onError: err => {
      toast.error(getErrorMessage(err))
    }
  })

  const onProceed = () => {
    mutate({
      method: 'PATCH',
      id: id?.toString()
    })
  }

  const _onClose = () => {
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Mark As Read</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onProceed)}>
          <Typography>Are you sure to proceed this action? It can not be undone</Typography>
          <div className='mt-4 flex gap-2'>
            <Button onClick={_onClose} variant='outlined' disabled={isPending}>
              Cancel
            </Button>
            <Button variant='contained' color='primary' disabled={isPending} type='submit'>
              {isPending ? <CircularProgress size={18} className='text-white' /> : 'Proceed'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default MarkAsReadDialog
