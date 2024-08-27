import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);
  return (
    <></>
    // <span>
    //   <input
    //     className="border-[1px] border-[#626670] rounded-[2px] w-48 py-[1px] px-2 my-2 text-[14px]"
    //     value={value || ""}
    //     onChange={(e) => {
    //       setValue(e.target.value);
    //       onChange(e.target.value);
    //     }}
    //     placeholder="Search"
    //   />
    // </span>
  );
};
