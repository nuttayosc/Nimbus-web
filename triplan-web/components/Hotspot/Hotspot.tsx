import React from "react";
import HotspotCard from "./HotspotCard";
import useMediaQuery from "@/hooks/useMediaQuery";

interface IProps {
    props: Array<any>;
}

const Hotspot = ({ props }: IProps) => {
    const [places] = React.useState<Array<any>>(Object.values(props));
    const [expand, setExpand] = React.useState<Array<boolean>>(
        Object.keys(props).map((index) => false)
    );
    const [current, setCurrent] = React.useState<number>(0);
    const [add, setAdd] = React.useState<number>(0);
    const [transition, setTransition] = React.useState<boolean>(false);
    const [z, setZ] = React.useState<Array<string>>(
        Object.keys(props).map((index) => "-" + index)
    );
    const isLargerThanMedium = useMediaQuery("(min-width: 768px)");
    const calculateZIndexes = () => {
        setZ((prev: any) => {
            let newArr = [...prev];
            newArr.unshift(newArr[newArr.length - 1]);
            newArr = newArr.slice(0, newArr.length - 1);
            return newArr;
        });
    };
    const toggleCard = (index: number) => {
        setExpand((prev) => {
            const newArr = [...prev];
            newArr[index] = !newArr[index];
            return newArr;
        });
    };
    React.useEffect(() => {
        if (current !== 0 && !expand[current] && isLargerThanMedium) {
            setTimeout(() => toggleCard(current), 200);
        }
    }, [current]);
    return (
        <div className="relative flex text-black md:h-[30rem] bg-yellow-200 py-5">
            <div className="flex flex-col md:flex-row m-auto z-30 justify-center p-1 w-full">
                <div className="w-full max-w-[20rem] h-fit md:h-80 md:bg-white text-center md:shadow-md m-auto md:m-1 rounded-xl">
                    <h1 className="text-5xl font-extrabold p-5">
                        ICONIC PLACES
                    </h1>
                    <p className="text-sm px-5 pb-5 md:pb-0">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptates nobis eum, tenetur assumenda officia quisquam
                        nulla recusandae nisi asperiores quia quam maxime
                        quibusdam nesciunt ea! Beatae corrupti saepe
                        reprehenderit voluptatum.
                    </p>
                </div>
                <div className="relative w-full max-w-[20rem] h-80 m-auto mt-2 md:m-1">
                    {places.map((obj: any, index: number) => {
                        return (
                            <HotspotCard
                                obj={obj}
                                index={index}
                                places={places}
                                expand={expand}
                                current={current}
                                add={add}
                                z={z}
                                transition={transition}
                                toggleCard={toggleCard}
                            />
                        );
                    })}
                    <div
                        onMouseEnter={() => setAdd(10)}
                        onMouseLeave={() => setAdd(0)}
                        onClick={() => {
                            if (expand[current]) toggleCard(current);
                            setTransition(true);
                            setTimeout(() => {
                                calculateZIndexes();
                                setCurrent((prev) => {
                                    if (prev + 1 === expand.length) return 0;
                                    return prev + 1;
                                });
                                setTransition(false);
                            }, 500);
                        }}
                        className="absolute left-[15rem] opacity-50 w-20 h-full z-40 
                        duration-500 cursor-pointer"
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Hotspot;