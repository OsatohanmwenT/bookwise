"use client";

import React from "react";
import BookCard from "@/components/BookCard";
import BookFilter from "@/components/BookFilter";
import BorrowCard from "@/components/BorrowCard";

interface Props {
  isSearch?: boolean;
  books: Partial<Book>[] | BorrowProfileList[];
  title: string;
  containerClass?: string;
  type: "BORROW LIST" | "BOOK LIST";
}

const BookList = ({ title, books, containerClass, isSearch, type }: Props) => {
  if (books.length < 1) return;

  return (
    <section className={containerClass}>
      <div className="flex items-center justify-between">
        <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>
        {isSearch && <BookFilter />}
      </div>
      {type === "BOOK LIST" ? (
        <ul className="book-list">
          {books.map((book) => (
            <BookCard key={book.title} {...(book as Partial<Book>)} />
          ))}
        </ul>
      ) : (
        <ul className="borrow-list">
          {books.map((book) => (
            <BorrowCard key={book.title} {...book} />
          ))}
        </ul>
      )}
    </section>
  );
};
export default BookList;
