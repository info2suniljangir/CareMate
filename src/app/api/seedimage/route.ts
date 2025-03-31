import cloudinary from "@/library/cloudinary";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

// Path to local images folder
// path.join join the path names given in arguments
// process.cwd() => this method is used t=o get current working directory path.
// current working directory and the second path will be joined with each other.
// return a string of whole path. this will return the full path of the images folder.
const imagesFolder = path.join(process.cwd(), "/src/assets/images");

export async function GET(): Promise<NextResponse> {
  try {
    // following three lines give the complete path of each file to upload to cloudinary
    // Read image filenames from the local folder
    const files = await fs.promises.readdir(imagesFolder);

    // Upload each file to Cloudinary
    const uploadPromises = files.map(async (file) => {
      // this will give complete file path
      const filePath = path.join(imagesFolder, file);

      return cloudinary.v2.uploader.upload(filePath, {
        folder: "seed-images",
        public_id: path.parse(file).name,
        transformation: [{ width: 1200, height: 1200, crop: "limit" }],
      });
    });

    // this promise is resolved only when all the promise in uploadPromises is resolved, if single one is rejected then
    // this promise is resolved.
    // this line is written because of the map does not wait for the iteration to finish promise,
    // then the promises are resolved in palrallel.
    // this promise is fullfilled only when all promises are resolved otherwise rejected.
    const results = await Promise.all(uploadPromises);
    // console.log(results[0]);

    return NextResponse.json({
      message: "Images seeded successfully",
      results,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { error: "Failed to upload images" },
      { status: 500 }
    );
  }
}

// {"message":"Images seeded successfully"}
