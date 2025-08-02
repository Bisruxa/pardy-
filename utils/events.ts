import 'server-only'
import { delay } from './delay'
import prisma from '@/lib/prisma'
import { memoize } from 'nextjs-better-unstable-cache'
export const getEvents= memoize(async(userId:number)=>{
  await delay()

  const data = await prisma.event.findMany({
    where:{
createdById:userId
    },
    select:{
      id:true,
      name:true,
      startOn:true,
      status:true,
      rsvps:true,
    },
   take:5,
  });
  return data ?? [];
},{
  persist:true,
  revalidateTags:['dashboard:events']
})