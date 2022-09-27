import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const imagePath = req.query.slug.join("/");
  console.log(req.query.slug);
  const filePath = path.resolve(".", `public/images/${imagePath}`);
  const imageBuffer = fs.readFileSync(filePath);
  res.setHeader("Content-Type", "image/jpg");
  return res.send(imageBuffer);
}
