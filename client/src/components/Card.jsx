import React from "react";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";

const truncate = (string, num) => {
  if (string.length > num) {
    return string.substring(0, num) + "...";
  } else {
    return string;
  }
};

export default function Card({ item }) {
  return (
    <div className="bg-white   w-full sm:w-[330px] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden rounded-lg">
      <Link to={`/listing/${item._id}`}>
        <img
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
          src={item.imageUrls[0]}
          alt={item.name}
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {item.name}
          </p>
          <div className="flex gap-1 items-center">
            <FaLocationDot className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate">{item.address}</p>
          </div>
          <p className="text-gray-600 text-sm">
            {truncate(item.description, 80)}
          </p>
          <p className="text-slate-500 mt-2 font-semibold">
            $
            {item.offer
              ? item.discountPrice.toLocaleString("en-US")
              : item.regularPrice.toLocaleString("en-US")}
            {item.type === "rent" && " / month"}
          </p>
          <div className="text-slate-700 flex gap-2">
            <div className="font-bold text-sm ">
              {item.bedrooms > 1
                ? `${item.bedrooms} beds`
                : `${item.bedrooms} bed`}
            </div>
            <div className="font-bold text-sm ">
              {item.bathrooms > 1
                ? `${item.bathrooms} baths`
                : `${item.bathrooms} bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
