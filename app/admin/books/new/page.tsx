import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BookForm from "@/components/admin/BookForm";

const Page = () => {
  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/books">Go Back</Link>
      </Button>
      <section className="w-full max-w-6xl">
        <BookForm type="create" />
      </section>
    </>
  );
};
export default Page;
