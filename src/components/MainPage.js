import React from "react";
import styled, { ThemeProvider } from "styled-components";

import theme from "../styles/theme";

const MainPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <TitleContainer>
          <h1>TRAVEL PHOTO-LOG</h1>
          <p>여행과 장소의 변화는 우리 마음에 활력을 선사한다.</p>
        </TitleContainer>
      </Container>
      <Footer>
        <p>@OCN cooperation</p>
      </Footer>
    </ThemeProvider>
  );
};

export default MainPage;

const Container = styled.div`
  width: 100%;
  height: 80vh;
  padding: ${({ theme }) => theme.spacing.xxxl};
  padding-top: 70px;
  background-image: url("https://cdn.pixabay.com/photo/2018/01/31/05/43/web-3120321_960_720.png");
  background-position: center;
  background-size: cover;
`;

const TitleContainer = styled.div`
  ${({ theme }) => theme.container.flexCenterColumn};
  font-family: "Gill Sans", sans-serif;
  color: gray;
  font-size: 15px;
`;

const Footer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  color: lightgray;
`;
