'use client'
 import Image from 'next/image'
 import Link from 'next/link'
import { usePathname } from 'next/navigation'
 
 const links = [
  {route:'/dashboard' , name :'Home'},
  {route:'/dashboard/events', name:'Events'},
  {route:'/dashboard/guests',name:'Guests'},
  {route:'/dashboard/activity',name:'Activity'},
  {route:'/dashboard/settings', name:'Settings'},
 ]
const isActive =(path:string,route:string)=>{
  if(route === '/dashboard')
  {return path === '/dashboard'}
else {
  return path.includes(route)
}
}
const Side =()=>{
  const path = usePathname()
  return (
    <div className="w-full h-full px-3 relative">
      <div className="mb-12">
        <div className="pt-4">Logo</div>
      </div>
      <div>
        {links.map((link) => (
          <div className="w-full " key={link.route}>
            <Link href={link.route}>
            <div className={`w-full h-full py-2 px-2 rounded-lg ${isActive(path,link.route) ? 'bg-blue-500 text-white font-semibold':'text-white hover:bg-gray-900'}`}
            >{link.name}</div></Link>
          </div>
        ))}
      </div>
      <div className='absolute bottom-0 w-full left-0 px-4'>
        <button>Sign Out</button>
      </div>
    </div>
  );
}
export default Side