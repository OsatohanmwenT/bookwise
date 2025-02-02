import React from "react";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BookForm from "@/components/admin/BookForm";
import { eq } from "drizzle-orm";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const [bookInfo] = await db.select().from(books).where(eq(books.id, id));

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-dark-100 text-xl">Edit Book</h1>
        <Button asChild className="back-btn">
          <Link href="/admin/books">Go Back</Link>
        </Button>
      </div>
      <section className="w-full max-w-6xl">
        <BookForm type="update" book={bookInfo} />
      </section>
    </>
  );
};
export default Page;
