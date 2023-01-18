import express from "express";
import path from "path";
import { ResponseJson, statusMessage } from "../../types/ResponseJson";
import AppError from "../../utils/AppError";
import imageResizer from "../../utils/imageResizer";

const router = express.Router();

router.get(
  "/",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      //get url queries
      const fileName: string = req.query.fileName as string;
      const height: number = parseInt(req.query.height as string);
      const width: number = parseInt(req.query.width as string);

      //if any query is missing
      if (!fileName || !height || !width) {
        throw new AppError("Please provide necessery data!", 400);
      }

      //resize image
      const resizedImageRes: ResponseJson = await imageResizer(
        fileName,
        width,
        height
      );

      //if resizing fails
      if (!resizedImageRes || resizedImageRes.status == statusMessage.failed) {
        throw new AppError(resizedImageRes.msg, resizedImageRes.statusCode);
      }

      //get resized image path
      const imagePath: string = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "images",
        "thumb",
        `${fileName}-${width}-${height}.jpg`
      );

      //send resized image to client
      res.status(200).sendFile(imagePath);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
