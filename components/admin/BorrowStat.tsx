import React from "react";
import { db } from "@/database/drizzle";
import { and, count, gt, gte, lt, lte } from "drizzle-orm";
import { borrowRecords } from "@/database/schema";
import { dateRange } from "@/lib/utils";
import AnalyticsCard from "@/components/admin/AnalyticsCard";

const BorrowStat = async () => {
  const [borrowedBooksCount] = await db
    .select({ count: count() })
    .from(borrowRecords);

  const { currentWeekStart, lastWeekEnd, lastWeekStart, today } = dateRange();

  const [thisWeekResult] = await db
    .select({ count: count() })
    .from(borrowRecords)
    .where(
      and(
        gt(borrowRecords.borrowDate, currentWeekStart),
        lt(borrowRecords.borrowDate, today),
      ),
    );

  // Query for last week's borrowed books count
  const [lastWeekResult] = await db
    .select({ count: count() })
    .from(borrowRecords)
    .where(
      and(
        gte(borrowRecords.borrowDate, lastWeekStart),
        lte(borrowRecords.borrowDate, lastWeekEnd),
      ),
    );

  const difference = thisWeekResult.count - lastWeekResult.count;

  return (
    <AnalyticsCard
      title="Borrowed Books"
      count={borrowedBooksCount.count}
      difference={difference}
    />
  );
};
export default BorrowStat;
