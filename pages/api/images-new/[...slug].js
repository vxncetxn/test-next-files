import path from "path";

// Tell Next.js to pass in Node.js HTTP
export const config = {
  api: { externalResolver: true },
};

import express from "express";
const handler = express();

const serveFiles = express.static("images");
// console.log(serveFiles());
handler.use(["/api/images-new", "/images-new"], serveFiles);

// handler.use(["/api/images-new", "/images-new"], (req, res) => {
//   const imagePath = req.query.slug.join("/");
//   const filePath = path.resolve(".", `images/${imagePath}`);
//   express.static(filePath)();
// });

//               ^              ^
// Multiple endpoints are passed. The first one is used when visiting /api/images.
// The second one is used when visiting /images using the middleware rewrite I mention below.

// express is just a function that takes (http.IncomingMessage, http.ServerResponse),
// which Next.js supports when externalResolver is enabled.
export default handler;
