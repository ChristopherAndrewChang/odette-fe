// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Type Imports
import type { Metadata, Viewport } from "next"

import type { ChildrenType } from '@core/types'


// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'
import { AppConfig } from '@/configs/appConfig'

import PvProviderContainer from '@/components/PvProviderContainer'


export const metadata: Metadata = {
  title: `${AppConfig.appName}`,
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: "#0f0a04"
}

const RootLayout = ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'

  return (
    <html id='__next' lang='en' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        {/* <AuthProvider> */}
        <PvProviderContainer>
          {children}
        </PvProviderContainer>
        {/* </AuthProvider> */}
      </body>
    </html>
  )
}

export default RootLayout
