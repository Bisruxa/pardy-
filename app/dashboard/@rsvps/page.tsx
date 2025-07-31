import { getRsvps } from "@/utils/rsvps"
import { getCurrentUser } from "@/utils/users"
import Link from 'next/link'
const Rsvps=async()=>{
  const user = await getCurrentUser()
  const data = await getRsvps(user.id)
 const statusColors = {
   going: "primary",
   maybe: "warning",
   "not-going": "danger",
 };

  return (
    <div className="w-full h-full p-4 flex justify-center">
      <div className="w-full">
        <h2 className="text-center text-xl">{`RSVPS`}</h2>
        <div className="rounded-md border border-default-100 my-8">
          {data.map(({event,attendee})=>(
            <div key={event.id} className="border-b border-default-100 p-2 flex gap-2">
<span>{attendee.name}</span>
<span>
  {}
</span>
<span>
  <Link href={`/dashbaord/events/${event.id}`}>
  <span>{event?.name}</span></Link>
</span>
            </div>
          ))}
        </div>

      </div>
      
     
    </div>
  )
}
export default Rsvps