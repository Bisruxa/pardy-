'use client'
 import Image from 'next/image'
 import Link from 'next/link'
 
 const links = [
  {route:'/dashboard' , name :'Home'},
  {route:'/dashbaord/events', name:'Events'},
  {route:'/dashbaord/guests',name:'Guests'},
  {route:'/dashbaord/activity',name:'Activity'},
  {route:'/dashbard/settings', name:'Settings'},
 ]
const Side =()=>{
  return (
    <div className="w-full h-full px-3 relative">
      <div className="mb-12">
        <div className="pt-4">Logo</div>
      </div>
      <div>
        {links.map((link) => (
          <div className="w-full " key={link.route}>
            <Link href={link.route}>
            <div className={`w-full h-full py-2 px-2 rounded-lg`}>{link.name}</div></Link>
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