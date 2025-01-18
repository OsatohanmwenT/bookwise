"use client";

import React from "react";
import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validations";

const Page = () => {
  return (
    <AuthForm
      schema={signInSchema}
      type="SIGN_IN"
      defaultValues={{
        email: "",
        password: "",
      }}
      onSumbit={undefined}
    />
  );
};
export default Page;
