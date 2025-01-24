import React from "react";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import BookList from "@/components/BookList";
import { db } from "@/database/drizzle";
import { borrowRecords } from "@/database/schema";
import { and, eq } from "drizzle-orm";

const Page = async () => {
  const session = await auth();

  const borrowedBooks = await db
    .select()
    .from(borrowRecords)
    .where(
      and(
        eq(borrowRecords.userId, session?.user?.id),
        eq(borrowRecords.status, "BORROWED"),
      ),
    )
    .limit(1);

  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="mb-20"
      >
        <Button>Logout</Button>
      </form>
      <BookList books={borrowedBooks} title="Borrowed Books" />
    </>
  );
};
export default Page;
