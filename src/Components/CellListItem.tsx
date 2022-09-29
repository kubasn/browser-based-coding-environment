import React from "react";
import { Cell } from "../state";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";

interface CellListItemProps {
  item: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ item }) => {
  const ListItem: JSX.Element =
    item.type == "code" ? <CodeCell item={item} /> : <TextEditor item={item} />;

  return <div>{ListItem}</div>;
};

export default CellListItem;
