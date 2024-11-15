import { p } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { FaArrowDown, FaArrowDownAZ, FaArrowDownLong } from "react-icons/fa6";

export default function Search() {
  const [sideBarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  console.log(listing, "listing");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      const normalizeBoolean = (value) => (value === "true" ? true : false);

      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: normalizeBoolean(parkingFromUrl),
        furnished: normalizeBoolean(furnishedFromUrl),
        offer: normalizeBoolean(offerFromUrl),
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListing = async () => {
      try {
        setLoading(true);
        setError(null);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        if (!res.ok) throw new Error("Failed to fetch listings");
        const data = await res.json();
        if (data.length > 8) {
          setShowMore(true);
        }else{setShowMore(false)}
        setListing(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;

    if (id === "searchTerm") {
      setSidebarData({ ...sideBarData, searchTerm: value });
    }

    if (id === "all" || id === "rent" || id === "sale") {
      setSidebarData({ ...sideBarData, type: id });
    }

    if (id === "parking" || id === "furnished" || id === "offer") {
      setSidebarData({ ...sideBarData, [id]: checked });
    }

    if (id === "sort_order") {
      const [sort, order] = value.split("_");
      setSidebarData({ ...sideBarData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sideBarData.searchTerm);
    urlParams.set("type", sideBarData.type);
    urlParams.set("parking", sideBarData.parking);
    urlParams.set("furnished", sideBarData.furnished);
    urlParams.set("offer", sideBarData.offer);
    urlParams.set("sort", sideBarData.sort);
    urlParams.set("order", sideBarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  const onShowMoreClick = async () => {
    const numberOfListings = listing.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListing([...listing, ...data]);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center border border-slate-600 shadow-sm rounded-lg">
            <input
              placeholder="Search"
              className="w-full bg-transparent border-none outline-none p-2"
              type="text"
              id="searchTerm"
              value={sideBarData.searchTerm}
              onChange={handleChange}
            />
            <button type="button">
              <IoSearchOutline className="mx-2 size-6 text-blue-700" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <label className="font-bold">Type:</label>
            <div className="flex gap-2">
              <input
                type="radio"
                id="all"
                name="type"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                id="rent"
                name="type"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                id="sale"
                name="type"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.type === "sale"}
              />
              <span>Sale</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <label className="font-bold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sideBarData.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="font-bold">Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="p-3 rounded-lg border shadow">
              <option value="regularPrice_desc">Price High to Low</option>
              <option value="regularPrice_asc">Price Low to High</option>
              <option value="created_at_desc">Newest</option>
              <option value="created_at_asc">Oldest</option>
            </select>
          </div>

          <button className="bg-slate-600 p-3 rounded-lg text-white font-semibold">
            Apply Filter
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-2xl font-semibold border-b p-3 text-slate-700 mt-5">
          Results: {listing.length}
        </h1>
        <div className="w-full grid xl:grid-cols-3 md:grid-cols-1  gap-4 justify-center p-7 items-center">
          {!loading && listing.length === 0 && (
            <p className="text-xl text-slate-700">No Items Found</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}
          {!loading &&
            listing &&
            listing.map((item) => <Card key={item._id} item={item} />)}
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="flex items-center justify-center gap-2 text-green-500 border p-3 border-green-500 font-semibold rounded hover:bg-green-500 hover:text-white transition-all duration-300">
              Show More{" "}
              <FaArrowDown className="hover:mt-2 transition-mt duration-300" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
