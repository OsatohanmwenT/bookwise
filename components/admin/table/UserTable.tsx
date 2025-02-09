"use client";

import React, { useState } from "react";
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
import ModeButton from "@/components/admin/ModeButton";
import StatusDialog from "@/components/admin/StatusDialog";
import { deleteUser } from "@/lib/admin/actions/user";
import { toast } from "@/hooks/use-toast";
import ViewImage from "@/components/admin/ViewImage";

const UserTable = ({ users }: { users: User[] }) => {
  const [showDeny, setShowDeny] = useState(false);

  const handleDeleteUser = async (id: string) => {
    try {
      const result = await deleteUser(id);

      if (result.success) {
        toast({
          title: "Success",
          description: "User role changed successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "An error occurred.",
        variant: "destructive",
      });
    } finally {
      setShowDeny(false);
    }
  };
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
          {!users.length && (
            <TableRow>
              <TableCell colSpan={7}>
                <div className="rounded-lg py-10 bg-gray-100 border-gray-400-400 border flex items-center justify-center">
                  <p className="text-gray-700 text-lg">
                    No Users Request Found
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
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
                <ModeButton
                  userId={user.id as string}
                  initialMode={user.role as string}
                  type="ROLE"
                />
              </TableCell>
              <TableCell className="text-center">
                {user.borrowedBookCount}
              </TableCell>
              <TableCell>{user.universityId}</TableCell>
              <TableCell>
                <ViewImage path={user.universityCard} />
              </TableCell>
              <TableCell className="text-right">
                <StatusDialog
                  type="error"
                  title="Delete Account"
                  description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
                  buttonText="Delete user account"
                  onAction={() => handleDeleteUser(user.id)}
                  trigger={
                    <button>
                      <Trash2 className="text-red-600 size-5" />
                    </button>
                  }
                  open={showDeny}
                  onOpenChange={setShowDeny}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default UserTable;
