import React, { useState } from "react";
import { useGetAddressQuery } from "../api/AddressApi";
import { FaArrowRight } from "react-icons/fa";
import mapimg from "../assets/pattern-bg-desktop.png";
import { skipToken } from "@reduxjs/toolkit/query";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

function Test({ location }) {
  const map = useMap();
  if (location) map.flyTo(location, 12);

  return location ? (
    <Marker draggable position={location}>
      <Popup>You are here:</Popup>
    </Marker>
  ) : null;
}
const Address = () => {
  const [input, setInput] = useState("");
  const [address, setAddress] = useState(skipToken);
  const { data, isLoading, error } = useGetAddressQuery(address);
  console.log(data);
  console.log(process.env.REACT_GOE_API_KEY);
  const handleSubmit = (e) => {
    e.preventDefault();
    setAddress(input);
  };

  return (
    <>
      <div
        style={{ backgroundImage: `url(${mapimg})` }}
        className="z-50 bg-blue-500  h-[250px] py-2 "
      >
        <div className="container h-full relative mx-auto mt-6 flex flex-col items-center gap-6">
          <h1 className="text-white capitalize font-bold text-2xl">
            IP Address Tracker
          </h1>
          <form
            onSubmit={handleSubmit}
            className="rounded-xl overflow-hidden min-w-[300px] w-full flex "
          >
            <input
              type="text"
              placeholder="Search  for any IP address or domain"
              className="w-full border-none outline-none p-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="text-white px-3 flex justify-center items-center cursor-pointer bg-black"
            >
              <FaArrowRight />
            </button>
          </form>

          {isLoading && <>Loading ...</> && error ? (
            <>Opps, Erros ! </>
          ) : (
            <>
              {" "}
              {data && (
                <div className="absolute text-center z-50 rounded-lg w-full -bottom-2/3 sm:-bottom-[45%] md:-bottom-[35%]  justify-items-center left-1/2 bg-white -translate-x-1/2 shadow-lg grid sm:grid-cols-4 p-3">
                  <div className="p-2 md:border-r border-gray-400">
                    <h4 className="uppercase text-gray-400 text-sm md:mb-3">
                      ip address
                    </h4>
                    <h1 className="font-bold md:text-xl">{data?.ip}</h1>
                  </div>
                  <div className="p-2 md:border-r border-gray-400">
                    <h4 className="uppercase text-gray-400 text-sm md:mb-3">
                      location
                    </h4>
                    <h1 className="font-bold md:text-xl">
                      {data?.countryCapital}
                    </h1>
                  </div>
                  <div className="p-2 md:border-r border-gray-400">
                    <h4 className="uppercase text-gray-400 text-sm md:mb-3">
                      Timezone
                    </h4>
                    <h1 className="font-bold md:text-xl">{data?.gmt}</h1>
                  </div>
                  <div className="p-2 ">
                    <h4 className="uppercase text-gray-400 text-sm md:mb-3">
                      isp
                    </h4>
                    <h1 className="font-bold md:text-xl">{data?.org}</h1>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {data ? (
        <MapContainer
          style={{ width: "100%", height: "80%", zIndex: 2 }}
          center={[51.505, -0.09] || [data?.latitude, data?.longitude]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Test location={{ lat: data?.latitude, lng: data?.longitude }} />
        </MapContainer>
      ) : (
        <MapContainer
          style={{ width: "100%", height: "100%", zIndex: 2 }}
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={{ lat: 51.505, lng: -0.09 }}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </>
  );
};

export default Address;
