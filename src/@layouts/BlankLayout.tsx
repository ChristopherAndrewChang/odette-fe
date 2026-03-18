'use client'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { ChildrenType, SystemMode } from '@core/types'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import useLayoutInit from '@core/hooks/useLayoutInit'

// Util Imports
import { blankLayoutClasses } from './utils/layoutClasses'

type Props = ChildrenType & {
  systemMode: SystemMode;
  bodyColor?: string;
}

const BlankLayout = (props: Props) => {
  // Props
  const { children, systemMode } = props

  // Hooks
  const { settings } = useSettings()

  useLayoutInit(systemMode)

  return (
    <div className={classnames(blankLayoutClasses.root, 'is-full bs-full', props.bodyColor)} data-skin={settings.skin}>
      {children}
    </div>
  )
}

export default BlankLayout
