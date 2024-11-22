import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import { div } from "framer-motion/client";
import Card from "../components/Card";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListing, setSalelisting] = useState([]);
  const [rentListing, setRentListing] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListing();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListing = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=8");
        const data = await res.json();
        setRentListing(data);
        fetchSaleListing();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListing = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=6");
        const data = await res.json();
        setSalelisting(data);
      } catch (error) {}
    };

    fetchOfferListing();
  }, []);

  return (
    <div>
      {/* top */}
      <div className=" mx-14 md:flex-row flex items-center justify-center p-4 px-8">
        <div className="flex flex-1 flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-semibold text-4xl lg:text-6xl">
          Your Journey to <span className="text-green-400">Home</span>
          <br /> Starts <span className="text-green-400">Here</span>
        </h1>
        <div className="text-gray-400 text-xs  sm:text-sm">
          Your perfect home is closer than you think. Whether you are buying,
          <br />
          selling, or renting, we are here to guide you every step of the way
          <br />
        </div>
        <Link
          className="text-xs sm:text-sm font-bold text-blue-500 hover:underline transition-all duration-300"
          to={"/search"}>
          Let's start
        </Link>
      </div>
      <img src="/hero.svg" className="lg:block flex-1 flex-col hidden h-[500px] w-[500px]" alt="hero" />
      </div>
      
      {/* swiper */}

      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat `,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}></div>
            </SwiperSlide>
          ))}
      </Swiper>

      <div className="max-w-8xl p-2 flex flex-col gap-8 my-10 mx-auto">
        {offerListings && offerListings.length > 0 && (
          <div className="p-10">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recent Offers</h2>
              <Link className="text-sm text-green-600 hover:underline" to={"/search?offer=true"}>Show More</Link>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {offerListings.map((item) => (
                <Card item={item} key={item._id} />
              ))}
            </div>
          </div>
        )}
               {saleListing && saleListing.length > 0 && (
          <div className="p-10">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recent Places For Sale</h2>
              <Link className="text-sm text-green-600 hover:underline" to={"/search?type=sale"}>Show More</Link>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mx-auto">
              {saleListing.map((item) => (
                <Card item={item} key={item._id} />
              ))}
            </div>
          </div>
        )}
              
              
               {rentListing && rentListing.length > 0 && (
          <div className="p-10">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recent Places For Rent</h2>
              <Link className="text-sm text-green-600 hover:underline" to={"/search?type=rent"}>Show More</Link>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {rentListing.map((item) => (
                <Card item={item} key={item._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* items */}
    </div>
  );
}
