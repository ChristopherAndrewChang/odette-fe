'use client'

import type { ReactNode } from 'react'

import { Dialog, DialogContent } from '@mui/material'

import { useColor } from '@/hooks/color'
import PaymentInstruction from './PaymentInstruction'

type TPaymentDialog = {
  open: boolean
  onClose: () => void
  nominal: string
  renderButton: ReactNode
}

function PaymentDialog({ onClose, open, renderButton, nominal }: TPaymentDialog) {
  const { DARKBLUE, DARKGRAY } = useColor()

  const _onClose = () => {
    onClose()
  }

  return (
    <Dialog open={open} onClose={_onClose} fullWidth>
      <DialogContent style={{ backgroundColor: DARKBLUE }}>
        <p className='font-outfit text-xl font-semibold text-white mb-4'>
          Hello 👋 <br />
          you need to pay first before proceeding your request
        </p>

        <div style={{ backgroundColor: DARKGRAY }} className='p-4 rounded-lg border border-gray-700 mb-4'>
          <p className='text-gray-400 font-outfit font-semibold text-lg mb-4'>Scan Here to Pay</p>
          <div className='grid lg:grid-cols-2 gap-2'>
            <div className='bg-white flex-1 w-full h-64 rounded-lg' />
            <div className='flex flex-col gap-1 flex-1'>
              <p className='text-xl font-outfit font-medium text-white'>BCA - Odette Buffet</p>
              <p className='text-gray-400 font-outfit'>a.n. Odette Buffet Lounge</p>

              <div className='flex flex-wrap gap-1 border-t border-gray-800 pt-2'>
                <div className='border border-gray-600 rounded-lg px-2 py-1 text-gray-500 text-xs'>M-Banking</div>

                <div className='border border-gray-600 rounded-lg px-2 py-1 text-gray-500 text-xs'>Gopay</div>

                <div className='border border-gray-600 rounded-lg px-2 py-1 text-gray-500 text-xs'>OVO</div>

                <div className='border border-gray-600 rounded-lg px-2 py-1 text-gray-500 text-xs'>DANA</div>

                <div className='border border-gray-600 rounded-lg px-2 py-1 text-gray-500 text-xs'>ShopeePay</div>
              </div>
            </div>
          </div>
        </div>

        <PaymentInstruction nominal={nominal} />

        {/* notes */}
        {/* <div style={{ backgroundColor: DARKGRAY }} className='p-4 rounded-lg border border-gray-700'>
          <div className='flex items-center gap-2 mb-4'>
            <p className='text-gray-300 font-semibold text-lg font-outfit'>NOTES</p>
            <div className='bg-red-950 px-3 py-1 rounded-full border border-red-800'>
              <p className='text-red-300 text-xs'>Important</p>
            </div>
          </div>

          <p className='text-gray-400 font-outfit font-semibold mb-2'>
            You are required to include a payment note/reference when making the transfer
          </p>
          <div className='p-4 border rounded-lg border-gray-600'>
            <p className='text-gray-400 font-outfit font-semibold'>Contoh</p>
            <p className='text-gray-100 font-outfit font-semibold text-lg'>Table A1 - Dea - Running Text</p>
            <p className='text-gray-400 font-outfit'>[Table Number] [Name] [Request Type]</p>
          </div>
        </div> */}

        {renderButton}
      </DialogContent>
    </Dialog>
  )
}

export default PaymentDialog
