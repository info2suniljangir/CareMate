


import React from "react";

const DoctorCard2Skeleton = () => {
  return (
    <div className="md:w-1/4 sm:w-2/3 sm:min-w-96 w-full rounded-md shadow-md profile-dropdown-shadow animate-pulse">
      <div className="flex gap-4 rounded p-4">
        <div className="w-16 h-16 rounded-full bg-gray-300 m-2"></div>
        <div className="py-2 flex-1">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="flex gap-10 justify-between">
            <div className="flex gap-1">
              <div className="w-5 h-5 bg-gray-300 rounded"></div>
              <div>
                <div className="h-4 bg-gray-300 rounded w-12 mb-1"></div>
                <div className="h-3 bg-gray-300 rounded w-16"></div>
              </div>
            </div>
            <div className="flex gap-1">
              <div className="w-5 h-5 bg-gray-300 rounded"></div>
              <div>
                <div className="h-4 bg-gray-300 rounded w-12 mb-1"></div>
                <div className="h-3 bg-gray-300 rounded w-16"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-4">
        <div className="w-1/2 h-10 bg-gray-300 rounded-bl"></div>
        <div className="w-1/2 h-10 bg-gray-300 rounded-br"></div>
      </div>
    </div>
  );
};

export const TopDoctorsSkeleton = () => {
  return (
    <div className="wrapper flex flex-col items-center" id="topDoctors">
      <div className="h-6 w-40 bg-gray-300 rounded mb-4"></div>
      <div className="h-4 w-64 bg-gray-300 rounded mb-6"></div>
      <div className="flex justify-center gap-5 flex-wrap my-10">
        {[...Array(12)].map((_, index) => (
          <DoctorCard2Skeleton key={index} />
        ))}
      </div>
    </div>
  );
};