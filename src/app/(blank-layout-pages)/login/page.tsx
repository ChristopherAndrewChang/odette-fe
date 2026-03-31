// Next Imports
import type { Metadata } from 'next'

import Login from '@/features/auth/login'

// Component Imports

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account'
}

const LoginPage = () => {
  return <Login />
}

export default LoginPage
