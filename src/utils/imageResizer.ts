import sharp from "sharp";
import fs from "fs";
import path from "path";
import { ResponseJson, statusMessage } from "../types/ResponseJson";

//image dirs paths
const imageOriginalDir: string = path.join(
  __dirname,
  "..",
  "..",
  "images",
  "full"
);
const imageThumbDir: string = path.join(
  __dirname,
  "..",
  "..",
  "images",
  "thumb"
);

const imageResizer = async (
  fileName: string,
  width: number,
  height: number
): Promise<ResponseJson> => {
  //image paths
  const imageOriginalPath = path.join(imageOriginalDir, `${fileName}.jpg`);
  const imageResizedPath = path.join(
    imageThumbDir,
    `${fileName}-${width}-${height}.jpg`
  );
  try {
    //check a resized image was generated before
    const resizedImageExists: boolean = fs.existsSync(imageResizedPath);
    if (resizedImageExists) {
      return {
        status: statusMessage.success,
        statusCode: 200,
        msg: "Resized image already exists.",
      };
    }

    //check original image exists
    const originalImageExists: boolean = fs.existsSync(imageOriginalPath);
    if (!originalImageExists) {
      return {
        status: statusMessage.failed,
        statusCode: 404,
        msg: "File doesn't exist!",
      };
    }

    //generate resized image
    await sharp(imageOriginalPath)
      .resize(width, height)
      .toFile(imageResizedPath);

    return {
      status: statusMessage.success,
      statusCode: 200,
      msg: "Resized image generated.",
    };
  } catch (e) {
    return {
      status: statusMessage.failed,
      statusCode: 500,
      msg: "Unexpected Error!",
    };
  }
};

export default imageResizer;
