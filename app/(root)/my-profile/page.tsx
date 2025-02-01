import React from "react";
import { auth } from "@/auth";
import BookList from "@/components/BookList";
import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";

const Page = async () => {
  const session = await auth();

  const borrowedBooks = await db
    .select({
      id: borrowRecords.id,
      bookId: borrowRecords.bookId,
      coverUrl: books.coverUrl,
      coverColor: books.coverColor,
      title: books.title,
      author: books.author,
      genre: books.genre,
    })
    .from(borrowRecords)
    .leftJoin(books, eq(borrowRecords.bookId, books.id))
    .where(eq(borrowRecords.userId, session?.user?.id as string));

  return (
    <>
      <BookList books={borrowedBooks} title="Borrowed Books" />
    </>
  );
};
export default Page;
