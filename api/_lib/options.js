const chrome = require("chrome-aws-lambda");
const exePath =
  process.platform === "win32"
    ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

module.exports.getOptions = async isDev => {
  return isDev
    ? {
        args: [],
        executablePath: exePath,
        headless: true
      }
    : {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless
      };
};
