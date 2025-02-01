import React from "react";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchForm = () => {
  return (
    <Form className="admin-search" action="/">
      <Search className="size-7" />
      <Input
        placeholder="Search users, books by title, author, or genre."
        className="admin-search_input"
      />
    </Form>
  );
};
export default SearchForm;
