import React from "react";
import { dateRange } from "@/lib/utils";
import { db } from "@/database/drizzle";
import { and, count, gt, gte, lt, lte } from "drizzle-orm";
import { books } from "@/database/schema";
import AnalyticsCard from "@/components/admin/AnalyticsCard";

const BookStat = async () => {
  const { currentWeekStart, lastWeekEnd, lastWeekStart, today } = dateRange();

  const [bookCount] = await db.select({ count: count() }).from(books);

  const [thisWeekResult] = await db
    .select({ count: count() })
    .from(books)
    .where(
      and(gt(books.createdAt, currentWeekStart), lt(books.createdAt, today)),
    );

  // Query for last week's borrowed books count
  const [lastWeekResult] = await db
    .select({ count: count() })
    .from(books)
    .where(
      and(
        gte(books.createdAt, lastWeekStart),
        lte(books.createdAt, lastWeekEnd),
      ),
    );

  const difference = thisWeekResult.count - lastWeekResult.count;

  return (
    <AnalyticsCard
      title="Total Books"
      count={bookCount.count}
      difference={difference}
    />
  );
};
export default BookStat;
