import React from "react";

function CardSkeleton() {
  return (
    <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm  mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    </div>
  );
}

export default CardSkeleton;
