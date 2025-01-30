import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import InfoSection from "@/components/admin/InfoSection";
import BorrowRecordsTable from "@/components/admin/BorrowRecordsTable";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { eq } from "drizzle-orm";

const Page = async () => {
  const borrowRecordList = await db
    .select({
      id: borrowRecords.id,
      bookId: books.id,
      coverUrl: books.coverUrl,
      coverColor: books.coverColor,
      title: books.title,
      fullName: users.fullName,
      email: users.email,
      returnDate: borrowRecords.returnDate,
      dueDate: borrowRecords.dueDate,
      borrowDate: borrowRecords.borrowDate,
      status: borrowRecords.status,
    })
    .from(borrowRecords)
    .leftJoin(users, eq(users.id, borrowRecords.userId))
    .leftJoin(books, eq(books.id, borrowRecords.bookId));

  return (
    <InfoSection
      title="Borrow Book Requests"
      sortButton={
        <Button
          className="flex items-center border rounded-md text-dark-700 justify-center gap-1"
          variant="ghost"
        >
          <p>Oldest to Recent</p>
          <ArrowUpDown />
        </Button>
      }
    >
      <BorrowRecordsTable borrowRecords={borrowRecordList} />
    </InfoSection>
  );
};
export default Page;
