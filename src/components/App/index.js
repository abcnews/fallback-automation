import React, { useState } from "react";

import {
  Button,
  Field,
  Container,
  Heading,
  IconButton,
  Link,
  space
} from "@hackclub/design-system";
import ReactModal from "react-modal";

import styled from "styled-components";
import { useStateValue } from "../../state";
import { downloadAll, getImageUrl } from "../../utils";
import {
  ADD_SELECTOR,
  REMOVE_SELECTOR,
  SET_SELECTOR_NAME,
  SET_SELECTOR_SELECTOR,
  SET_SELECTOR_SHOW_PREVIEW,
  SET_SELECTOR_BROWSER_WIDTH
} from "../../actions";

const Cell = styled.div`
  margin-right: ${space[2]}px;
`;

const TableField = props => (
  <Cell>
    <Field {...props} />
  </Cell>
);
const Row = styled.div`
  display: flex;
`;

export default props => {
  const [{ url, selectors }, dispatch] = useStateValue();
  const [preview, setPreview] = useState(false);

  return (
    <Container p={4}>
      <Heading>Fallback image generator</Heading>
      <Field
        label="Source page"
        name="url"
        value={url || ""}
        onChange={({ target: { value } }) =>
          dispatch({ type: "setUrl", url: value })
        }
      />
      <Button
        onClick={e => {
          e.preventDefault();
          downloadAll(url, selectors);
        }}
      >
        Download
      </Button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Selector</th>
            <th>Width</th>
          </tr>
        </thead>
        <tbody>
          {selectors.map(({ name, selector, browserWidth }, index) => (
            <tr key={index}>
              <td>
                <TableField
                  name="name"
                  value={name}
                  onChange={({ target: { value } }) =>
                    dispatch({ type: SET_SELECTOR_NAME, index, name: value })
                  }
                />
              </td>
              <td>
                <TableField
                  name="selector"
                  value={selector}
                  onChange={({ target: { value } }) =>
                    dispatch({
                      type: SET_SELECTOR_SELECTOR,
                      index,
                      selector: value
                    })
                  }
                />
              </td>
              <td>
                <TableField
                  name="browserWidth"
                  value={browserWidth}
                  onChange={({ target: { value } }) =>
                    dispatch({
                      type: SET_SELECTOR_BROWSER_WIDTH,
                      index,
                      browserWidth: value
                    })
                  }
                />
              </td>
              <td>
                <IconButton
                  circle={true}
                  glyph="photo"
                  color="green"
                  onClick={() => setPreview({ name, selector, browserWidth })}
                />
              </td>
              <td>
                <IconButton
                  circle={true}
                  glyph="post-cancel"
                  color="error"
                  onClick={e => dispatch({ type: REMOVE_SELECTOR, index })}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        onClick={e => {
          e.preventDefault();
          dispatch({ type: ADD_SELECTOR });
        }}
      >
        Add selector
      </Button>
      <ReactModal
        isOpen={preview !== false}
        onRequestClose={() => setPreview(false)}
        contentLabel={`Preview of '${preview ? preview.name : "blank"}.png'`}
        id={"preview"}
        ariaHideApp={true}
        shouldFocusAfterRender={true}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        shouldReturnFocusAfterClose={true}
        parentSelector={() => document.body}
      >
        <img
          src={getImageUrl(url, preview.selector, {
            width: preview.browserWidth
          })}
          style={{ maxWidth: "100%" }}
        />
        <Button onClick={() => downloadAll(url, [preview])}>Save</Button>
      </ReactModal>
    </Container>
  );
};
