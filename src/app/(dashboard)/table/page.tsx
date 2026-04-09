import React from 'react'

import type { Metadata } from 'next'

import { AppConfig } from '@/configs/appConfig'

export const metadata: Metadata = {
    title: `${AppConfig.appName} | Table`
}

function page() {
    return (
        <></>
    )
}

export default page
