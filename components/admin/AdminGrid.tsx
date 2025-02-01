import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BorrowList from "@/components/admin/BorrowList";
import AdminGridCard from "@/components/admin/AdminGridCard";
import AccountRequestGrid from "@/components/admin/AccountRequestGrid";
import RecentBooksList from "@/components/admin/RecentBooksList";

const AdminGrid = () => {
  return (
    <section className="grid grid-cols-2 gap-5 mt-5">
      <div className="flex gap-5 flex-col">
        <AdminGridCard title="Borrow Requests" link="/admin/borrow-records">
          <BorrowList />
        </AdminGridCard>
        <AdminGridCard title="Account Requests" link="/admin/account-requests">
          <AccountRequestGrid />
        </AdminGridCard>
      </div>
      <AdminGridCard title="Recently Added Books" link="/admin/books">
        <RecentBooksList />
      </AdminGridCard>
    </section>
  );
};
export default AdminGrid;
