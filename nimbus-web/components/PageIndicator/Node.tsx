import useElementSize from "@/hooks/useElementSize";
import React from "react";
import * as Scroll from "react-scroll";
import { ScrollContext } from "../Plan";
import useMediaQuery from "@/hooks/useMediaQuery";

interface IProps {
    active: boolean;
    size: number;
    index: number;
    name: string;
    isCurrent: boolean;
}

const Node = ({ size, active, index, name, isCurrent }: IProps) => {
    const { setCurrentValue } = React.useContext(ScrollContext);
    //const pageSize = useElementSize("input-container");
    const isLargerThanMedium = useMediaQuery("(min-width:768px)");
    const handleOnClick = (index: number) => {
        /*const scroll = Scroll.animateScroll;
        scroll.scrollTo(index * pageSize.height, {
            duration: 1000,
            smooth: true,
            containerId: "form-container",
        });*/
        setCurrentValue(index);
    };
    return (
        <button
            onClick={() => {
                handleOnClick(index);
            }}
            style={{
                height: size,
                width: size,
            }}
            className={`${
                active ? "border-tricolorgreen" : "border-neutral-200"
            } ${
                isCurrent ? "scale-110 text-tricolorgreen" : "text-neutral-600"
            } relative flex border-[4px] bg-white rounded-full
            transition duration-300 z-[2]`}
        >
            <div className="absolute top-0 bottom-0 left-12 my-auto h-fit text-sm">
                {isLargerThanMedium ? name : null}
            </div>
            <div className="m-auto">{index + 1}</div>
        </button>
    );
};

export default Node;
