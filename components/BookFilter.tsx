import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BookFilter = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px] bg-dark-300 border-none text-light-100">
        <SelectValue placeholder="Filter by:" />
      </SelectTrigger>
      <SelectContent className="bg-dark-300 border-none text-light-100">
        <SelectGroup>
          <SelectLabel className="text-light-200">Fruits</SelectLabel>
          <SelectItem className="filter-item" value="apple">
            Apple
          </SelectItem>
          <SelectItem className="filter-item" value="banana">
            Banana
          </SelectItem>
          <SelectItem className="filter-item" value="blueberry">
            Blueberry
          </SelectItem>
          <SelectItem className="filter-item" value="grapes">
            Grapes
          </SelectItem>
          <SelectItem className="filter-item" value="pineapple">
            Pineapple
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default BookFilter;
