
import { getScreenshot } from '$lib/browser.server.js';
import { error } from '@sveltejs/kit';

export const config = {
  maxDuration: 60
}

export let GET = async ({url}) => {

  const target = url.searchParams.get('url');
  const selector = url.searchParams.get('selector') || 'body';
  const width = +(url.searchParams.get('width') || '600');

  if (!target) {
    return error(404, "URL must be provided.");
  }

  const screenshot = await getScreenshot(target, selector, width);

  if (!screenshot) {
    return error(500, 'Failed to generate screenshot.');
  }

  return new Response(Buffer.from(screenshot), {
    headers: {
      'cache-control': 'public,s-maxage=31536000' // 31536000 = 1 year
    }
  });
}