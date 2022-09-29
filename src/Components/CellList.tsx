import React from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./CellListItem";

const CellList: React.FC = () => {
  const cellList = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => {
      return data[id];
    });
  });

  const renderedList = cellList.map((item, key) => (
    <CellListItem key={key} item={item} />
  ));

  return <div>{renderedList}</div>;
};

export default CellList;
