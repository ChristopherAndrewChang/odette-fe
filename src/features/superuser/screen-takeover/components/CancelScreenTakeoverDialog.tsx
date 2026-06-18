'use client'

import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'

import toast from 'react-hot-toast'

import { useQueryClient } from '@tanstack/react-query'

import { getErrorMessage } from '@ozanplanviu/planviu-core'

import { useScreenTakeoverCancelMutation } from '../hooks/screen-takeover'
import { QUERY_KEY } from '@/data/internal/query-keys'

type TCancelScreenTakeoverDialog = {
  open: boolean
  onClose: () => void
  id: string
}

function CancelScreenTakeoverDialog({ onClose, open, id }: TCancelScreenTakeoverDialog) {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useScreenTakeoverCancelMutation({
    onSuccess: () => {
      toast.success('Success')
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.SCREEN_TAKEOVER.INDEX]
      })
      onClose()
    },
    onError: err => {
      toast.error(getErrorMessage(err))
    }
  })

  const onSubmit = () => {
    mutate({
      method: 'PATCH',
      id: id
    })
  }

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Cancel Confirmation</DialogTitle>
      <DialogContent>
        <main className='flex flex-col gap-4'>
          <Typography>Are you sure to proceed? This action can not be undone</Typography>
          <div className='flex gap-2'>
            <Button disabled={isPending} variant='outlined' color='inherit' onClick={onClose}>
              Cancel
            </Button>
            <Button variant='contained' disabled={isPending} onClick={onSubmit}>
              {isPending ? <CircularProgress size={18} className='text-white' /> : 'Proceed'}
            </Button>
          </div>
        </main>
      </DialogContent>
    </Dialog>
  )
}

export default CancelScreenTakeoverDialog
