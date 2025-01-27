import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import UserTable from "@/components/admin/UserTable";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { desc } from "drizzle-orm";

const Page = async () => {
  const userList = await db.select().from(users);

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Users</h2>
        <div className="flex gap-2">
          <Button
            className="flex items-center border rounded-md text-dark-700 justify-center gap-1"
            variant="ghost"
          >
            <p>A - Z</p>
            <ArrowUpDown />
          </Button>
        </div>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <UserTable users={userList} />
      </div>
    </section>
  );
};
export default Page;
