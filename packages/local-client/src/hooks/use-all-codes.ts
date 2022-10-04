import { useTypedSelector } from "./use-typed-selector";

//cellId - id of cell that we want find cumulative code for
export const useAllCode = (cellId: string) => {
  //current cell code + all previous code
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const showFunc = `
import _React from 'react';
import _ReactDOM from 'react-dom';

var show = value => {

  if(typeof value === 'object' ){
    if(value.$$typeof && value.props){
      _ReactDOM.render(value,document.querySelector('#root'))
    } else {
    document.querySelector('#root').innerHTML=JSON.stringify(value);
    }
  } else {
    document.querySelector('#root').innerHTML=value;

  }

};


`;

    const showFuncDis = "var show = () => {}";

    const allCodes = [];
    for (let i of orderedCells) {
      if (i.type === "code") {
        //if it is a cell that we want to execute -> add(enable) show function
        if (i.id == cellId) {
          allCodes.push(showFunc);
        } else {
          allCodes.push(showFuncDis);
        }
        allCodes.push(i.content);
      }
      //if we get to current cell -> break function
      if (i.id === cellId) {
        break;
      }
    }
    return allCodes;
  }).join("\n");
};
