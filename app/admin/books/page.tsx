import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BookTable from "@/components/admin/BookTable";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { ArrowUpDown } from "lucide-react";
import InfoSection from "@/components/admin/InfoSection";

const Page = async () => {
  const booklist = await db.select().from(books);

  return (
    <InfoSection
      title="All Books"
      sortButton={
        <Button
          className="flex items-center border rounded-md text-dark-700 justify-center gap-1"
          variant="ghost"
        >
          <p>A - Z</p>
          <ArrowUpDown />
        </Button>
      }
      createButton={
        <Button className="bg-primary-admin" asChild>
          <Link className="text-white" href="/admin/books/new">
            + Create a new book
          </Link>
        </Button>
      }
    >
      <BookTable books={booklist} />
    </InfoSection>
  );
};
export default Page;
