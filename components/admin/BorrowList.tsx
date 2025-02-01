import React from "react";
import BorrowBookCard from "@/components/admin/BorrowBookCard";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";

const BorrowList = async () => {
  const borrowList = await db
    .select({
      id: borrowRecords.id,
      bookId: borrowRecords.bookId,
      fullName: users.fullName,
      borrowDate: borrowRecords.borrowDate,
      coverUrl: books.coverUrl,
      coverColor: books.coverColor,
      genre: books.genre,
      title: books.title,
      author: books.author,
    })
    .from(borrowRecords)
    .leftJoin(users, eq(borrowRecords.userId, users.id))
    .leftJoin(books, eq(borrowRecords.bookId, books.id));

  if (!borrowList.length) {
    return (
      <div className="flex items-center py-5 flex-col gap-2 justify-center">
        <Image
          src="./icons/no-borrow-illustration.svg"
          alt="no accounts"
          height={100}
          width={200}
        />
        <p className="text-dark-600 font-semibold text-center">
          No Pending Book Requests
        </p>
        <p className="text-light-500 text-sm text-center">
          There are no borrow book requests awaiting your review at this time.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex mt-6 flex-1 h-[350px] hide-scrollbar overflow-y-scroll flex-col gap-3">
      {borrowList.map((book) => (
        <BorrowBookCard key={book.id} book={book} />
      ))}
    </ul>
  );
};
export default BorrowList;
