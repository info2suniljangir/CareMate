const DoctorsSkelton = () => {
    return (
      <div className="wrapper">
        {/* Main container */}
        <div className="mt-16 sm:mt-20 md:mt-16">
          {/* filter container */}
          <div className="flex items-center gap-4 flex-col md:flex-row justify-between md:m-6 py-4">
            {/* input container */}
            <div className="md:w-1/3 w-full sm:w-2/3">
              <div className="flex border border-gray-300 py-2 px-3 rounded-md animate-pulse bg-gray-200 h-10"></div>
            </div>
            <div className="w-1/6 h-10 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
          {/* card container */}
          <div className="flex justify-center flex-wrap gap-5">
            {[...Array(12)].map((_, index) => (
              <DoctorCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  const DoctorCardSkeleton = () => {
    return (
      <div className="md:w-1/4 sm:w-2/3 sm:min-w-96 w-full rounded-md shadow-md profile-dropdown-shadow animate-pulse p-4">
        <div className="flex gap-4 rounded">
          <div className="w-16 h-16 rounded-full bg-gray-300"></div>
          <div className="flex flex-col gap-2 w-full">
            <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/2 h-3 bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="flex mt-4 gap-10 justify-between">
          <div className="w-1/3 h-6 bg-gray-300 rounded"></div>
          <div className="w-1/3 h-6 bg-gray-300 rounded"></div>
        </div>
        <div className="flex mt-4">
          <div className="w-1/2 h-10 bg-gray-300 rounded-bl"></div>
          <div className="w-1/2 h-10 bg-gray-300 rounded-br"></div>
        </div>
      </div>
    );
  };
  
  export default DoctorsSkelton;