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
    <Fragment key={key}>
      <AddCell forceVisible={false} id={item.id} />
      <CellListItem item={item} />
    </Fragment>
  ));

  return (
    <div>
      {renderedList}{" "}
      <AddCell forceVisible={cellList.length === 0 ? true : false} id={null} />{" "}
    </div>
  );
};

export default CellList;
