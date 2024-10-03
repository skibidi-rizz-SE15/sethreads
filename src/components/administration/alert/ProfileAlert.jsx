import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Details from './Details';

const ProfileAlert = ({ isOpen, onClose, children }) => {

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative z-10 bg-eerie-black text-white p-6 rounded-lg shadow-xl max-w-md w-fit">
        <button
          className="absolute top-2 right-2 text-software-orange hover:text-software-orange-hover"
          onClick={onClose}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <Details student={children} />
      </div>
    </div>
  );
};

export default ProfileAlert;