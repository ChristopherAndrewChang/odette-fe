'use client'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import { useQuery } from '@tanstack/react-query'

import axios from 'axios'

import NavToggle from './NavToggle'
import UserDropdown from '@components/layout/shared/UserDropdown'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'
import type { ResponseWrapper } from '@/types/api'
import ModeDropdown from '../shared/ModeDropdown'


const useGetIpQuery = () => {
  return useQuery<ResponseWrapper<{ ip: string; }>>({
    queryKey: ["ip-get"],
    queryFn: () => {
      return axios.get("/api/net/")
    }
  });
}

const NavbarContent = () => {
  const { data, isFetching } = useGetIpQuery();

  return (
    <div className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}>
      <div className='flex items-center gap-4'>
        <NavToggle />
        <p className='text-gray-500 text-sm truncate max-w-[20ch]'>{isFetching ? "Fetching IP Data..." : `IP: ${data?.data?.ip}`}</p>
        {/* for now it is removed */}
        <ModeDropdown />
      </div>
      <div className='flex items-center'>
        <UserDropdown />
      </div>
    </div>
  )
}

export default NavbarContent
