'use client'

import dayjs from 'dayjs'

import { CustomTextField } from '@ozanplanviu/planviu-core'

import KanbanCard from './KanbanCard'
import KanbanScreenTakeoverContainer from './KanbanScreenTakeoverContainer'

type TRunningTextKanban = {
  compact?: boolean
  onAccept: (id: string) => void
  onReject: (id: string) => void
  onMarkPlayed: (id: string) => void
  onCancel: (id: string) => void
}

function RunningTextKanban({ onAccept, onReject, onMarkPlayed, compact, onCancel }: TRunningTextKanban) {
  return (
    <KanbanScreenTakeoverContainer
      title='RUNNING TEXT'
      type='running_text'
      SearchComponent={(search, setSearch) => (
        <CustomTextField
          placeholder='Search'
          className='my-2 w-full'
          value={search}
          onChange={e => {
            setSearch(e.target.value)
          }}
        />
      )}
      CardComponent={_data => (
        <>
          <KanbanCard
            key={_data?.id || ''}
            compact={compact}
            contentType='text'
            donationAmount={Number(_data?.donation_amount)?.toLocaleString()}
            status={_data.status as any} // TODO: adjust any ini
            table={`T${_data?.table_number?.toString()}`}
            time={dayjs(_data?.created_at).format('DD/MM/YYYY HH:mm A')}
            user={_data?.customer_name || ''}
            onAccept={() => onAccept(_data?.id?.toString())}
            onReject={() => onReject(_data?.id?.toString())}
            onCancel={() => onCancel(_data?.id?.toString())}
            onMarkPlayed={() => onMarkPlayed(_data?.id?.toString())}
            textContent={{
              content: _data?.message
            }}
          />
        </>
      )}
    />
  )
}

export default RunningTextKanban
