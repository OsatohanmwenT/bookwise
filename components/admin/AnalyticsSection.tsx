import React from "react";
import BorrowStat from "@/components/admin/BorrowStat";
import UserStat from "@/components/admin/UserStat";
import BookStat from "@/components/admin/BookStat";

const AnalyticsSection = async () => {
  return (
    <div className="grid xl:grid-cols-3 w-full gap-5">
      <BorrowStat />
      <UserStat />
      <BookStat />
    </div>
  );
};
export default AnalyticsSection;
