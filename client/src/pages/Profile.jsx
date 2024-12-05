import React, { useState, useEffect } from "react";
import Listings from "./profile/sideLinks/Listings";
import ProfileForm from "./profile/ProfileForm";
import Sidebar from "./profile/sideLinks/Sidebar";
import { useNavigate } from "react-router-dom";
import SignOut from "./profile/sideLinks/SignOut";
import DeleteProfile from "./profile/sideLinks/DeleteProfile";

export default function Profile() {
  const [menu, setMenu] = useState("listings");
  const navigate = useNavigate();

  useEffect(() => {
    if (menu === "createlistings") {
      navigate("/create-listing");
    }
  }, [menu, navigate]);

  const renderContent = () => {
    switch (menu) {
      case "listings":
        return <Listings />;
      case "profile":
        return <ProfileForm />;
      case "signout":
        return <SignOut/>;
      case "delete":
        return <DeleteProfile/>;
      default:
        return <div>Invalid menu option</div>;
    }
  };

  return (
    <div className="h-screen flex">
      <Sidebar menu={menu} setMenu={setMenu} />
      <div className="flex-1 p-8 overflow-y-auto">{renderContent()}</div>
    </div>
  );
}
