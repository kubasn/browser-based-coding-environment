import React from "react";
import { Cell } from "../state";
import ActionBar from "./ActionBar";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";

interface CellListItemProps {
  item: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ item }) => {
  const ListItem: JSX.Element =
    item.type == "code" ? <CodeCell item={item} /> : <TextEditor item={item} />;

  return (
    <div className="w-full flex justify-center">
      <div className="relative w-[800px] margin-auto">
        {ListItem}
        <div className="absolute top-1 right-1  ">
          {" "}
          <ActionBar id={item.id} />
        </div>
      </div>
    </div>
  );
};

export default CellListItem;
