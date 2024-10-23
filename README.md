# Fallback Automation

A quickly hacked together tool for speeding up the creation of fallback imagery for interactive content by capturing browser output.

## Usage

Try it out at https://fallback-automation.now.sh/

It works by loading the page in a headless browser and taking a screenshot of the specified element.

Start by specifying the URL you want to capture fallback images from. The page needs to be accessible from the internet; see the [development docs](#development) below to run a local copy if you need to capture pages from locally accessible pages.

Then add a list of CSS selectors specifying the elements to capture.

You can (optionally) name the images to be captured. You can also (optionally; default 1200px) specify a browser width at which to capture the images. Captures are made at a [device pixel ratio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio) of 2.

## Development

To run locally, a local version of the Google Chrome browser is required.

```
git clone https://github.com/abcnews/fallback-automation.git
cd fallback-automation
npm i
IS_LOCAL=1 BROWSER_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run dev
```

## Authors

- Simon Elvery ([@drzax](https://github.com/drzax))

## Inspiration

This technique was pioneered and demonstrated by Zeit with their [og-images](https://og-image.now.sh/) service and that's where the hosted version of this runs.
