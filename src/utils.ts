import { apiEndpoint } from "./constants";
import { encode, decode } from "@abcnews/base-36-props";
import { SavedState } from "./types";

export const getImageUrl = (
  target: string,
  selector: string,
  options: { width?: number } = {}
) => {
  const url = new URL(window.location.origin);
  url.pathname = apiEndpoint;
  url.searchParams.append("url", target);
  url.searchParams.append("selector", selector);
  ["width"].forEach(option => {
    if (typeof options.width !== "undefined") {
      url.searchParams.append("width", String(options.width));
    }
  });
  return url.toString();
};

export const downloadAll = (url, selectors) => {
  const link = document.createElement("a");
  link.style.display = "none";
  document.body.appendChild(link);
  selectors
    .map(s => [getImageUrl(url, s.selector), s.name])
    .forEach(([url, name], i) => {
      link.setAttribute("href", url);
      link.setAttribute("download", `${name}.png`);
      link.click();
    });
  document.body.removeChild(link);
};

export const loadState = () => {
  try {
    return decode(
      new URL(window.location.href).searchParams.get("state") || ""
    ) as SavedState;
  } catch (e) {
    return {} as SavedState;
  }
};

export const saveState = (state: SavedState) => {
  history.replaceState(null, document.title, `?state=${encode(state)}`);
};
