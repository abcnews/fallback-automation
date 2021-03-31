import type { RequestHandler } from '@sveltejs/kit';
import { getScreenshot } from './_lib/chromium';
import { DEFAULT_TTL } from './_lib/config';

const first = <T extends unknown>(arr: T[] | T) => (Array.isArray(arr) ? arr[0] : arr);

export const get: RequestHandler = async ({ query }) => {
  const url = query.get('url');
  const fileType = query.get('fileType');
  const selector = query.get('selector');
  const ttlStr = query.get('ttl');
  try {
    const config = {
      url: first<string>(url),
      fileType: first(fileType) || 'png',
      selectors: first(selector) || 'body'
    };
    const file = await getScreenshot(config);
    const ttl: number = parseInt(Array.isArray(ttlStr) ? ttlStr[0] : ttlStr, 10) || DEFAULT_TTL;

    return {
      status: 200,
      headers: {
        'Content-Type': `image/${config.fileType}`,
        'Cache-Control': `public, s-maxage=${ttl}, max-age=${ttl}`
      },
      body: file
    };
  } catch (error) {
    return { status: 500, error, body: error.message };
  }
};
