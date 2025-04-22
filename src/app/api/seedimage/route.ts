import cloudinary from "@/library/cloudinary";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";


const imagesFolder = path.join(process.cwd(), "/src/assets/images");

export async function GET(): Promise<NextResponse> {
  try {
    const files = await fs.promises.readdir(imagesFolder);

    // Upload each file to Cloudinary
    const uploadPromises = files.map(async (file) => {
      const filePath = path.join(imagesFolder, file);

      return cloudinary.v2.uploader.upload(filePath, {
        folder: "seed-images",
        public_id: path.parse(file).name,
        transformation: [{ width: 1200, height: 1200, crop: "limit" }],
      });
    });

    const results = await Promise.all(uploadPromises);

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

