'use client'

import { Typography, useColorScheme } from '@mui/material'
import classNames from 'classnames'
import type { SlotProps } from 'input-otp'

function OtpSlot({ char, hasFakeCaret, isActive }: SlotProps) {
  const { mode } = useColorScheme()

  return (
    <div
      className={`relative flex h-12 w-12 items-center justify-center rounded-lg border text-lg ${
        isActive ? 'border-blue-500' : 'border-gray-300'
      }`}
    >
      {/* kalau ada char, tampilkan bullet • */}
      {char ? (
        <Typography
          className={classNames('text-2xl text-black leading-none -mb-2', {
            '!text-white': mode === 'dark'
          })}
        >
          *
        </Typography>
      ) : (
        ''
      )}
      {/* caret palsu */}
      {hasFakeCaret && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className={classNames('h-5 w-px bg-black animate-pulse', { '!bg-white': mode === 'dark' })} />
        </div>
      )}
    </div>
  )
}

export default OtpSlot
