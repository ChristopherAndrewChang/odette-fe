'use client'

import { Button, CircularProgress, Dialog, DialogContent, Divider, Typography } from '@mui/material'

type TSwitchColDialog = {
    open: boolean
    onClose: () => void
    onProceed: () => void
    loading?: boolean
}

function SwitchConfirmationDialog({ onClose, open, onProceed, loading }: TSwitchColDialog) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                <Typography className='text-lg font-medium'>Confirmation</Typography>
                <Divider className='my-2' />
                <Typography>This action can not be undone. Are you sure to proceed this action?</Typography>
                <div className='flex items-center gap-2 justify-end mt-4'>
                    <Button onClick={onClose} size='small' variant='outlined'>
                        Cancel
                    </Button>
                    <Button onClick={onProceed} variant='contained' size='small'>
                        {loading ? <CircularProgress size={18} className='text-white' /> : 'Proceed'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SwitchConfirmationDialog;
