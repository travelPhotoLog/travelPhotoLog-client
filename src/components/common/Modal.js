import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";
import { AiOutlineCloseSquare } from "react-icons/ai";

import theme from "../../styles/theme";

const Modal = ({ children, size }) => {
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
        <ModalWrapper className={size === "big" ? "big" : "small"}>
          <ExitButton onClick={handleExitClick}>❌</ExitButton>
          {children}
        </ModalWrapper>
      </BackDrop>
    </ThemeProvider>
  );
};

export default Modal;

const BackDrop = styled.main`
  ${({ theme }) => theme.container.flexCenter};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ModalWrapper = styled.section`
  ${({ theme }) => theme.container.flexCenterColumn};
  position: relative;
  padding: ${({ theme }) => theme.spacing.xxxl};
  border-radius: 20px;
  background-color: rgb(255, 255, 255);
  &.big {
    width: 60%;
    height: 80%;
  }
  &.small {
    width: 40%;
    height: 30%;
  }
`;

const ExitButton = styled(AiOutlineCloseSquare)`
  position: absolute;
  top: 20px;
  right: 20px;
  color: black;
  font-size: 30px;
  cursor: pointer;
`;

Modal.propTypes = {
  size: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
