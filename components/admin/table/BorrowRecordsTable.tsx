import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import BookCover from "@/components/BookCover";
import ModeButton from "@/components/admin/ModeButton";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import ReceiptSvg from "@/components/ReceiptSvg";

const BorrowRecordsTable = ({
  borrowRecords,
}: {
  borrowRecords: BorrowRecord[];
}) => {
  return (
    <Table>
      <TableHeader className="table-head">
        <TableRow>
          <TableHead className="max-xl:w-[200px]">Book</TableHead>
          <TableHead>User requested</TableHead>
          <TableHead>Borrowed status</TableHead>
          <TableHead>Borrowed date</TableHead>
          <TableHead>Return date</TableHead>
          <TableHead>Due date</TableHead>
          <TableHead>Receipt</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="table-body">
        {borrowRecords
          ? borrowRecords.map((borrowRecord) => (
              <TableRow key={borrowRecord.id}>
                <TableCell>
                  <Link
                    className="flex items-center gap-2"
                    href={`/admin/books/${borrowRecord.bookId}`}
                  >
                    <BookCover
                      variant="extraSmall"
                      coverColor={borrowRecord.coverColor as string}
                      coverImage={borrowRecord.coverUrl as string}
                    />
                    <p className="font-medium line-clamp-1">
                      {borrowRecord.title}
                    </p>
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <p className="font-medium text-sm">
                      {borrowRecord.fullName}
                    </p>
                    <p className="text-xs text-light-100">
                      {borrowRecord.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <ModeButton
                    initialMode={borrowRecord.status as string}
                    userId={borrowRecord.id}
                    type="STATUS"
                  />
                </TableCell>
                <TableCell className="font-semibold">
                  {dayjs(borrowRecord.borrowDate).format("MMM DD, YYYY")}
                </TableCell>
                <TableCell className="font-semibold">
                  {dayjs(borrowRecord.returnDate).format("MMM DD, YYYY")}
                </TableCell>
                <TableCell className="font-semibold">
                  {dayjs(borrowRecord.dueDate).format("MMM DD, YYYY")}
                </TableCell>
                <TableCell>
                  <Button
                    variant="secondary"
                    className="bg-sky-50 shadow-none rounded-xl hover:bg-sky-100 text-blue-600"
                  >
                    <ReceiptSvg color="fill-blue-600" />
                    <p>Generate</p>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          : null}
      </TableBody>
    </Table>
  );
};
export default BorrowRecordsTable;
