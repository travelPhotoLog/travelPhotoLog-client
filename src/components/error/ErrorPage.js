import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";

import theme from "../../styles/theme";
import StyledButton from "../common/CommonStyle";

const ErrorPage = ({ message }) => {
  const navigate = useNavigate();

  return message ? (
    <ThemeProvider theme={theme}>
      <Container>
        <div>{message}</div>
        <HomeButton onClick={() => navigate("/")}>Homepage</HomeButton>
      </Container>
    </ThemeProvider>
  ) : (
    <div />
  );
};

export default ErrorPage;

const Container = styled.div`
  position: absolute;
  left: 10%;
  ${({ theme }) => theme.container.flexSpaceAround};
  flex-direction: column;
  padding-top: 50px;
  width: 80%;
  border-radius: 10px;
`;

const HomeButton = styled(StyledButton)`
  ${({ theme }) => theme.container.flexCenter};
  margin: 10px;
  color: gray;
  width: 50vh;
`;

ErrorPage.propTypes = {
  message: PropTypes.string.isRequired,
};
