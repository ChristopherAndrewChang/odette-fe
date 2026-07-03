'use client'

import { useState } from 'react'

import { CircularProgress, Typography } from '@mui/material'

import { CustomTextField } from '@ozanplanviu/planviu-core'

import AppLayout from '@/components/internal/AppLayout'
import MarkAsReadDialog from './components/MarkAsReadDialog'
import { useFeedbacksForStaffInfiniteQuery } from './hooks/feedback'
import { useInfiniteScroll } from '@/@pv/hooks/use-infinite-scroll'
import FeedbackCard from './components/FeedbackCard'
import { useDebounce } from '@/@pv/hooks/use-debounce'

const NoFeedback = () => {
  return (
    <div className='p-4 bg-gray-50 rounded-lg border'>
      <Typography>No Feedback</Typography>
    </div>
  )
}

function FeedbacksManagementPage() {
  const [markAsReadState, setMarkAsReadState] = useState<{ id: string; cond: boolean }>({
    cond: false,
    id: ''
  })

  const [search, setSearch] = useState('')
  const searchDebounced = useDebounce(search, 500)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isFetching } =
    useFeedbacksForStaffInfiniteQuery({
      search: searchDebounced
    })

  const feedbacks = data?.pages.flatMap(_data => _data?.data?.results)

  const { lastElementRef, nextPageFetchingIndicator } = useInfiniteScroll({
    onNextPage: fetchNextPage,
    props: {
      hasNextPage: hasNextPage,
      isFetchingNextPage: isFetchingNextPage,
      isLoading: isLoading
    }
  })

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
        <CustomTextField
          fullWidth
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Search Here'
          className='mb-6'
        />

        {isFetching && !isFetchingNextPage ? (
          <div className='w-full flex items-center justify-center h-32'>
            <CircularProgress />
          </div>
        ) : null}

        {!isFetching && feedbacks?.length === 0 ? (
          <NoFeedback />
        ) : (
          <div className='h-full w-full overflow-y-auto'>
            {feedbacks?.map((feedback, i) => (
              <div key={`${feedback.id}-${i}`}>
                <FeedbackCard
                  key={feedback?.id}
                  data={feedback}
                  onMarkAsRead={() => {
                    setMarkAsReadState({ cond: true, id: feedback?.id?.toString() })
                  }}
                />
                {i + 1 === feedbacks?.length ? (
                  <div ref={lastElementRef} className='flex justify-center w-full my-6'>
                    {nextPageFetchingIndicator}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </AppLayout>
    </>
  )
}

export default FeedbacksManagementPage
