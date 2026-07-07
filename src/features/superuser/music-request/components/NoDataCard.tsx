'use client'

import { Typography, useColorScheme } from '@mui/material'
import classNames from 'classnames'

function NoDataCard() {
  const { mode } = useColorScheme()

  return (
    <div
      className={classNames('p-6 bg-gray-50 rounded-lg border flex items-center justify-center min-w-72 lg:min-w-96', {
        '!bg-gray-800': mode === 'dark'
      })}
    >
      <Typography>No data</Typography>
    </div>
  )
}

export default NoDataCard
