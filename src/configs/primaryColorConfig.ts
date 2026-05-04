import { colors } from "@/hooks/color"

export type PrimaryColorConfig = {
  name?: string
  light?: string
  main: string
  dark?: string
}

// Primary color config object
const primaryColorConfig: PrimaryColorConfig[] = [
  {
    name: 'primary-1',
    light: '#0f0a04',
    main: '#0f0a04',
    dark: colors.GOLD
  },
]

export default primaryColorConfig
