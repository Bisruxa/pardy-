import {getEvents} from '@/utils/events'
import { getCurrentUser } from '@/utils/users'
import Link from 'next/link'
const statusColors={
  draft:'warning',
  live:'success',
  started:'primary',
  ended:'disabled',
  canceled:'danger',
}
const Events=async()=>{
  const user = await getCurrentUser()
  const events = await getEvents(user.id)

  return <div className='w-full h-full p-4 flex justify-center'>
    <div className='w-full'>
      <h2 className='text-center text-xl'>{`Latest Events`}</h2>
      <div className='rounded-md border border-default-100 my-8'>
        {events.map((even)=>(
<div key={even.id} className='border-b border-default-100 p-2 flex gap-2'>
  <Link href={`/dashboard/events/${even.id}`}
  > <span>{even.name}</span></Link>
  <span>{even.status}</span>
  <span>{even.name}</span>
</div>
        ))}
      </div>
    </div>

  </div>
}
export default Events