"use client";

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
import { ExternalLink, LucideShieldClose } from "lucide-react";
import StatusDialog from "@/components/admin/StatusDialog";
import { approveUser, denyUser } from "@/lib/admin/actions/user";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import ViewImage from "@/components/admin/ViewImage";

const AccountRegTable = ({ users }: { users: User[] }) => {
  const handleDenialUser = async (id: string) => {
    try {
      const result = await denyUser(id);

      if (result?.success) {
        toast({
          title: "Success",
          description: "User was removed Successfully!",
        });
      } else {
        toast({
          title: "Error",
          description: result?.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Error while denying user access",
        variant: "destructive",
      });
    }
  };

  const handleApprovalOfUser = async (id: string) => {
    try {
      const result = await approveUser(id);

      if (result?.success) {
        toast({
          title: "Success",
          description: "User was approved Successfully!",
        });
      } else {
        toast({
          title: "Error",
          description: result?.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Error while approving user access",
        variant: "destructive",
      });
    }
  };

  return (
    <Table>
      <TableHeader className="table-head">
        <TableRow>
          <TableHead className="w-[300px]">Name</TableHead>
          <TableHead>Date Joined</TableHead>
          <TableHead>University ID No</TableHead>
          <TableHead>University ID Card</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="table-body">
        {!users.length && (
          <TableRow>
            <TableCell colSpan={5}>
              <div className="rounded-lg py-10 bg-gray-100 border-gray-400-400 border flex items-center justify-center">
                <p className="text-gray-700 text-lg">No Users Request Found</p>
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
            <TableCell>{user.universityId}</TableCell>
            <TableCell>
              <ViewImage path={user.universityCard} />
            </TableCell>
            <TableCell>
              <div className="flex gap-4">
                <StatusDialog
                  title="Approve Book Request"
                  description="Approve the student’s account request and grant access. A confirmation email will be sent upon approval."
                  buttonText="Approve & Send Confirmation"
                  onAction={() => handleApprovalOfUser(user.id)}
                  trigger={
                    <Button className="!text-green-500 hover:!bg-green-200 !bg-green-50 shadow-none">
                      Approve Account
                    </Button>
                  }
                />
                <StatusDialog
                  type="error"
                  title="Deny Account Request"
                  description="Denying this request will notify the student they’re not eligible due to unsuccessful ID card verification."
                  buttonText="Deny & Notify Student"
                  onAction={() => handleDenialUser(user.id)}
                  trigger={
                    <button>
                      <LucideShieldClose className="text-red-600 size-5" />
                    </button>
                  }
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default AccountRegTable;
