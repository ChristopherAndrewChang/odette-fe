'use client'

import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'

type TCancelDialog = {
  open: boolean
  onClose: () => void
  id: string
}

function CancelDialog({ onClose, open }: TCancelDialog) {
  const onSubmit = () => {}

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Cancel Confirmation</DialogTitle>
      <DialogContent>
        <Typography>Are you sure to proceed this action? It can not be undone.</Typography>
        <div className='flex gap-2 mt-4'>
          <Button onClick={onClose} variant='outlined' color='inherit'>
            Cancel
          </Button>
          <Button onClick={onSubmit} variant='contained'>
            {false ? <CircularProgress size={14} /> : 'Proceed'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CancelDialog
