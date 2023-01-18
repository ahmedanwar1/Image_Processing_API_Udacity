import fs from "fs";
import path from "path";

const unlinkThumbImage = (
  imagePath: string,
  fileName: string,
  width: number,
  height: number
): void => {
  fs.unlink(
    path.join(imagePath, `${fileName}-${width}-${height}.jpg`),
    (err) => {
      if (err) return console.log("Err: connot delete file!");
    }
  );
};

export default unlinkThumbImage;
