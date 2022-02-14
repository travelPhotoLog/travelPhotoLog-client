import React from "react";
import styled, { ThemeProvider } from "styled-components";

import theme from "../../styles/theme";
import PostingList from "./PostingList";
import SearchForm from "./SearchForm";

const Board = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <SearchForm />
        <PostingList />
      </Container>
      <Footer>
        <p>@OCN cooperation</p>
      </Footer>
    </ThemeProvider>
  );
};

export default Board;

const Container = styled.div`
  width: 100vw;
  height: 84.5vh;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Footer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
  color: lightgray;
`;
