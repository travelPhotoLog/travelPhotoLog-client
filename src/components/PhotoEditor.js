import React, { useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import ImageEditor from "@toast-ui/react-image-editor";
import "tui-image-editor/dist/tui-image-editor.css";

import theme from "../styles/theme";

const PhotoEditor = () => {
  const editorRef = useRef();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ImageEditor
          ref={editorRef}
          includeUI={{
            menu: ["shape", "filter", "crop"],
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
      </Container>
    </ThemeProvider>
  );
};

export default PhotoEditor;

const Container = styled.div`
  ${({ theme }) => theme.container.flexCenter};
  width: 100%;
  height: 90vh;
`;
