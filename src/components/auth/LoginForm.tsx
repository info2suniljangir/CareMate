"use client";
import React from "react";
import Brand from "@/components/Brand";
import { useActionState } from "react";
import { authenticate, signInWithGoogle } from "@/library/action";
import { useSearchParams } from "next/navigation";

const LoginForm: React.FC = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/my-appointments";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  const [googleErrMessage, loginInwithGoogle, isgooglePending] = useActionState(signInWithGoogle, undefined);
  console.log(googleErrMessage);
 
  return (
    <section className=" mt-16 sm:mt-20 md:mt-4">
      <div className="flex flex-col gap-8 items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Brand />
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action={formAction}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:outline-none"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border  text-gray-900 rounded-lg  block w-full p-2.5  placeholder-gray-400 focus:outline-none"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 ">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline "
                >
                  Forgot password?
                </a>
              </div>
              <input type="hidden" name="redirectTo" value={callbackUrl} />
              <button
                type="submit"
                aria-disabled={isPending}
                className="bg-gray-50 w-full border   font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              {errorMessage && (
                <>
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
              <p className="text-sm font-light text-gray-500 ">
                Don’t have an account yet?{" "}
                <a
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline "
                >
                  Sign up
                </a>
              </p>
            </form>
            <form
            action={loginInwithGoogle}
            >
              <button
                type="submit"
                aria-disabled={isgooglePending}
                className="bg-gray-50 w-full border   font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in with Google
              </button>
              
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
