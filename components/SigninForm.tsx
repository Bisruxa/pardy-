"use client";


import { signinUser } from "@/action/auth";
import Link from "next/link";
import { useActionState } from "react";


const initialState = { message: null };

const SigninForm = () => {
  const [state, formAction, pending] = useActionState(
    signinUser as (
      state: { message: string | null },
      formData: FormData
    ) => Promise<{ message: string | null }>,
    initialState
  );

  return (
    <form
      action={formAction}
      className="bg-content1 border border-default-100 shadow-lg rounded-md p-3 flex flex-col gap-2 "
    >
      <h3 className="my-1 mx-auto font-bold text-lg">Sign in</h3>
      {state?.message && (
        <p className="text-red-700 text-center mb-2">{state.message}</p>
      )}

      <input
        placeholder="Email"
        name="email"
        required
        className="bg-gray-700/10 border p-3 rounded-full mx-2"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        className="bg-gray-700/10 border p-3 rounded-full mx-2"
      />
      <button type="submit" className="bg-purple-400 p-2 mx-2">
        Sign in
      </button>
      {/* <Submit label={"signup"} /> */}

      <div className="mx-auto ">
        Create an account?
        <Link href="/signup" className="pl-2 text-purple-400">{`Signup`}</Link>
      </div>
    </form>
  );
};

export default SigninForm;
