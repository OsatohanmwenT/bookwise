"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { changeUserRole } from "@/lib/admin/actions/user";
import { toast } from "@/hooks/use-toast";

interface Role {
  id: string;
  name: ROLE;
  color: string;
  bgColor: string;
}

const roles: Role[] = [
  {
    id: "user",
    name: "USER",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: "admin",
    name: "ADMIN",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
  },
];

const RoleButton = ({ role, userId }: { role: string; userId: string }) => {
  const [selectedRole, setSelectedRole] = React.useState<string>(role);

  const changeRole = async (newRole: ROLE) => {
    setSelectedRole(newRole);
    try {
      const result = await changeUserRole(userId, newRole);

      if (result.success) {
        toast({
          title: "Success",
          description: "User role changed successfully",
        });

        setSelectedRole(result.data.role);
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-0" asChild>
        <Button
          className={cn(
            "role",
            selectedRole === "USER"
              ? "text-green-600 bg-green-50 hover:!bg-green-200 focus:outline-none"
              : "text-pink-600 bg-pink-50 hover:!bg-red-200",
          )}
        >
          {selectedRole}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        {roles.map((role) => (
          <DropdownMenuItem
            key={role.id}
            className="flex items-center justify-between py-2 cursor-pointer"
            onClick={() => changeRole(role.name)}
          >
            <button
              className={cn(
                "font-medium py-1 px-3 rounded-2xl",
                role.color,
                role.bgColor,
              )}
            >
              {role.name}
            </button>
            {selectedRole === role.name && (
              <Check className="h-4 w-4 text-blue-500" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default RoleButton;
