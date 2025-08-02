'use client'
import { usePathname } from "next/navigation"
import Shell from '@/components/Shell'
const Dashboard =({children,events,rsvps}) =>{
  const path = usePathname()
return (
  <Shell>
    {path === "/dashboard" ? (
      <div className="flex w-full h-full">
        <div className="w-1/2 border-r border-default-50">{rsvps}</div>
        <div className="w-1/2 flex flex-col h-1/2">
          <div className="border-b border-default-50 w-full h-full">
            {events}
          </div>
          <div className="w-full ">{children}</div>
        </div>
      </div>
    ) : (
      <div>{children}</div>
    )}
  </Shell>
);
}
export default Dashboard