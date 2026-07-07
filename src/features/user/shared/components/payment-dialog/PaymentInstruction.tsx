import React from 'react'

import { colors } from '@/hooks/color'

type TPaymentInstruction = {
  nominal: string
}

function PaymentInstruction({ nominal }: TPaymentInstruction) {
  return (
    <div
      style={{ backgroundColor: colors.DARKGRAY }}
      className='p-4 rounded-lg flex flex-col gap-2 border border-gray-700 mb-4'
    >
      <p className='text-gray-400 font-outfit font-semibold uppercase border-b border-gray-700 pb-2 text-center'>
        Petunjuk Pembayaran
      </p>
      <p className='text-gray-300'>
        {'> '}
        Buka aplikasi{' '}
        <span className='font-semibold' style={{ color: colors.GOLD }}>
          e-wallet
        </span>{' '}
        atau{' '}
        <span className='font-semibold' style={{ color: colors.GOLD }}>
          m-banking
        </span>{' '}
        GoPay, DANA, OVO, ShopeePay, atau bank apa pun
      </p>

      <p className='text-gray-300'>
        {'> '}Pilih menu{' '}
        <span className='font-semibold' style={{ color: colors.GOLD }}>
          Scan QRIS
        </span>
        , lalu arahkan ke kode di atas
      </p>

      <p className='text-gray-300'>
        {'> '}Pastikan nominal tepat :{' '}
        <span className='font-bold' style={{ color: colors.GOLD }}>
          Rp{nominal}
        </span>
        <span className='italic font-thin'> (Jangan diubah. 3 digit terakhir adalah kode meja Anda)</span>
      </p>

      <p className='text-gray-300'>
        {'> '}
        Selesaikan pembayaran, lalu{' '}
        <span className='font-semibold' style={{ color: colors.GOLD }}>
          tekan Saya Sudah Bayar
        </span>
      </p>
    </div>
  )
}

export default PaymentInstruction
