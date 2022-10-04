import { ResizableBox, ResizableBoxProps } from "react-resizable";
import { useEffect, useState } from "react";
import "./resizable.css";
interface ResizableProps {
  direction: "horizontal" | "vertical"; //certain value expected
  children: React.ReactNode;
}

//children - the thing that we wanna make resizable
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizable: ResizableBoxProps;
  const [innerHeight, setinnerHeight] = useState(window.innerHeight);
  const [innerWidth, setinnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;

    const listner = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setinnerHeight(window.innerHeight);
        setinnerWidth(window.innerWidth);
        if ((window.innerWidth * 0, 75 < width)) {
          setWidth(window.innerWidth * 0.75); //reduce windth
        }
      }, 100);
    };
    window.addEventListener("resize", listner);

    return () => {
      window.removeEventListener("resize", listner);
    };
  }, []);

  if (direction === "vertical") {
    resizable = {
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, innerHeight * 0.1],
      height: 400,
      width: Infinity,
      resizeHandles: ["s"],
    };
  } else {
    resizable = {
      className: "flex flex-row",
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.3, Infinity],
      height: Infinity,
      width,
      resizeHandles: ["e"],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  }

  return (
    //inifity -take space as much as possible
    <ResizableBox {...resizable}>{children}</ResizableBox>
  );
};

export default Resizable;
