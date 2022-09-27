import { ResizableBox } from "react-resizable";
import "./resizable.css";
interface ResizableProps {
  direction: "horizontal" | "vertical"; //certain value expected
  children: React.ReactNode;
}

//children - the thing that we wanna make resizable
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox height={400} width={400} resizeHandles={["s"]}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;
