import React from "react";
import { hexToRgb } from "@/lib/utils";
import BookCover from "@/components/BookCover";
import Image from "next/image";
import dayjs from "dayjs";

const BorrowCard = ({
  coverUrl,
  coverColor,
  title,
  genre,
  borrowDate,
  dueDate,
  author,
}: BorrowProfileList) => {
  return (
    <div className="bg-dark-100 flex flex-col justify-between gap-3 rounded-lg p-3">
      <div
        style={{
          backgroundColor: `rgba(${hexToRgb(coverColor)},0.5)`,
        }}
        className="p-5 rounded-lg flex items-center justify-center"
      >
        <BookCover
          variant="medium"
          coverColor={coverColor}
          coverImage={coverUrl}
        />
      </div>
      <div className="flex flex-col justify-between gap-3">
        <div className="flex flex-col gap-3">
          <p className="text-white text-lg font-medium">
            {title}- by {author}
          </p>
          <p className="text-light-100 text-sm">{genre}</p>
        </div>
        <div className="flex items-center gap-1">
          <Image
            src="/icons/book-2.svg"
            alt="book icon"
            width={18}
            height={18}
          />
          <p className="text-xs text-light-100">
            Borrowed on {dayjs(borrowDate).format("MMM DD")}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Image
              src="/icons/calendar.svg"
              alt="calendar icon"
              width={18}
              height={18}
            />
            <p className="text-xs text-light-100">
              {dayjs(dueDate).diff(dayjs(borrowDate), "days")} days days left to
              due
            </p>
          </div>
          <button className="p-1 rounded-sm bg-dark-600">
            <Image
              src="/icons/receipt.svg"
              alt="receipt icon"
              width={18}
              height={18}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
export default BorrowCard;
