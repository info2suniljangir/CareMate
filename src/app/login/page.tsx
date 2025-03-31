import LoginForm from "@/components/auth/LoginForm";
import React, { Suspense } from "react";
const Page = () => {
  return (
    <div>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default Page;
