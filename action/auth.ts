'use server'
 import {cookies} from 'next/headers'
 import {signin,signup} from @/utils/authToken
 import {z} from 'zod'
 import {redirect} from 'next/navigation'
 import {COOKIE_NAME} from "@/utils/constants"

 const authSchema = z.object({
  email:z.string().email(),
  password:z.string(),
 })
 export const registerUser = async (prevState:any ,formdata:FormData){
  const data = authSchema.parse({
    email:formdata.get('email'),
    password:formdata.get('password'),

  })

  try{
    const {token} = await signup(data)
    cookies().set(COOKIE_NAME,token)    
  }
  catch(e){
    return {message:"failed to sign you up"}

  }
  redirect("/dashboard")
 }