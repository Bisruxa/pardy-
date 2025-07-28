import 'server-only'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'
import {users} from '@/prisma/schema'
import bcrypt from 'bcrypt'

const SECRET = 'use_an_ENV_VAR'

export const createTokenFOrUser = (userId:string)=>{
  const token = jwt.sign({id:userId},SECRET)
  return token 
}
export const getUserFromToken=async(token:{
  name:string
  value:string
}) =>{
  const payload = jwt.verify(token.value,SECRET) as {id:string}

  const user = await prisma.users.findFirst({
    where:{
      users.id == payload.id,
    },
    columns:{
     id:true,
     email:true,
     createdAt:true,
    },
  }) 
  return user
}
