import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";

import theme from "../../styles/theme";

export default function Modal({ children }) {
  const navigate = useNavigate();

  const handleExitClick = event => {
    if (event.target !== event.currentTarget) {
      return;
    }

    navigate(-1);
  };

  useEffect(() => {
    const $modalRoot = document.getElementById("modal-root");
    const $body = document.body;

    $modalRoot.style.position = "relative";
    $body.style.overflow = "hidden";

    return () => {
      $body.style.overflow = "unset";
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BackDrop id="modal" onClick={handleExitClick}>
        <ModalWrapper>
          <ExitButton onClick={handleExitClick}>❌</ExitButton>
          {children}
        </ModalWrapper>
      </BackDrop>
    </ThemeProvider>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

const BackDrop = styled.main`
  ${({ theme }) => theme.container.flexCenter};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ModalWrapper = styled.section`
  ${({ theme }) => theme.container.flexCenterColumn};
  position: relative;
  width: 60%;
  height: 80%;
  padding: ${({ theme }) => theme.spacing.xxxl};
  border-radius: 20px;
  background-color: rgb(255, 255, 255);
`;

const ExitButton = styled.button`
  position: absolute;
  top: 40px;
  right: 40px;
  padding: 10px 20px;
  border: none;
  background-color: transparent;
  color: black;
  font-size: 24px;
  cursor: pointer;
`;
