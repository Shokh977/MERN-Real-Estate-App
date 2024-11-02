import React from 'react';
import Profile from './Profile';
// import Settings from './Settings';
// import Listings from './Listings';

const MainContent = ({ section }) => {
  const renderContent = () => {
    switch (section) {
      case 'profile':
        return <Profile />;
    //   case 'settings':
    //     return <Settings />;
      case 'listings':
        return <p><Listings /></p>;
      default:
        return <div>Select a section to view content</div>;
    }
  };

  return (
    <div className="flex-1 p-8 bg-white shadow-md rounded-lg m-4">
      {renderContent()}
    </div>
  );
};

export default MainContent;
