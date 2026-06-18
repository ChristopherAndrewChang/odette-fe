'use client'

import { useState } from 'react'

import KanbanScreenTakeover from '../kanban'
import RunningTextKanban from '../kanban/RunningTextKanban'
import VtronImage from '../kanban/VtronImage'
import VTronTextKanban from '../kanban/VTronTextKanban'
import VTronVideo from '../kanban/VtronVideo'
import ShowMediaDialog from '../ShowMediaDialog'
import MarkPlayedDialog from '../MarkPlayedDialog'
import ReviewRequestDialogV2 from '../ReviewRequestDialogV2'
import CancelScreenTakeoverDialog from '../CancelScreenTakeoverDialog'

type TScreenTakeoverContent = {
  compact?: boolean
}

function ScreenTakeoverContent({ compact }: TScreenTakeoverContent) {
  const [markPlayed, setMarkPlayed] = useState<{ cond: boolean; id: string }>({
    cond: false,
    id: ''
  })

  const [openCancel, setOpenCancel] = useState<{ id: string; cond: boolean }>({
    cond: false,
    id: ''
  })

  const [openApproval, setOpenApproval] = useState<{ cond: boolean; id: string; type: 'approved' | 'rejected' }>({
    cond: false,
    id: '',
    type: 'approved'
  })

  const [showMedia, setShowMedia] = useState<{ cond: boolean; media: string; type: 'video' | 'photo' }>({
    cond: false,
    media: '',
    type: 'photo'
  })

  return (
    <>
      <ReviewRequestDialogV2
        onClose={() => {
          setOpenApproval({
            cond: false,
            id: '',
            type: 'approved'
          })
        }}
        open={openApproval.cond}
        type={openApproval.type}
        id={openApproval.id}
      />
      <MarkPlayedDialog
        id={markPlayed.id}
        open={markPlayed.cond}
        onClose={() => {
          setMarkPlayed({
            cond: false,
            id: ''
          })
        }}
      />
      <ShowMediaDialog
        mediaUrl={showMedia.media}
        open={showMedia.cond}
        type={showMedia.type}
        onClose={() => {
          setShowMedia({
            cond: false,
            media: '',
            type: 'photo'
          })
        }}
      />

      <CancelScreenTakeoverDialog
        onClose={() => {
          setOpenCancel({
            cond: false,
            id: ''
          })
        }}
        id={openCancel.id}
        open={openCancel.cond}
      />

      <KanbanScreenTakeover
        runningTextSlot={{
          content: (
            <RunningTextKanban
              compact={compact}
              onMarkPlayed={id => {
                setMarkPlayed({
                  cond: true,
                  id: id
                })
              }}
              onCancel={id => {
                setOpenCancel({
                  cond: true,
                  id: id
                })
              }}
              onAccept={id => {
                setOpenApproval({
                  cond: true,
                  id: id,
                  type: 'approved'
                })
              }}
              onReject={id => {
                setOpenApproval({
                  cond: true,
                  id: id,
                  type: 'rejected'
                })
              }}
            />
          )
        }}
        vtronImageSlot={{
          content: (
            <VtronImage
              compact={compact}
              onMarkPlayed={id => {
                setMarkPlayed({
                  cond: true,
                  id: id
                })
              }}
              onCancel={id => {
                setOpenCancel({
                  cond: true,
                  id: id
                })
              }}
              onShowMedia={media => {
                setShowMedia({
                  cond: true,
                  media: media,
                  type: 'photo'
                })
              }}
              onAccept={id => {
                setOpenApproval({
                  cond: true,
                  id: id,
                  type: 'approved'
                })
              }}
              onReject={id => {
                setOpenApproval({
                  cond: true,
                  id: id,
                  type: 'rejected'
                })
              }}
            />
          )
        }}
        vtronTextSlot={{
          content: (
            <VTronTextKanban
              compact={compact}
              onMarkPlayed={id => {
                setMarkPlayed({
                  cond: true,
                  id: id
                })
              }}
              onCancel={id => {
                setOpenCancel({
                  cond: true,
                  id: id
                })
              }}
              onAccept={id => {
                setOpenApproval({
                  cond: true,
                  id: id,
                  type: 'approved'
                })
              }}
              onReject={(id: string) => {
                setOpenApproval({
                  cond: true,
                  id: id,
                  type: 'rejected'
                })
              }}
            />
          )
        }}
        vtronVideoSlot={{
          content: (
            <VTronVideo
              compact={compact}
              onMarkPlayed={id => {
                setMarkPlayed({
                  cond: true,
                  id: id
                })
              }}
              onCancel={id => {
                setOpenCancel({
                  cond: true,
                  id: id
                })
              }}
              onShowMedia={media => {
                setShowMedia({
                  cond: true,
                  media: media,
                  type: 'video'
                })
              }}
              onAccept={id => {
                setOpenApproval({
                  cond: true,
                  id: id,
                  type: 'approved'
                })
              }}
              onReject={(id: string) => {
                setOpenApproval({
                  cond: true,
                  id: id,
                  type: 'rejected'
                })
              }}
            />
          )
        }}
      />
    </>
  )
}

export default ScreenTakeoverContent
