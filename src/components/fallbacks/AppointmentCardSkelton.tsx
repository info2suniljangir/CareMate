

import React from "react";

export default function AppointmentCardSkeleton() {
  return (
    <div className="mx-auto mt-32 max-w-7xl ">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex justify-between flex-col sm:flex-row border-t border-b border-gray-300 py-5 px-5 md:px-0 animate-pulse">
          {/* Left section */}
          <div className="flex gap-4 w-full sm:w-auto">
            {/* Skeleton Image */}
            <div className="w-[150px] h-[150px] bg-gray-300 rounded"></div>
    
            {/* Skeleton Info */}
            <div className="flex flex-col gap-2 w-[300px]">
              <div className="h-5 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mt-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mt-2"></div>
            </div>
          </div>
    
          {/* Right section */}
          <div className="flex flex-col gap-4 text-sm justify-end mt-5 sm:mt-0">
            <div className="border border-gray-300 rounded px-4 py-2 bg-gray-200 text-transparent text-sm">
              cancel appointment...
            </div>
          </div>
        </div>
        ))}
    
    </div>
  );
}
