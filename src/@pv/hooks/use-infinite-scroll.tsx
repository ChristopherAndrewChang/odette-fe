// import { useCallback, useRef } from 'react'

// import { CircularProgress } from '@mui/material'

// export const useInfiniteScroll = ({
//     onNextPage,
//     props: { hasNextPage, isFetching, isLoading, isFetchingNextPage }
// }: {
//     onNextPage: () => void
//     props: {
//         hasNextPage: boolean
//         isFetching: boolean
//         isLoading: boolean
//         isFetchingNextPage: boolean
//     }
// }) => {
//     const observer = useRef<IntersectionObserver>()

//     const lastElementRef = useCallback(
//         (node: HTMLDivElement) => {
//             if (isLoading) return

//             if (observer.current) observer.current.disconnect()

//             observer.current = new IntersectionObserver(entries => {
//                 if (entries[0].isIntersecting && hasNextPage && !isFetching) {
//                     onNextPage()
//                 }
//             })

//             if (node) observer.current.observe(node)
//         },
//         [onNextPage, hasNextPage, isFetching, isLoading]
//     )

//     const nextPageFetchingIndicator = isFetchingNextPage && <CircularProgress size={20} />

//     return { lastElementRef, nextPageFetchingIndicator }
// }

import { useCallback, useRef } from 'react'

import { CircularProgress } from '@mui/material'

export const useInfiniteScroll = ({
    onNextPage,
    props: { hasNextPage, isFetchingNextPage, isLoading }
}: {
    onNextPage: () => void
    props: {
        hasNextPage: boolean
        isFetchingNextPage: boolean
        isLoading: boolean
    }
}) => {
    const observer = useRef<IntersectionObserver>()

    const lastElementRef = useCallback(
        (node: HTMLDivElement) => {
            if (isLoading) return

            if (observer.current) observer.current.disconnect()

            observer.current = new IntersectionObserver(entries => {
                // Diubah: Gunakan isFetchingNextPage agar interval polling React Query tidak membatalkan scroll
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    onNextPage()
                }
            })

            if (node) observer.current.observe(node)
        },
        [onNextPage, hasNextPage, isFetchingNextPage, isLoading]
    )

    // Diubah: Cegah render undefined/boolean, render null jika tidak loading
    const nextPageFetchingIndicator = isFetchingNextPage ? <CircularProgress size={20} /> : null;

    return { lastElementRef, nextPageFetchingIndicator }
}
