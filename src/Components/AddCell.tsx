import React from "react";
import { useActions } from "../hooks/use-actions";

interface AddCellProps {
  id: string | null;
  forceVisible: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ id, forceVisible }) => {
  const { insertCellBefore } = useActions();
  const visibility = forceVisible ? "100" : "0";

  return (
    <div
      className={` relative flex justify-center gap-4 my-2 w-full opacity-${visibility} hover:opacity-100 transition-opacity ease-in duration-[0.5s] delay-50  `}
    >
      <button
        className=" z-[100] bg-stone-800  text-stone-100  p-2 rounded-md font-medium hover:bg-stone-700 transition-all   "
        onClick={() => insertCellBefore(id, "code")}
      >
        Code
      </button>
      <button
        className=" z-[100] bg-stone-800 text-stone-100 p-2 rounded-md font-medium hover:bg-stone-700 transition-all  "
        onClick={() => insertCellBefore(id, "text")}
      >
        Text
      </button>
      <div className="absolute w-full h-[1px] border-b-2 border-solid border-stone-700  top-[50%] buttom-[50%] z-1"></div>
    </div>
  );
};

export default AddCell;
