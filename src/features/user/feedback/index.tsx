'use client'

import { Controller, useForm } from 'react-hook-form'

import { Button, CircularProgress } from '@mui/material'

import toast from 'react-hot-toast'

import { getErrorMessage } from '@ozanplanviu/planviu-core'

import UserBackButton from '../shared/components/UserBackButton'
import UserContainer from '../shared/components/UserContainer'
import GroupTitle from '../screen-takeover/components/GroupTitle'
import { useColor } from '@/hooks/color'
import { useFeedbackUserMutation } from './hooks/feedback'

type TRequest = {
  name: string
  email: string
  phone_number: string
  message: string
}

function UserFeedbacksPage() {
  const { control, handleSubmit, reset } = useForm<TRequest>({
    defaultValues: {
      email: '',
      message: '',
      name: '',
      phone_number: ''
    }
  })

  const { mutate, isPending } = useFeedbackUserMutation({
    onSuccess: () => {
      toast.success('Successfully Sent, Thank you for your feedback')
      reset({
        email: '',
        message: '',
        name: '',
        phone_number: ''
      })
    },
    onError: err => {
      toast.error(getErrorMessage(err))
    }
  })

  const { DARKBLUE, GRAY } = useColor()

  const onSubmit = (data: TRequest) => {
    if (!data.name.trim()) {
      toast.error('Name may not be blank')

      return
    }

    if (!data.email.trim()) {
      toast.error('Email may not be blank')

      return
    }

    if (!data.phone_number.trim()) {
      toast.error('Phone number may not be blank')

      return
    }

    if (!data.message.trim()) {
      toast.error('Message may not be blank')

      return
    }

    mutate({
      method: 'POST',
      data
    })
  }

  return (
    <UserContainer>
      <header className='flex flex-col gap-2 mb-16'>
        <UserBackButton href='/user/home' />
        <p className='font-poppins text-4xl text-gray-300'>
          Share your thoughts <span className='font-semibold text-white'>with us</span>
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-8'>
          <GroupTitle title='Your Name' />
          <Controller
            control={control}
            name='name'
            render={({ field: { value, onChange } }) => (
              <input
                className='block w-full p-4 rounded-xl border text-white font-poppins text-lg focus:outline-none'
                style={{
                  backgroundColor: DARKBLUE,
                  borderWidth: 0.4,
                  borderColor: `${GRAY}70`
                }}
                value={value}
                onChange={e => onChange(e.target.value)}
              />
            )}
          />
        </div>

        <div className='mb-8'>
          <GroupTitle title='Your Email' />
          <Controller
            control={control}
            name='email'
            render={({ field: { value, onChange } }) => (
              <input
                className='block w-full p-4 rounded-xl border text-white font-poppins text-lg focus:outline-none'
                style={{
                  backgroundColor: DARKBLUE,
                  borderWidth: 0.4,
                  borderColor: `${GRAY}70`
                }}
                value={value}
                onChange={e => onChange(e.target.value)}
              />
            )}
          />
        </div>

        <div className='mb-8'>
          <GroupTitle title='Your Phone Number' />
          <Controller
            control={control}
            name='phone_number'
            render={({ field: { value, onChange } }) => (
              <input
                className='block w-full p-4 rounded-xl border text-white font-poppins text-lg focus:outline-none'
                style={{
                  backgroundColor: DARKBLUE,
                  borderWidth: 0.4,
                  borderColor: `${GRAY}70`
                }}
                value={value}
                onChange={e => onChange(e.target.value)}
              />
            )}
          />
        </div>

        <div className='mb-8'>
          <GroupTitle title='Your Message' />
          <Controller
            control={control}
            name='message'
            render={({ field: { value, onChange } }) => (
              <textarea
                placeholder='e.g. Great Night'
                className='block w-full p-4 rounded-xl border text-white font-poppins text-lg focus:outline-none'
                style={{
                  backgroundColor: DARKBLUE,
                  borderWidth: 0.4,
                  borderColor: `${GRAY}70`
                }}
                value={value}
                onChange={e => onChange(e.target.value)}
              />
            )}
          />
        </div>

        <Button
          type='submit'
          size='large'
          variant='contained'
          fullWidth
          disabled={isPending}
          className='text-white my-3 bg-amber-900'
          style={
            {
              // backgroundImage: `linear-gradient(to right, ${GOLD}, ${GOLD},${GOLD}, ${GOLD}, ${GOLD},${GOLD}90)`
            }
          }
        >
          {isPending ? <CircularProgress size={20} className='text-white' /> : 'Send'}
        </Button>
      </form>
    </UserContainer>
  )
}

export default UserFeedbacksPage
