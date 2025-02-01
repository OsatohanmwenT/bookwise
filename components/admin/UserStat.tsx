import React from "react";
import { db } from "@/database/drizzle";
import { and, count, gt, gte, lt, lte } from "drizzle-orm";
import { users } from "@/database/schema";
import { dateRange } from "@/lib/utils";
import AnalyticsCard from "@/components/admin/AnalyticsCard";

const UserStat = async () => {
  const { currentWeekStart, lastWeekEnd, lastWeekStart, today } = dateRange();

  const [userCount] = await db.select({ count: count() }).from(users);

  const [thisWeekResult] = await db
    .select({ count: count() })
    .from(users)
    .where(
      and(gt(users.createdAt, currentWeekStart), lt(users.createdAt, today)),
    );

  // Query for last week's borrowed books count
  const [lastWeekResult] = await db
    .select({ count: count() })
    .from(users)
    .where(
      and(
        gte(users.createdAt, lastWeekStart),
        lte(users.createdAt, lastWeekEnd),
      ),
    );

  const difference = thisWeekResult.count - lastWeekResult.count;

  return (
    <AnalyticsCard
      title="Total Users"
      count={userCount.count}
      difference={difference}
    />
  );
};
export default UserStat;
