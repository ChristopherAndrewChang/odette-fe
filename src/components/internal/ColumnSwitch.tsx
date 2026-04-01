'use client'

import { useState } from 'react'

import { Switch } from '@mui/material'
import type { GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid'

import type { UseMutationResult } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'

import { useSetAtom } from 'jotai';

import toast from 'react-hot-toast'

import { type MutationFunctionType, type ErrorType, type MutateParamsType, getErrorMessage } from '@ozanplanviu/planviu-core'

import SwitchConfirmationDialog from './SwitchConfirmationDialog'
import { ColumnStatus } from './ColumnStatus'
import { DisableFetchIndicatorAtom } from '@/store/fetchIndicator'

type TColumnSwitch = {
    mutation: ({ onSuccess, onError }: MutationFunctionType<any>) => UseMutationResult<
        unknown,
        ErrorType,
        MutateParamsType,
        unknown
    >
    params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    queryKey: string
    readonly?: boolean
}

function ColumnSwitch({ params, mutation, readonly, queryKey }: TColumnSwitch) {
    const { value, id, field } = params

    const setDisableFetchIndicatorAtom = useSetAtom(DisableFetchIndicatorAtom)
    const [openDialog, setOpenDialog] = useState(false)

    const queryClient = useQueryClient()

    const { mutate, isPending } = mutation({
        onSuccess: () => {
            setDisableFetchIndicatorAtom(true)

            toast.success('Success')
            setOpenDialog(false)

            queryClient
                .invalidateQueries({
                    queryKey: [queryKey]
                })
                .then(() => {
                    setDisableFetchIndicatorAtom(false)
                })
        },
        onError: (err) => {
            toast.error(getErrorMessage(err));
        }
    })

    const onSwitchHandler = () => {
        setOpenDialog(true)
    }

    if (!readonly) {
        return (
            <>
                <SwitchConfirmationDialog
                    open={openDialog}
                    onClose={() => {
                        setOpenDialog(false)
                    }}
                    loading={isPending}
                    onProceed={() => {
                        mutate({
                            method: "PATCH",
                            id: String(id),
                            data: {
                                [field]: !value
                            }
                        })
                    }}
                />
                <Switch size='small' checked={value} onClick={onSwitchHandler} />
            </>
        )
    } else {
        return <ColumnStatus status={value} />
    }
}

export default ColumnSwitch;
