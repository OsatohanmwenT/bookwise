import React from "react";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const bookInfo = await db.select().from(books);

  return <div>Page</div>;
};
export default Page;
