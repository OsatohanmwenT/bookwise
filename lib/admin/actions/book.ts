"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while creating book",
    };
  }
};

export const changeBookStatus = async (id: string, status: STATUS) => {
  try {
    const borrowedBook = await db
      .select()
      .from(borrowRecords)
      .where(eq(borrowRecords.id, id))
      .limit(1);

    if (!borrowedBook) return null;

    const [result] = await db
      .update(borrowRecords)
      .set({ status: status })
      .where(eq(borrowRecords.id, id))
      .returning();

    revalidatePath("/admin/borrow-records");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(result)),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "An error occurred while updating user",
    };
  }
};

export const deleteBook = async (id: string) => {
  try {
    const book = await db.select().from(books).where(eq(books.id, id)).limit(1);
    if (!book)
      return {
        success: false,
        error: "User not found",
      };

    await db.delete(books).where(eq(books.id, id));

    revalidatePath("/admin/users");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "An error occurred while deleting user",
    };
  }
};
