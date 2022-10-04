import React, { Fragment } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import AddCell from "./AddCell";
import CellListItem from "./CellListItem";

const CellList: React.FC = () => {
  const cellList = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => {
      return data[id];
    });
  });

  const renderedList = cellList.map((item, key) => (
    <Fragment key={item.id}>
      <CellListItem item={item} />
      <AddCell forceVisible={false} id={item.id} />
    </Fragment>
  ));

  return (
    <div>
      <AddCell forceVisible={cellList.length === 0 ? true : false} id={null} />{" "}
      {renderedList}{" "}
    </div>
  );
};

export default CellList;
