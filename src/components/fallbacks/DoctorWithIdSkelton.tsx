export const DoctorWithIdSkelton = () => (
    <div className="wrapper animate-pulse">
      <div className="flex flex-col sm:flex-row gap-4 mt-20">
        {/* Left container */}
        <div>
          {/* Skeleton Image */}
          <div className="relative h-[350px] sm:h-64 sm:w-64 w-[350px] bg-gray-300 rounded-lg" />
  
          {/* Skeleton Experience */}
          <div className="flex gap-2 my-4 border rounded-lg border-gray-300 px-4 py-2">
            <div className="bg-gray-300 w-6 h-6 rounded-full" />
            <div>
              <div className="bg-gray-300 w-20 h-4 rounded-md mb-1" />
              <div className="bg-gray-300 w-16 h-3 rounded-md" />
            </div>
          </div>
  
          {/* Skeleton Fees */}
          <div className="flex gap-2 mb-4 border rounded-lg border-gray-300 px-4 py-2">
            <div className="bg-gray-300 w-6 h-6 rounded-full" />
            <div>
              <div className="bg-gray-300 w-20 h-4 rounded-md mb-1" />
              <div className="bg-gray-300 w-16 h-3 rounded-md" />
            </div>
          </div>
        </div>
  
        {/* Right container */}
        <div className="flex-1">
          {/* Skeleton About Section */}
          <div className="border border-gray-300 rounded-lg p-8">
            <div className="bg-gray-300 w-40 h-6 rounded-md mb-4" />
            <div className="bg-gray-300 w-60 h-4 rounded-md mb-4" />
            <div className="bg-gray-300 w-full h-24 rounded-md" />
          </div>
  
          {/* Skeleton Booking Slots */}
          <div className="flex flex-col items-center mt-8">
            <div className="bg-gray-300 w-32 h-6 rounded-md mb-4" />
  
            {/* Dates */}
            <div className="flex flex-wrap justify-center gap-4 my-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="border border-gray-300 rounded-full p-4 text-center w-20 bg-gray-300 h-16" />
                ))}
            </div>
  
            {/* Time Slots */}
            <div className="flex flex-wrap justify-center gap-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="border border-gray-300 rounded-full py-1 w-28 h-6 bg-gray-300" />
                ))}
            </div>
  
            {/* Button */}
            <div className="border rounded-full py-2 px-8 sm:w-96 w-72 my-4 bg-gray-300 h-10" />
          </div>
        </div>
      </div>
    </div>
  );