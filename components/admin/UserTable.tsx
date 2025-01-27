import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { ExternalLink, Trash2 } from "lucide-react";
import RoleButton from "@/components/admin/RoleButton";

const UserTable = ({ users }: { users: User[] }) => {
  return (
    <div className="table">
      <Table>
        <TableHeader className="table-head">
          <TableRow>
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead>Date Joined</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Books Borrowed</TableHead>
            <TableHead>University ID No</TableHead>
            <TableHead>University ID Card</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="table-body">
          {users.map((user) => (
            <TableRow className="border-b border-light-100" key={user.id}>
              <TableCell className="flex items-center gap-2">
                <div className="flex flex-col">
                  <p className="font-medium text-start">{user.fullName}</p>
                  <p className="text-xs text-light-100">{user.email}</p>
                </div>
              </TableCell>
              <TableCell>
                {dayjs(user.createdAt).format("MMM DD, YYYY")}
              </TableCell>
              <TableCell>
                <RoleButton
                  userId={user.id as string}
                  role={user.role as string}
                />
              </TableCell>
              <TableCell className="text-center">
                {user.borrowedBookCount}
              </TableCell>
              <TableCell>{user.universityId}</TableCell>
              <TableCell>
                <button className="view">
                  <span>View ID Card</span>
                  <ExternalLink className="size-5" />
                </button>
              </TableCell>
              <TableCell className="text-right">
                <button>
                  <Trash2 className="size-5 text-red" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default UserTable;
