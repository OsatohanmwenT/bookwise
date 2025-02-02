import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import BookCover from "@/components/BookCover";
import { hexToRgb } from "@/lib/utils";
import Image from "next/image";
import dayjs from "dayjs";
import BookVideo from "@/components/BookVideo";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [bookDetail] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);

  return (
    <>
      <Button asChild className="back-btn">
        <Link href="/admin/books">
          <ArrowLeft className="size-5" /> Go Back
        </Link>
      </Button>
      <section className="w-full">
        <div className="flex items-center gap-5">
          <div
            style={{
              background: `rgba(${hexToRgb(bookDetail.coverColor)}, 0.5)`,
            }}
            className="py-5 px-20 flex items-center justify-center rounded-xl"
          >
            <BookCover
              variant="medium"
              coverColor={bookDetail.coverColor}
              coverImage={bookDetail.coverUrl}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <p className="text-light-500">Created at: </p>
              <Image
                src="/icons/admin/calendar.svg"
                alt="calendar"
                width={20}
                height={20}
              />
              <p className="text-light-500">
                {dayjs(bookDetail.createdAt).format("DD/MM/YYYY")}
              </p>
            </div>
            <p className="text-3xl text-dark-300 font-semibold">
              {bookDetail.title}
            </p>
            <p className="text-xl text-dark-300 font-semibold">
              By {bookDetail.author}
            </p>
            <p className="text-dark-700">{bookDetail.genre}</p>
            <Button
              asChild
              className="bg-primary-admin h-auto max-w-md py-3 text-white"
            >
              <Link href={`/admin/books/edit/${bookDetail.id}`}>
                <Image
                  src="/icons/admin/edit.svg"
                  alt="edit icon"
                  width={20}
                  height={20}
                  className="brightness-0 invert"
                />
                <p className="text-white">Edit Book</p>
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex mt-10 justify-center gap-10">
          <section className=" flex flex-col gap-7">
            <h3 className="font-semibold text-xl">Summary</h3>
            <div className="space-y-5 text-light-500">
              {bookDetail.summary.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
          <section className="flex flex-col gap-7">
            <h3 className="font-semibold text-xl">Video</h3>
            <BookVideo videoUrl={bookDetail.videoUrl} />
          </section>
        </div>
      </section>
    </>
  );
};
export default Page;
