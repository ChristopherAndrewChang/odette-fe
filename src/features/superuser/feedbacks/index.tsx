'use client'

import { useState } from 'react'

import { Typography } from '@mui/material'

import AppLayout from '@/components/internal/AppLayout'
import FeedbackCard from './components/FeedbackCard'
import MarkAsReadDialog from './components/MarkAsReadDialog'
import { useFeedbacksForStaffInfiniteQuery } from './hooks/feedback'
import { useInfiniteScroll } from '@/@pv/hooks/use-infinite-scroll'

function FeedbacksManagementPage() {
  const [markAsReadState, setMarkAsReadState] = useState<{ id: string; cond: boolean }>({
    cond: false,
    id: ''
  })

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useFeedbacksForStaffInfiniteQuery()

  const feedbacks = data?.pages.flatMap(_data => _data.results)

  const { lastElementRef, nextPageFetchingIndicator } = useInfiniteScroll({
    onNextPage: fetchNextPage,
    props: {
      hasNextPage: hasNextPage,
      isFetchingNextPage: isFetchingNextPage,
      isLoading: isLoading
    }
  })

  if (!data?.pages?.[0]?.count) {
    return (
      <AppLayout title='Feedbacks' withMaxH>
        <div className='p-4 bg-gray-50 rounded-lg border'>
          <Typography>No Feedback</Typography>
        </div>
      </AppLayout>
    )
  }

  return (
    <>
      <MarkAsReadDialog
        open={markAsReadState.cond}
        onClose={() => {
          setMarkAsReadState({
            cond: false,
            id: ''
          })
        }}
        id={markAsReadState.id}
      />
      <AppLayout title='Feedbacks' withMaxH>
        <div className='h-full w-full overflow-y-auto'>
          {feedbacks?.map((feedback, i) => (
            <>
              <FeedbackCard
                key={feedback?.id}
                data={feedback}
                onMarkAsRead={() => {
                  setMarkAsReadState({ cond: true, id: feedback?.id?.toString() })
                }}
              />
              {i + 1 === feedbacks?.length ? (
                <div ref={lastElementRef} className='flex justify-center w-full'>
                  {nextPageFetchingIndicator}
                </div>
              ) : null}
            </>
          ))}
        </div>
      </AppLayout>
    </>
  )
}

export default FeedbacksManagementPage
