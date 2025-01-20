"use client";

import React from "react";
import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validations";
import { signInWithCredentials } from "@/lib/actions/auth";

const Page = () => {
  return (
    <AuthForm
      schema={signInSchema}
      type="SIGN_IN"
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={signInWithCredentials}
    />
  );
};
export default Page;
