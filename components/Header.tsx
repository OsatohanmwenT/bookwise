import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Session } from "next-auth";
import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/"
            className="text-base hover:text-light-200 cursor-pointer capitalize text-white"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/search"
            className="text-base hover:text-light-200 cursor-pointer capitalize text-white"
          >
            Search
          </Link>
        </li>
        <li>
          <Link href="/my-profile">
            <Avatar>
              <AvatarFallback className="bg-amber-100">
                {getInitials(session.user?.name || "IN")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
        <li>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button className="max-sm:bg-transparent max-sm:p-0 max-sm:rounded-none max-sm:hover:bg-transparent">
              <Image
                className="sm:hidden object-cover"
                src="/icons/logout.svg"
                alt="logout"
                width={25}
                height={25}
              />
              <span className="max-sm:hidden">Logout</span>
            </Button>
          </form>
        </li>
      </ul>
    </header>
  );
};
export default Header;
