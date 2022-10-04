import React from "react";
import { AiOutlineDown, AiOutlineUp, AiOutlineDelete } from "react-icons/ai";
import { useActions } from "../hooks/use-actions";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div className="flex  text-stone-700 items-center h-[30px] bg-yellow-300 rounded-sm">
      <div className=" group flex items-center ">
        <button
          className="  text-xl h-[30px] hover:bg-green-500    hover:text-white transition-all duration-[0.5s]  "
          onClick={() => moveCell(id, "up")}
        >
          <AiOutlineUp />
        </button>
        <div className=" group-hover:z-20 w-[2px] h-[20px] bg-stone-600 text-xl group-hover:bg-white transition-all group-hover:scale-y-150 "></div>
      </div>
      <div className=" group flex items-center  ">
        <div className="  relative left-[-2px] w-[2px] h-[20px] bg-stone-600 text-xl group-hover:bg-white transition-all group-hover:scale-y-150 "></div>

        <button
          className="  text-xl h-[30px]    hover:bg-blue-500 hover:text-white  transition-all duration-[0.5s] "
          onClick={() => moveCell(id, "down")}
        >
          <AiOutlineDown />
        </button>
        <div className="group-hover:z-20 w-[2px] h-[20px] bg-stone-600 text-xl group-hover:bg-white transition-all group-hover:scale-y-150"></div>
      </div>
      <div className="group flex items-center">
        <div className="  relative left-[-2px] w-[2px] h-[20px] bg-stone-600 text-xl group-hover:bg-white transition-all group-hover:scale-y-150 "></div>

        <button
          className="  text-xl h-[30px]  hover:bg-red-500 hover:text-white transition-all duration-[0.5s]  "
          onClick={() => deleteCell(id)}
        >
          <AiOutlineDelete />
        </button>
      </div>
    </div>
  );
};

export default ActionBar;
