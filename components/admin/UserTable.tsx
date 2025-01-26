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
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const UserTable = ({ users }: { users: User[] }) => {
  return (
    <div className="table">
      <Table>
        <TableHeader className="table-head">
          <TableRow>
            <TableHead className="w-[300px]">Name</TableHead>
            <TableHead>Date Joined</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Books Borrowed</TableHead>
            <TableHead>University ID No</TableHead>
            <TableHead>University ID Card</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="table-body">
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="flex items-center gap-2">
                <div className="flex items-center flex-col">
                  <p className="font-medium text-start">{user.fullName}</p>
                  <p className="text-xs text-light-100">{user.email}</p>
                </div>
              </TableCell>
              <TableCell>
                {dayjs(user.createdAt).format("MMM DD, YYYY")}
              </TableCell>
              <TableCell>
                <Button>{user.role}</Button>
              </TableCell>
              <TableCell>{user.universityId}</TableCell>
              <TableCell>
                <Button>View ID Card</Button>
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
