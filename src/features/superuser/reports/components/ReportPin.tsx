'use client'

import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'

import { Button, Typography, useColorScheme } from '@mui/material'

import { OTPInput } from 'input-otp'

import toast from 'react-hot-toast'

import classNames from 'classnames'

import OtpSlot from './OtpSlot'
import { deriveKey, generateSalt } from '../utils/security'

type TReportPinDialog = {
  setAllowShow: Dispatch<SetStateAction<boolean>>
}

function ReportPin({ setAllowShow }: TReportPinDialog) {
  const [pinOtp, setPinOtp] = useState('')
  const { mode } = useColorScheme()

  const onSubmit = () => {
    if (pinOtp === 'ovip12') {
      setAllowShow(true)
    } else {
      toast.error('Invalid Pin')
    }
  }

  useEffect(() => {
    deriveKey('123456', generateSalt(32).toString()).then(value => {
      console.log('cryptokey', value)
    })
  }, [])

  return (
    <div className='flex flex-col gap-4 items-start overflow-auto'>
      <Typography
        className={classNames('uppercase text-black font-medium', {
          '!text-white': mode === 'dark'
        })}
      >
        Enter pin to proceed
      </Typography>
      <OTPInput
        maxLength={6}
        value={pinOtp}
        onChange={newValue => {
          setPinOtp(newValue)
        }}
        render={({ slots }) => (
          <div className='flex gap-2'>
            {slots.map((slot, i) => (
              <OtpSlot key={i} {...slot} />
            ))}
          </div>
        )}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            onSubmit()
          }
        }}
      />

      <Button variant='tonal' onClick={onSubmit}>
        Submit
      </Button>
    </div>
  )
}

export default ReportPin
