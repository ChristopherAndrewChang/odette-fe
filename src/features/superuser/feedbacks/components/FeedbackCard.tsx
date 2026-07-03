// 'use client'

// import { Button, Typography } from '@mui/material'

// import classNames from 'classnames'

// import dayjs from 'dayjs'

// import type { TFeedbacks } from '../types/feedback'

// type TFeedbackCard = {
//   data: TFeedbacks
//   onMarkAsRead: () => void
// }

// function FeedbackCard({ data, onMarkAsRead }: TFeedbackCard) {
//   return (
//     <div className='grid grid-cols-3 gap-2 border-b mb-6 pb-6'>
//       <div className='col-span-3 flex items-center gap-2 mb-4'>
//         <Typography className='text-xs italic'>{dayjs(data?.created_at).format('DD MMM YYYY, HH:mm A')}</Typography>

//         {data?.is_read ? (
//           <div className='flex items-center gap-1'>
//             <i className='tabler-checks text-green-600 text-sm'></i>
//             <Typography className='text-green-600 text-xs'>Read</Typography>
//           </div>
//         ) : null}
//       </div>
//       {/* data personal */}
//       <div>
//         <Typography className='font-semibold text-black text-lg mb-2'>{data?.customer_name}</Typography>
//         <Typography className='text-sm'>{data?.email}</Typography>
//         <Typography className='text-xs'>{data?.phone_number}</Typography>
//         <Typography className='text-xs'>Table {data?.table_number}</Typography>

//         {!!data?.email_sent ? (
//           <div className='flex items-center gap-1 mt-4'>
//             <i className='tabler-mail text-green-600 text-sm'></i>
//             <Typography className='text-green-600 text-xs'>Email Sent</Typography>
//           </div>
//         ) : (
//           <div className='flex items-center gap-1 mt-4'>
//             <i className='tabler-mail text-error text-sm'></i>
//             <Typography className='text-xs text-error'>
//               Email not sent yet {!!data?.email_error ? `[${data.email_error}]` : null}
//             </Typography>
//           </div>
//         )}
//       </div>

//       {/* review */}
//       <div className='col-span-2'>
//         <Typography
//           className={classNames({
//             'text-black font-medium mb-4': !data?.is_read
//           })}
//         >
//           {data?.message}
//         </Typography>

//         {data?.is_read ? null : (
//           <Button onClick={onMarkAsRead} variant='tonal' size='small'>
//             Mark as Read
//           </Button>
//         )}
//       </div>
//     </div>
//   )
// }

// export default FeedbackCard

'use client'

import { Button, Typography } from '@mui/material'

import classNames from 'classnames'

import dayjs from 'dayjs'

import type { TFeedbacks } from '../types/feedback'

type TFeedbackCard = {
  data: TFeedbacks
  onMarkAsRead: () => void
}

function FeedbackCard({ data, onMarkAsRead }: TFeedbackCard) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-2 border-b mb-6 pb-6'>
      <div className='col-span-1 sm:col-span-3 flex flex-wrap items-center gap-2 mb-2 sm:mb-4'>
        <Typography className='text-xs italic'>{dayjs(data?.created_at).format('DD MMM YYYY, HH:mm A')}</Typography>

        {data?.is_read ? (
          <div className='flex items-center gap-1'>
            <i className='tabler-checks text-green-600 text-sm'></i>
            <Typography className='text-green-600 text-xs'>Read</Typography>
          </div>
        ) : null}
      </div>

      {/* data personal */}
      <div className='col-span-1'>
        <Typography className='font-semibold text-black text-base sm:text-lg mb-2 break-words'>
          {data?.customer_name}
        </Typography>
        <Typography className='text-sm break-all'>{data?.email}</Typography>
        <Typography className='text-xs'>{data?.phone_number}</Typography>
        <Typography className='text-xs'>Table {data?.table_number}</Typography>

        {!!data?.email_sent ? (
          <div className='flex items-center gap-1 mt-4'>
            {/* <i className='tabler-mail text-green-600 text-sm'></i> */}
            <Typography className='text-green-600 text-xs'>Email Sent</Typography>
          </div>
        ) : (
          <div className='flex items-center gap-1 mt-4'>
            {/* <i className='tabler-mail text-error text-sm'></i> */}
            <Typography className='text-xs text-error'>
              Email not sent yet {!!data?.email_error ? `[${data.email_error}]` : null}
            </Typography>
          </div>
        )}
      </div>

      {/* review */}
      <div className='col-span-1 sm:col-span-2'>
        <Typography
          className={classNames('break-words', {
            'text-black font-medium mb-4': !data?.is_read
          })}
        >
          {data?.message}
        </Typography>

        {data?.is_read ? null : (
          <Button onClick={onMarkAsRead} variant='tonal' size='small' fullWidth className='sm:w-auto'>
            Mark as Read
          </Button>
        )}
      </div>
    </div>
  )
}

export default FeedbackCard
