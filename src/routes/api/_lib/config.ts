import chrome from 'chrome-aws-lambda';

const LOCAL_EXECUTABLE =
  process.platform === 'win32'
    ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

export const IS_DEV = process.env.NODE_ENV === 'development';

export const DEFAULT_TTL = 86400;
export const DEFAULT_VIEWPORT_WIDTH = 480;
export const DEFAULT_VIEWPORT_HEIGHT = 800;

export const getChromeConfig = async (): Promise<{
  args: string[];
  executablePath: string;
  headless: boolean;
}> => {
  return IS_DEV
    ? {
        args: [],
        executablePath: LOCAL_EXECUTABLE,
        headless: true
      }
    : {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless
      };
};
