"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (id: string, role: ROLE) => {
  try {
    const user = await db.select().from(users).where(eq(users.id, id)).limit(1);

    if (!user.length && !user[0].id)
      return {
        success: false,
        error: "User not found",
      };

    const [result] = await db
      .update(users)
      .set({ role: role })
      .where(eq(users.id, id))
      .returning({ role: users.role });

    revalidatePath("/admin/users");

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

export const deleteUser = async (id: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
    if (!user)
      return {
        success: false,
        error: "User not found",
      };

    await db.delete(users).where(eq(users.id, id));

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
