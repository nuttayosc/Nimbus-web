import { useEffect, useState, useRef, useCallback } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

import Map, {
    Marker,
    Popup,
    ScaleControl,
    MapRef,
    Layer,
    Source,
    MarkerDragEvent,
    LngLat,
} from "react-map-gl";
import Pin from "@/components/Pin";
import polyline from "@mapbox/polyline";
import useMap from "@/hooks/useMap";
import PlaceDetail from "@/components/PlanTab/PlaceDetail";
import SideBar from "@/components/PlanTab/SideBar";
import FullScreenPlan from "@/components/PlanTab/FullScreenPlan";

export default function map() {
    const {
        mapRef,
        points,
        togglePinState,
        onSelect,
        geojson,
        layerStyle,
        pinState,
        openTab,
        closeFullTab,
        closed,
        openFullTab,
        openReview,
        toggleOpenReview,
    } = useMap();

    return (
        <div>
            <div className="grid place-items-center  z-50 bg-gray-300 text-black grid-cols-12 absolute w-full overflow-hidden ">
                {!openFullTab && (
                    <SideBar
                        toggleOpenReview={toggleOpenReview}
                        openTab={openTab}
                    />
                )}

                {openFullTab && !closed && (
                    <FullScreenPlan
                        openFullTab={openFullTab}
                        closeFullTab={closeFullTab}
                    />
                )}

                {!openFullTab && (
                    <div className="col-span-8 w-full h-[100%]">
                        {openReview && (
                            <div className=" bg-slate-400 bg-opacity-70 w-full h-[89.5%] fixed ">
                                <PlaceDetail
                                    placeTitle="Thor's Well"
                                    address="Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima autem itaque molestias sunt suscipit? Ipsam, "
                                    placeDescription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima autem itaque molestias sunt suscipit? Ipsam, magnam cupiditate error qui quos saepe quidem blanditiis facilis nostrum in commodi fugit recusandae illo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima autem itaque molestias sunt suscipit? Ipsam, magnam cupiditate error qui quos saepe quidem blanditiis facilis nostrum in commodi fugit recusandae illo."
                                    toggleOpenReview={toggleOpenReview}
                                />
                            </div>
                        )}

                        <div className="bg-rose-400  w-full h-[100%] text-[10rem]">
                            MAP
                        </div>
                    </div>
                )}

                {/* {!openFullTab && (
        <Map
            ref={mapRef}
            initialViewState={{
                longitude: 100.5018,
                latitude: 13.7563,
                zoom: 10,
            }}
            style={{ gridColumnStart: 5, gridColumnEnd: "span 12" }}
            mapboxAccessToken={
                "pk.eyJ1IjoicGlwcC00MzIiLCJhIjoiY2xkYnF1NXU4MDM2MjNxcXdrczFibHJsdiJ9.uuksf9mguzejH6e6R0RQxg"
            }
            mapStyle="mapbox://styles/mapbox/streets-v12"
        >
            {Object.keys(points).map((key: string, index: number) => {
                return (
                    <Marker
                        longitude={points[key].coordinates.lng}
                        latitude={points[key].coordinates.lat}
                        anchor="bottom"
                        onClick={(e) => {
                            togglePinState(index);
                            onSelect(
                                points[key].coordinates.lng,
                                points[key].coordinates.lat
                            );
                            e.originalEvent.stopPropagation();
                        }}
                    >
                        <Pin fill={pinState[index]} />
                    </Marker>
                );
            }, [])}

            <ScaleControl />
            <Source id="my-data" type="geojson" data={geojson}>
                <Layer {...layerStyle} />
            </Source>
        </Map>
    )} */}
            </div>
        </div>
    );
}