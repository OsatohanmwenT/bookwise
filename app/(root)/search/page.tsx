import React from "react";
import BookList from "@/components/BookList";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import SearchInput from "@/components/SearchInput";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { desc, ilike, or } from "drizzle-orm";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const filters = await searchParams;
  const searchQuery = filters?.query || "";

  const searchBooks = await db
    .select()
    .from(books)
    .where(or(ilike(books.title, `%${searchQuery}%`)))
    .orderBy(desc(books.createdAt))
    .limit(12);

  return (
    <>
      <section className="search-page_title">
        <p className="font-bebas-neue tracking-widest text-2xl text-center text-light-100 capitalize">
          Discover Your Next Great Read:
        </p>
        <div className="w-full">
          <h1 className="text-white font-semibold text-6xl">
            Explore and Search for{" "}
            <span className="text-light-200">Any Book</span> In Our Library
          </h1>
        </div>
        <SearchInput query={searchQuery} />
      </section>
      <section className="mt-28 w-full">
        {searchBooks.length > 0 ? (
          <>
            <BookList
              containerClass="xl:w-full"
              isSearch
              books={searchBooks}
              title={
                searchQuery
                  ? `Search Result for ${searchQuery}`
                  : "Search Results"
              }
              type="BOOK LIST"
            />
            <Separator className="bg-dark-400 my-10" />
          </>
        ) : (
          <div className="w-full">
            <div className="max-w-sm flex items-center mx-auto">
              <div className="flex flex-col gap-3 items-center">
                <Image
                  src="/images/no-books.png"
                  alt="not found"
                  width={200}
                  height={200}
                />
                <p className="text-xl text-white font-semibold">
                  No Result Found
                </p>
                <p className="text-light-100 max-w-sm text-center font-light">
                  We couldn’t find any books matching your search. Try using
                  different keywords or check for typos.
                </p>
                <Button className="book-overview_btn !w-full font-semibold">
                  CLEAR SEARCH
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
export default Page;
