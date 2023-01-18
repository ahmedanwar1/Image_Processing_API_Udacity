import path from "path";
import request from "supertest";
import app from "../../index";
import { ResponseJson, statusMessage } from "../../types/ResponseJson";
import imageResizer from "../../utils/imageResizer";
import unlinkThumbImage from "../../utils/unlinkThumbImage";

const imageThumbPath: string = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "images",
  "thumb"
);

describe("check file existance", () => {
  const fileName = "encenadaport";
  const width = 200;
  const height = 200;

  it("should fail to find the original file", async () => {
    const res = await imageResizer("thisisnotafile", width, height);
    expect(res.statusCode).toEqual(404);
    expect(res.status).toEqual(statusMessage.failed);
  });

  it("should find the resized file exists", async () => {
    await request(app).get(
      `/api/images?fileName=${fileName}&height=${height}&width=${width}`
    );
    const res = await imageResizer(fileName, width, height);
    expect(res.statusCode).toEqual(200);
    expect(res.msg).toEqual("Resized image already exists.");
  });

  afterAll(() => {
    unlinkThumbImage(imageThumbPath, fileName, width, height);
  });
});

describe("resizing images", () => {
  let res: ResponseJson;
  const fileName = "encenadaport";
  const width = 400;
  const height = 600;

  beforeAll(async () => {
    res = await imageResizer(fileName, width, height);
  });

  it("should resize image", async () => {
    expect(res.statusCode).toEqual(200);
    expect(res.status).toEqual(statusMessage.success);
    expect(res.msg).toEqual("Resized image generated.");
  });

  afterAll(() => {
    unlinkThumbImage(imageThumbPath, fileName, width, height);
  });
});
