import { useCallback, useRef } from 'react'

import { CircularProgress } from '@mui/material'

export const useInfiniteScrollV2 = ({
    onNextPage,
    rootRef,
    props: { hasNextPage, isFetching, isLoading, isFetchingNextPage }
}: {
    onNextPage: () => void
    rootRef?: React.RefObject<HTMLDivElement | null>
    props: {
        hasNextPage: boolean
        isFetching: boolean
        isLoading: boolean
        isFetchingNextPage: boolean
    }
}) => {
    const observer = useRef<IntersectionObserver>()

    const lastElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (isLoading) return

            if (observer.current) observer.current.disconnect()

            observer.current = new IntersectionObserver(
                entries => {
                    if (
                        entries[0].isIntersecting &&
                        hasNextPage &&
                        !isFetching
                    ) {
                        onNextPage()
                    }
                },
                {
                    root: rootRef?.current || null,
                    threshold: 0.1
                }
            )

            if (node) observer.current.observe(node)
        },
        [onNextPage, hasNextPage, isFetching, isLoading, rootRef]
    )

    const nextPageFetchingIndicator =
        isFetchingNextPage && <CircularProgress size={20} />

    return { lastElementRef, nextPageFetchingIndicator }
}
