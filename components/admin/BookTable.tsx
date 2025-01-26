"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit3, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import BookCover from "@/components/BookCover";
import Link from "next/link";

const BookTable = ({ books }: { books: Book[] }) => {
  return (
    <div className="table">
      <Table>
        <TableHeader className="table-head">
          <TableRow>
            <TableHead className="w-[300px]">Book Title</TableHead>
            <TableHead className="w-[300px]">Author</TableHead>
            <TableHead className="w-[150px]">Genre</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="table-body">
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>
                <Link
                  className="flex items-center gap-2"
                  href={`/admin/books/${book.id}`}
                >
                  <BookCover
                    variant="small"
                    coverColor={book.coverColor}
                    coverImage={book.coverUrl}
                  />
                  <p className="font-medium text-wrap">{book.title}</p>
                </Link>
              </TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>
                {dayjs(book.createdAt).format("MMM DD, YYYY")}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2">
                  <button>
                    <Edit3 className="size-5 text-blue-500" />
                  </button>
                  <button>
                    <Trash2 className="size-5 text-red" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default BookTable;
