'use client'
import {CirclePlus} from 'lucide-react'

const Nav=()=>{
  return(
<nav className='h-[65px] border-b border-default-50 flex items-center px-6 gap-4'>
  <div className='w-1/2'>
  <input type="text" placeholder="search" className='w-[560px] border-gray-100/20 p-2 rounded-full border px-4 '/></div>
</nav>
  )
}
export default Nav