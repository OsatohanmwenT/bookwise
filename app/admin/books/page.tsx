import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BookTable from "@/components/admin/BookTable";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { ArrowUpDown } from "lucide-react";

const Page = async () => {
  const booklist = await db.select().from(books).limit(12);

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <div className="flex gap-2">
          <Button
            className="flex items-center border rounded-md text-dark-700 justify-center gap-1"
            variant="ghost"
          >
            <p>A - Z</p>
            <ArrowUpDown />
          </Button>
          <Button className="bg-primary-admin" asChild>
            <Link className="text-white" href="/admin/books/new">
              + Create a new book
            </Link>
          </Button>
        </div>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <BookTable books={booklist} />
      </div>
    </section>
  );
};
export default Page;
