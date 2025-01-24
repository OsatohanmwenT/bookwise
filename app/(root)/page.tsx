import { auth } from "@/auth";
import { desc } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";

export default async function Home() {
  const session = await auth();

  const latestBooks = (await db
    .select()
    .from(books)
    .limit(13)
    .orderBy(desc(books.createdAt))) as Book[];

  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id} />

      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClass="mt-20"
      />
    </>
  );
}
