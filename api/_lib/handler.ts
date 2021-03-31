import { getScreenshot } from "./chromium";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { DEFAULT_TTL } from "./config";

const first = <T extends unknown>(arr: T[] | T) =>
  Array.isArray(arr) ? arr[0] : arr;

export default async (
  { query: { url, ttl: ttlStr, selector, fileType } },
  res
) => {
  try {
    const config = {
      url: first<string>(url),
      fileType: first(fileType) || "png",
      selector: first(selector) || "body"
    };
    const file = await getScreenshot(config);
    const ttl: number =
      parseInt(Array.isArray(ttlStr) ? ttlStr[0] : ttlStr, 10) || DEFAULT_TTL;

    res.statusCode = 200;
    res.setHeader("Content-Type", `image/${config.fileType}`);
    res.setHeader("Cache-Control", `public, s-maxage=${ttl}, max-age=${ttl}`);
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
