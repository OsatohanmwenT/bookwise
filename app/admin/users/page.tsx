import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import UserTable from "@/components/admin/table/UserTable";
import { db } from "@/database/drizzle";
import { borrowRecords, users } from "@/database/schema";
import { eq, sql } from "drizzle-orm";
import InfoSection from "@/components/admin/InfoSection";

const Page = async () => {
  const userList = await db
    .select({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      role: users.role,
      password: users.password,
      status: users.status,
      createdAt: users.createdAt,
      lastActivityDate: users.lastActivityDate,
      universityId: users.universityId,
      universityCard: users.universityCard,
      borrowedBookCount: sql<number>`COUNT(${borrowRecords.id})`,
    })
    .from(users)
    .leftJoin(borrowRecords, eq(borrowRecords.userId, users.id))
    .groupBy(users.id);

  return (
    <InfoSection
      title="All Users"
      sortButton={
        <Button
          className="flex items-center border rounded-md text-dark-700 justify-center gap-1"
          variant="ghost"
        >
          <p>A - Z</p>
          <ArrowUpDown />
        </Button>
      }
    >
      <UserTable users={userList} />
    </InfoSection>
  );
};
export default Page;
