'use server'
import { delay } from "@/utils/delay"
import { getCurrentUser } from "@/utils/users"
import randomName from '@scaleway/random-name'
import prisma from "@/lib/prisma"
import { revalidateTag } from "next/cache"

export const createNewEvent= async()=>{
  await delay(2000)
  const user = await getCurrentUser()
  await prisma.event.create({
    data:{
      startOn:new Date(),
      createdById:user.id,
      isPrivate:false,
      name:randomName('event',''),
      description:'This is a placeholder description',
      status:'draft',
    }
  })
  revalidateTag("dashboard:events");
}