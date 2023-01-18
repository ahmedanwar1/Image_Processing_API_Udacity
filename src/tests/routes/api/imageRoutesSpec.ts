import path from "path";
import request from "supertest";
import app from "../../../index";
import unlinkThumbImage from "../../../utils/unlinkThumbImage";

const imageThumbPath = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "images",
  "thumb"
);

describe("test api responses", () => {
  describe("if any query is missing", () => {
    it("should fail when height is missing", async () => {
      await request(app)
        .get("/api/images?fileName=encenadaport&width=500")
        .expect(400);
    });
    it("should fail when width is missing", async () => {
      await request(app)
        .get("/api/images?fileName=encenadaport&height=200")
        .expect(400);
    });
    it("should fail when file name is missing", async () => {
      await request(app).get("/api/images?height=200&width=500").expect(400);
    });
  });

  const fileName = "encenadaport";
  const width = 500;
  const height = 600;

  it("should get 200 status code as a successful req", async () => {
    await request(app)
      .get(`/api/images?fileName=${fileName}&height=${height}&width=${width}`)
      .expect(200);
    unlinkThumbImage(imageThumbPath, fileName, width, height);
  });
});
