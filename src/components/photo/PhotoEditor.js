import React, { useEffect, useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import ImageEditor from "@toast-ui/react-image-editor";
import "tui-image-editor/dist/tui-image-editor.css";

import theme from "../../styles/theme";
import { StyledButton } from "../common/CommonStyle";

const PhotoEditor = () => {
  const editorRef = useRef();

  useEffect(() => {
    const $buttons = document.querySelector(".tui-image-editor-header-buttons");
    const $logo = document.querySelector(".tui-image-editor-header-logo");
    const $loadContainer = document.querySelector("#loadButton");
    const $loadButton = document.querySelector(".tui-image-editor-load-btn");

    $loadButton.style.width = "0px";
    $loadContainer.appendChild($loadButton);

    $logo.remove();
    $buttons.remove();
  }, []);

  const handleDownloadClick = () => {
    const canvas = document.querySelector(".lower-canvas");

    const link = document.createElement("a");
    link.download = "download.png";
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
  };

  const handleFileClick = event => {
    event.target.firstElementChild.click();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ImageEditor
          ref={editorRef}
          includeUI={{
            menu: ["shape", "filter", "crop", "text", "flip", "icon"],
            initMenu: "filter",
            uiSize: {
              width: "1000px",
              height: "700px",
            },
            menuBarPosition: "bottom",
          }}
          cssMaxHeight={500}
          cssMaxWidth={700}
          selectionStyle={{
            cornerSize: 20,
            rotatingPointOffset: 70,
          }}
          usageStatistics={false}
        />
        <Buttons>
          <FileButton id="loadButton" onClick={handleFileClick}>
            Load File
          </FileButton>
          <DownloadButton id="downloadButton" onClick={handleDownloadClick}>
            Download
          </DownloadButton>
        </Buttons>
      </Container>
    </ThemeProvider>
  );
};

export default PhotoEditor;

const Container = styled.div`
  ${({ theme }) => theme.container.flexCenterColumn};
  width: 100%;
  height: 40%;
  margin-top: 3rem;
  position: relative;
`;

const Buttons = styled.div`
  ${({ theme }) => theme.container.flexSpaceAround};
  width: 300px;
  height: 80px;
  margin-top: 20px;
`;

const DownloadButton = styled(StyledButton)`
  width: max-content;
  border-radius: 20px;
  background-color: orange;
  color: white;
  text-align: center;
`;

const FileButton = styled.div`
  display: inline-flex;
  padding: ${({ theme }) => theme.spacing.xl};
  margin-left: ${({ theme }) => theme.spacing.xl};
  margin-right: ${({ theme }) => theme.spacing.xl};
  width: 8rem;
  outline: none;
  border: none;
  font-weight: bold;
  width: max-content;
  border-radius: 20px;
  background-color: orange;
  color: white;
  text-align: center;
  cursor: pointer;
`;
