import SignupForm from "@/components/auth/SignupForm";
import React, { Suspense } from "react";
const Page = () => {
  return (
    <div>
      <Suspense>
        <SignupForm />
      </Suspense>
    </div>
  );
};

export default Page;
