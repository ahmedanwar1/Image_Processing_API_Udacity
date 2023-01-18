import express from "express";
import imageRoutes from "./api/imageRoutes";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("welcome to image resizing and viewing app.");
});

router.use("/images", imageRoutes);

export default router;
