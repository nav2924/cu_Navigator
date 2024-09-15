import React from 'react';

export default function Card() {
  return (
    <div className="bg-white shadow-md rounded-lg py-4">
      <div className="pb-0 pt-2 px-4 flex flex-col items-start">
        <p className="text-xs uppercase font-bold">Daily Mix</p>
        <small className="text-gray-500">12 Tracks</small>
        <h4 className="font-bold text-lg">Frontend Radio</h4>
      </div>
      <div className="py-2 overflow-visible">
        <img
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={270}
        />
      </div>
    </div>
  );
}
