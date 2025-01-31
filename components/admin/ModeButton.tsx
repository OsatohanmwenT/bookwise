"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { changeUserRole } from "@/lib/admin/actions/user";
import { toast } from "@/hooks/use-toast";
import { changeBookStatus } from "@/lib/admin/actions/book";

interface Mode {
  id: string;
  name: ROLE | STATUS;
  color: string;
  bgColor: string;
}

const roles: Mode[] = [
  {
    id: "user",
    name: "USER",
    color: "text-green-600",
    bgColor: "bg-green-50 hover:!bg-green-200 ",
  },
  {
    id: "admin",
    name: "ADMIN",
    color: "text-pink-600",
    bgColor: "bg-pink-50 hover:!bg-red-200 ",
  },
];

const statuses: Mode[] = [
  {
    id: "borrowed",
    name: "BORROWED",
    color: "text-violet-700",
    bgColor: "bg-violet-50 hover:!bg-violet-200",
  },
  {
    id: "returned",
    name: "RETURNED",
    color: "text-blue-700",
    bgColor: "bg-blue-50 hover:!bg-blue-200",
  },
  {
    id: "late-return",
    name: "LATE RETURN",
    color: "text-red-700",
    bgColor: "bg-red-50 hover:!bg-red-200",
  },
];

const ModeButton = ({
  initialMode,
  userId,
  type,
}: {
  initialMode: string;
  userId: string;
  type: string;
}) => {
  const [selectedMode, setSelectedMode] = React.useState<string>(initialMode);
  const availableModes = type === "ROLE" ? roles : statuses;

  const handleChangeMode = async (newMode: ROLE | STATUS) => {
    setSelectedMode(newMode);
    try {
      if (type === "ROLE") {
        const result = await changeUserRole(userId, newMode as ROLE);

        if (result.success) {
          toast({
            title: "Success",
            description: "User role changed successfully",
          });

          setSelectedMode(result.data.role);
        } else {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          });
        }
      } else if (type === "STATUS") {
        const result = await changeBookStatus(userId, newMode as STATUS);

        console.log(result);
        if (result?.success) {
          toast({
            title: "Success",
            description: "User role changed successfully",
          });

          setSelectedMode(result?.data.status);
        } else {
          toast({
            title: "Error",
            description: result?.error,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "An error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-0" asChild>
        <Button
          className={cn(
            "role-btn",
            availableModes.find((m) => m.name === selectedMode)?.color,
            availableModes.find((m) => m.name === selectedMode)?.bgColor,
          )}
        >
          {selectedMode}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {type === "ROLE" ? "Change role" : "Change status"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableModes.map((mode) => (
          <DropdownMenuItem
            key={mode.id}
            className="flex items-center justify-between py-2 cursor-pointer"
            onClick={() => handleChangeMode(mode.name)}
          >
            <button
              className={cn(
                "font-medium py-1 px-3 rounded-2xl",
                mode.color,
                mode.bgColor,
              )}
            >
              {mode.name}
            </button>
            {selectedMode === mode.name && (
              <Check className="h-4 w-4 text-blue-500" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ModeButton;
