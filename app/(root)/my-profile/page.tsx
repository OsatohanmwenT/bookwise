import React from "react";
import { auth } from "@/auth";
import BookList from "@/components/BookList";
import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";
import UserTag from "@/components/UserTag";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();

  if (!session?.user?.id) return redirect("/sign-in");

  const borrowedBooks = await db
    .select({
      id: borrowRecords.id,
      bookId: borrowRecords.bookId,
      coverUrl: books.coverUrl,
      coverColor: books.coverColor,
      title: books.title,
      author: books.author,
      genre: books.genre,
      rating: books.rating,
      createdAt: books.createdAt,
    })
    .from(borrowRecords)
    .leftJoin(books, eq(borrowRecords.bookId, books.id))
    .where(eq(borrowRecords.userId, session?.user?.id));

  return (
    <>
      <div className="flex gap-5 xl:gap-20">
        <UserTag />
        <BookList
          books={borrowedBooks}
          type="BORROW LIST"
          title="Borrowed Books"
        />
      </div>
    </>
  );
};
export default Page;
