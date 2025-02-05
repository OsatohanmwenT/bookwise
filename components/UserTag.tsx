import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { generateBgColor, generateTextColor, getInitials } from "@/lib/utils";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import StudentId from "@/components/StudentId";

const UserTag = async () => {
  const session = await auth();

  if (!session?.user?.id) return redirect("/sign-in");

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session?.user?.id));

  return (
    <div className="p-6 pt-14 relative w-[700px] bg-gradient-to-b from-[#232839] to-[#12141D] h-fit rounded-xl">
      <Image
        src="/icons/hook.svg"
        alt="hook"
        className="absolute left-[50%] -translate-x-1/2 -top-10"
        height={100}
        width={50}
      />
      <div className="flex gap-5 items-center">
        <div className="p-2 w-fit rounded-full bg-dark-700">
          <Avatar className="!h-fit !w-fit">
            <AvatarFallback
              style={{
                borderRadius: "50%",
                borderWidth: "1px",
                borderColor: generateTextColor(Math.random() * 10 + 1),
                background: generateBgColor(2),
                color: generateTextColor(2),
              }}
              className="font-semibold text-xl size-16"
            >
              {getInitials(user.fullName || "IN")}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Image
              src="/icons/verified.svg"
              alt="verified"
              height={20}
              width={20}
            />
            <p className="text-light-100 text-sm">Verified student</p>
          </div>
          <p className="font-semibold text-xl text-white">{user.fullName}</p>
          <p className="font-medium text-light-100">{user.email}</p>
        </div>
      </div>
      <div className="mt-14">
        <p className="text-light-100">University</p>
        <p className="font-semibold text-xl text-white">Covenant University</p>
      </div>
      <div className="mt-10">
        <p className="text-light-100">Student Id</p>
        <p className="font-semibold text-xl text-white">{user.universityId}</p>
      </div>
      <div className="mt-10">
        <StudentId universityCard={user.universityCard} />
      </div>
    </div>
  );
};
export default UserTag;
