import React from "react";
import styled, { ThemeProvider } from "styled-components";

import theme from "../styles/theme";

const MainPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <TitleContainer>
        <h1>TRAVEL PHOTO-LOG</h1>
        <p>여행과 장소의 변화는 우리 마음에 활력을 선사한다.</p>
      </TitleContainer>
      <BackgroundContainer />
      <Footer>
        <p>@OCN cooperation</p>
      </Footer>
    </ThemeProvider>
  );
};

export default MainPage;

const BackgroundContainer = styled.div`
  ${({ theme }) => theme.container.flexCenter};
  width: 100%;
  height: 70vh;
  padding: ${({ theme }) => theme.spacing.xxxl};
  padding-top: 70px;
  background-image: url("https://travelphotolog.s3.ap-northeast-2.amazonaws.com/%E1%84%8F%E1%85%AE%E1%84%87%E1%85%A1.jpeg");
  background-position: center;
  background-size: contain;
  opacity: 0.3;
`;

const TitleContainer = styled.div`
  ${({ theme }) => theme.container.flexCenterColumn};
  height: 10vh;
  font-family: "Gill Sans", sans-serif;
  color: gray;
  font-size: 15px;
`;

const Footer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  color: lightgray;
`;
