import React from 'react';

function Card({ url, alt, title, description, children }) {
  return (
    <div className="card lg:card-side mx-4 bg-base-100 shadow-xl flex flex-col md:flex-row">
      <figure className="lg:w-1/2">
        <img
          src={url}  // Use the url prop
          alt={alt}  // Use the alt prop
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="card-body lg:w-1/2 p-6">
        <h2 className="card-title text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-4">
          {description}
        </p>
        <div className="flex flex-col space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Card;
