import 'server-only'
import { delay } from './delay'
import { de } from 'zod/v4/locales'
import prisma from '@/lib/prisma'

export const getEvents= async(userId:number)=>{
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
  return data;
}