const { getScreenshot } = require("./chromium");
const isDev = process.env.NODE_ENV === "development";
module.exports = async (req, res) => {
  try {
    const config = { fileType: "png", selector: "body", ...req.query, isDev };
    const file = await getScreenshot(config);
    res.statusCode = 200;
    res.setHeader("Content-Type", `image/${config.fileType}`);
    res.setHeader(
      "Cache-Control",
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    );
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(
      `<h1>Internal Error</h1><p>There was a problem:</p><p>${e.message}</p>`
    );
    console.error(e);
  }
};
