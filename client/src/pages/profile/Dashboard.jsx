import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onSectionChange={handleSectionChange} />
      <MainContent section={activeSection} />
    </div>
  );
};

export default Dashboard;
