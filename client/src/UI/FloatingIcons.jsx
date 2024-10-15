import React from 'react';

const FloatingIcons = () => {
  return (
    <div className="floating-icons">
      <svg /* House Icon */ width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
        <path d="M3 9L12 2L21 9V22H3V9Z" fill="#A9A9A9"/>
      </svg>
      <svg /* Building Icon */ width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
        <path d="M3 22V20H5V22H3ZM7 22V20H9V22H7ZM11 22V20H13V22H11ZM15 22V20H17V22H15ZM19 22V20H21V22H19ZM4 2V6H20V2H4ZM4 8V10H20V8H4ZM4 12V14H20V12H4ZM4 16V18H20V16H4Z" fill="#A9A9A9"/>
      </svg>
      <svg /* Key Icon */ width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
        <path d="M15 8C15 6.89 15.89 6 17 6C18.11 6 19 6.89 19 8C19 9.11 18.11 10 17 10C15.89 10 15 9.11 15 8Z" fill="#A9A9A9"/>
        <path d="M15 11H13V13H11V11H9V15H13V17H9V19H15V15H17V11H15Z" fill="#A9A9A9"/>
      </svg>
      <svg /* Location Icon */ width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
        <path d="M12 2C10.14 2 8.5 3.64 8.5 5.5C8.5 9.5 12 15 12 15C12 15 15.5 9.5 15.5 5.5C15.5 3.64 13.86 2 12 2ZM12 17C9.79 17 7.64 18.56 6.64 21H17.36C16.36 18.56 14.21 17 12 17Z" fill="#A9A9A9"/>
      </svg>
    </div>
  );
};

export default FloatingIcons;
