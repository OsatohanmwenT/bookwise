import React from "react";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";
import BookCover from "@/components/BookCover";
import { CalendarRange, Plus } from "lucide-react";
import dayjs from "dayjs";
import Link from "next/link";

const RecentBooksList = async () => {
  const recentBooks = await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt));

  return (
    <div className="flex gap-5 flex-col">
      <Link
        href="/admin/books/new"
        className="p-5 gap-5 mt-3 font-medium rounded-xl bg-light-300 flex items-center"
      >
        <div className="flex items-center justify-center p-3 rounded-full bg-white">
          <Plus className="size-6" />
        </div>
        <p>Add New Book</p>
      </Link>
      <div className="hide-scrollbar flex gap-5 flex-col overflow-y-scroll h-[560px]">
        {recentBooks.map((book) => (
          <Link
            className="last:mb-6"
            key={book.id}
            href={`/admin/books/${book.id}`}
          >
            <div className="flex items-center gap-2">
              <BookCover
                variant="small"
                coverColor={book.coverColor as string}
                coverImage={book.coverUrl as string}
              />
              <div>
                <p className="font-semibold text-wrap line-clamp-1 text-lg text-dark-400">
                  {book.title}
                </p>
                <div className="flex items-center my-1 gap-1">
                  <p className="text-xs text-dark-700">
                    by <span>{book.author}</span>
                  </p>
                  <span className="bg-dark-700 w-1 h-1 rounded-full"></span>
                  <p className="text-xs text-dark-700">{book.genre}</p>
                </div>
                <div className="mt-1 flex gap-2">
                  <div className="flex items-center gap-2">
                    <CalendarRange className="size-5 text-dark-700" />
                    <p className="text-dark-700 text-sm">
                      {dayjs(book.createdAt).format("DD/MM/YYYY")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default RecentBooksList;
