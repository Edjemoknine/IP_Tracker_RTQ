import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseUrl = "https://geo.ipify.org";
//   https://geo.ipify.org/api/v2/country?apiKey=at_zA4bS71wXEqAc8jCAAQjHYHONVRfZ&ipAddress=8.8.8.8

const baseUrl =
  "https://find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com";
const headerApi = {
  "X-RapidAPI-Key": "6c2a704035mshed3f3f412f5f9aap1c236bjsnbaf789e00c56",
  "X-RapidAPI-Host":
    "find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com",
};
const createRequest = (url) => ({ url, headers: headerApi });

export const LocationApi = createApi({
  reducerPath: "location",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAddress: builder.query({
      query: (adress) =>
        createRequest(
          `/iplocation?ip=${adress}&apikey=873dbe322aea47f89dcf729dcc8f60e8`
        ),
    }),
  }),
});
// export const LocationApi = createApi({
//   reducerPath: "location",
//   baseQuery: fetchBaseQuery({ baseUrl: "https://geo.ipify.org/api/v2" }),
//   endpoints: (builder) => ({
//     getAddress: builder.query({
//       query: (adress) => ({
//         url: `/country,city?apiKey=at_zA4bS71wXEqAc8jCAAQjHYHONVRfZ`,
//         params: { ipAddress: adress },
//         // mode: "no-cors",
//         method: "GET",
//       }),
//     }),
//   }),
// });

export const { useGetAddressQuery } = LocationApi;
