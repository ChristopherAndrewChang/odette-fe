'use client'

import dayjs from 'dayjs'

import { CustomTextField } from '@ozanplanviu/planviu-core'

import KanbanCard from './KanbanCard'
import KanbanScreenTakeoverContainer from './KanbanScreenTakeoverContainer'

type TVTronVideo = {
  compact?: boolean
  onAccept: (id: string) => void
  onReject: (id: string) => void
  onMarkPlayed: (id: string) => void
  onShowMedia: (media: string) => void
  onCancel: (id: string) => void
}

function VTronVideo({ compact, onAccept, onReject, onMarkPlayed, onShowMedia, onCancel }: TVTronVideo) {
  return (
    <KanbanScreenTakeoverContainer
      title='VTRON VIDEO'
      type='vtron_video'
      SearchComponent={(search, setSearch) => (
        <CustomTextField
          placeholder='Search'
          className='my-2'
          value={search}
          onChange={e => {
            setSearch(e.target.value)
          }}
        />
      )}
      CardComponent={data => (
        <KanbanCard
          contentType='video'
          compact={compact}
          donationAmount={Number(data?.donation_amount)?.toLocaleString() || ''}
          status={data.status as any} // TODO: make the data.status type for enum, not string
          table={data?.table_number?.toString()}
          time={dayjs(data?.created_at).format('DD/MM/YYYY HH:mm A')}
          user={data?.customer_name || ''}
          onAccept={() => onAccept(data?.id?.toString())}
          onReject={() => onReject(data?.id?.toString())}
          onMarkPlayed={() => onMarkPlayed(data?.id?.toString())}
          onShowImage={() => {
            onShowMedia(data?.media_file?.toString() || '')
          }}
          onCancel={() => onCancel(data?.id?.toString())}
          textContent={{
            content: data?.message || ''
          }}
          videoContent={{
            title: data?.media_file || '',
            video: data?.media_file || ''
          }}
        />
      )}
    />
  )
}

export default VTronVideo
