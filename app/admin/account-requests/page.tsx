import React from "react";
import InfoSection from "@/components/admin/InfoSection";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import AccountRegTable from "@/components/admin/table/AccountRegTable";
import { eq } from "drizzle-orm";

const Page = async () => {
  const accounts = await db
    .select()
    .from(users)
    .where(eq(users.status, "PENDING"));

  console.log(accounts);
  return (
    <InfoSection
      title="Account Registration Requests"
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
      <AccountRegTable users={accounts} />
    </InfoSection>
  );
};
export default Page;
