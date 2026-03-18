import React from 'react'

import type { Metadata } from 'next'

import { AppConfig } from '@/configs/appConfig'
import TablePage from '@/views/table'

export const metadata: Metadata = {
    title: `${AppConfig.appName} | Table`
}

function page() {
    return (
        <TablePage />
    )
}

export default page
