const { getScreenshot } = require("./chromium");
const isDev = process.env.NODE_ENV === "development";
module.exports = async (req, res) => {
  const ttl = 86400;
  try {
    const config = {
      fileType: "png",
      selector: "body",
      ttl,
      ...req.query,
      isDev
    };
    const file = await getScreenshot(config);

    res.statusCode = 200;
    res.setHeader("Content-Type", `image/${config.fileType}`);
    res.setHeader(
      "Cache-Control",
      `public, s-maxage=${+config.ttl || ttl}, max-age=${+config.ttl || ttl}`
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
