import { requireAuth } from '@/lib/auth-guard'
import React from 'react'

const page = () => {
    const session = requireAuth()
    
  return (
    <div></div>
  )
}

export default page