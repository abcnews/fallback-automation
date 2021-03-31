import puppeteer from "puppeteer-core";
import {
  DEFAULT_VIEWPORT_HEIGHT,
  DEFAULT_VIEWPORT_WIDTH,
  getChromeConfig
} from "./config";

type ScreenshotOptions = {
  url: string;
  width?: number;
  fileType?: string;
  selectors?: string | string[];
};

let _page: puppeteer.Page;

async function getPage() {
  if (_page) {
    return _page;
  }
  const options = await getChromeConfig();
  const browser = await puppeteer.launch(options);
  _page = await browser.newPage();
  return _page;
}

async function getBodyHeight(page: puppeteer.Page) {
  const fullPage = await page.$("body");
  const fullPageSize = await fullPage.boundingBox();
  return fullPageSize.height;
}

async function getScreenshots({
  url,
  width,
  fileType,
  selectors
}: ScreenshotOptions) {
  selectors = Array.isArray(selectors) ? selectors : [selectors];

  const viewport = {
    width: width | DEFAULT_VIEWPORT_WIDTH,
    height: DEFAULT_VIEWPORT_HEIGHT,
    deviceScaleFactor: 2
  };

  const page = await getPage();
  await page.setViewport(viewport);
  await page.goto(url, { waitUntil: "networkidle0" });

  // Make sure this runs in sequence or who knows what will happen.
  const files = await selectors.reduce<Promise<Buffer[]>>(
    async (files, selector) => {
      const results = await files;
      const el = await page.$(selector);

      // This little contortion is because a bug in puppeteer prevents element screenshots
      // when the element is outside the viewport. See: https://github.com/puppeteer/puppeteer/issues/2423
      await page.setViewport({
        ...viewport,
        height: await getBodyHeight(page)
      });
      const file = await el.screenshot({ fileType });
      return file instanceof Buffer ? [...results, file] : results;
    },
    Promise.resolve([])
  );
  return files;
}

export async function getScreenshot(options: ScreenshotOptions) {
  const arr = await getScreenshots(options);
  return arr[0];
}
