"use client";
import React, { useActionState } from "react";
// import Brand from "../Brand";
import { registerUser } from "@/library/action";
import { useSearchParams } from "next/navigation";

const SignupForm: React.FC = () => {
  // useActionState()
  // usage: using information returned by a form action
  // special thing about useActionState is it's enable us to submit the form without event handlers.s`
  // this is the common mistake.
  // Note: the server action get one extra argument that is the state of the object
  // and then the second argument is the formData object.
  // always keep in the mind that the returned value of the server action must match
  // with the state of the component.
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/my-appointments";
  const [errorMessage, formAction, isPending] = useActionState(
    registerUser,
    undefined
  );

  return (
    <section className="mt-16 sm:mt-20 md:mt-4 pt-8">
      <div className="flex flex-col gap-8 items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {/* <Brand /> */}
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" action={formAction}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Sunil Jangir"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500">
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <input type="hidden" name="redirectTo" value={callbackUrl} />
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-gray-50 border font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Login here
                </a>
              </p>
              {errorMessage && <p className="text-red-700">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
