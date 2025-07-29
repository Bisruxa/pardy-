'use client'
import { useFormState } from "react-dom"
import { registerUser } from "@/action/auth"
import Link from 'next/link'
import Submit from "./SubmitButton"
import { useActionState } from "react"

const initialState = {message:null}
const SignUpForm=()=>{
   const [formState, action] = useActionState<{ message: string | null }>(
     registerUser,
     initialState
   );
  return (
    <form
      action={action}
      className="bg-content1 border border-default-100 shadow-lg rounded-md p-3 flex flex-col gap-2 "
    >
      <h3 className="my-4">Sign up</h3>
      <input  placeholder="Email" name="email" required className="bg-gray-400"/>
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        className="bg-gray-500"
      />
      <Submit label={"signup"} />
      <div>
        <Link href="/signin">{`Already have an account?`}</Link>
      </div>
      {formState?.message && <p>{formState.message}</p>}
    </form>
  );
}
export default SignUpForm