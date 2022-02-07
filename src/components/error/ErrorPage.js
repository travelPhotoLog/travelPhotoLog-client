import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";

import theme from "../../styles/theme";
import StyledButton from "../common/CommonStyle";

const ErrorPage = ({ message }) => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <div>{message}</div>
        <HomeButton onClick={() => navigate("/")}>Homepage로 이동</HomeButton>
      </Container>
    </ThemeProvider>
  );
};

export default ErrorPage;

const Container = styled.div`
  position: absolute;
  left: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-top: 50px;
  width: 80%;
  border-radius: 10px;
`;

const HomeButton = styled(StyledButton)`
  display: flex;
  justify-content: center;
  margin: 10px;
  color: gray;
  width: 50vh;
`;

ErrorPage.propTypes = {
  message: PropTypes.string.isRequired,
};
