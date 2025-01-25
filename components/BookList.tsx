"use client";

import React from "react";
import BookCard from "@/components/BookCard";
import BookFilter from "@/components/BookFilter";

interface Props {
  isSearch?: boolean;
  books: Book[];
  title: string;
  containerClass?: string;
}

const BookList = ({ title, books, containerClass, isSearch }: Props) => {
  if (books.length < 1) return;

  return (
    <section className={containerClass}>
      <div className="flex items-center justify-between">
        <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>
        {isSearch && <BookFilter />}
      </div>
      <ul className="book-list">
        {books.map((book) => (
          <BookCard key={book.title} {...book} />
        ))}
      </ul>
    </section>
  );
};
export default BookList;
