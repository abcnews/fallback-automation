import React, { useState } from "react";
import { apiEndpoint } from "../../constants";
import { encode, decode } from "@abcnews/base-36-props";
import styled from "styled-components";

const Title = styled.h1``;
const TextInput = styled.input`
  border: 1px solid #ccc;
  padding: 0.5em;
  font-size: 1.2rem;
  display: block;
`;

const TextAreaInput = styled.textarea`
  border: 1px solid #ccc;
  padding: 0.5em;
  font-size: 1.2rem;
  display: block;
  width: 15em;
  height: 4em;
`;

const Button = styled.button`
  font-size: 2rem;
`;

const getImageUrl = (target, selector) => {
  const url = new URL(window.location.origin);
  url.pathname = apiEndpoint;
  url.searchParams.append("url", target);
  url.searchParams.append("selector", selector);
  return url.toString();
};

const download = urls => {
  const link = document.createElement("a");
  link.style.display = "none";
  document.body.appendChild(link);
  urls.forEach((url, i) => {
    link.setAttribute("href", url);
    link.setAttribute("download", `fallback-${i}.png`);
    link.click();
  });
  document.body.removeChild(link);
};

const getConfig = () => {
  try {
    const { url, selectors } = decode(
      new URL(window.location.href).searchParams.get("props")
    );
    return { initialUrl: url, initialSelectors: selectors };
  } catch (e) {
    return { initialUrl: "", initialSelectors: [] };
  }
};

export default props => {
  const { initialUrl, initialSelectors } = getConfig();
  const [url, setUrl] = useState(initialUrl || "");
  const [selectors, setSelectors] = useState(initialSelectors || []);
  console.log("selectors", selectors);
  history.replaceState(null, null, `?props=${encode({ url, selectors })}`);
  return (
    <div className={styles.root}>
      <Title>Fallback image generator</Title>
      <p>
        <label>Story URL</label>
        <TextInput
          type="text"
          name="url"
          value={url}
          onChange={({ target: { value } }) => setUrl(value)}
        />
      </p>
      <p>
        <label>
          Enter uniquely identifying CSS selectors (one per line) for the
          elements you want images of
        </label>
        <TextAreaInput
          value={selectors.join("\n")}
          onChange={({ target: { value } }) => setSelectors(value.split("\n"))}
        />
      </p>
      <Button
        type="submit"
        onClick={e => {
          e.preventDefault();
          download(selectors.map(s => getImageUrl(url, s)));
        }}
      >
        Download
      </Button>
    </div>
  );
};
