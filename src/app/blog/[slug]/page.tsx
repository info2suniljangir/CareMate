


// this is specially used blog page
import React, { use } from "react";
const Page=  ({params}: {params: Promise<{slug: string}>}) => {
    const { slug } = use(params);
    console.log(slug);
  return (
    <div className="m-20">
      this is slug page
    </div>
  );
};

export default Page;