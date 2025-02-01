import React from "react";
import { CalendarRange, Eye } from "lucide-react";
import BookCover from "@/components/BookCover";
import dayjs from "dayjs";
import Link from "next/link";

const BorrowBookCard = ({ book }: { book: BorrowListItem }) => {
  return (
    <div className="flex last:mb-6 bg-light-300 p-4 rounded-xl items-start justify-between">
      <div className="flex items-center gap-2">
        <BookCover
          variant="small"
          coverColor={book.coverColor as string}
          coverImage={book.coverUrl as string}
        />
        <div>
          <p className="font-semibold text-lg text-dark-400">{book.title}</p>
          <div className="flex items-center my-1 gap-1">
            <p className="text-xs text-dark-700">
              by <span>{book.author}</span>
            </p>
            <span className="bg-dark-700 w-1 h-1 rounded-full"></span>
            <p className="text-xs text-dark-700">{book.genre}</p>
          </div>
          <div className="mt-1 flex gap-2">
            <p className="text-dark-700 text-sm font-medium">{book.fullName}</p>
            <div className="flex items-center gap-2">
              <CalendarRange className="size-5 text-dark-700" />
              <p className="text-dark-700 text-sm">
                {dayjs(book.borrowDate).format("DD/MM/YYYY")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <button className="p-2 bg-white hover:bg-light-100 transition-colors rounded-md">
        <Link href={`/admin/books/${book.bookId}`}>
          <Eye className="size-5" />
        </Link>
      </button>
    </div>
  );
};
export default BorrowBookCard;
