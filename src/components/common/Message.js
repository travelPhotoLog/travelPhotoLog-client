import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { PropTypes } from "prop-types";

import theme from "../../styles/theme";

const Message = ({ message }) => {
  return (
    <ThemeProvider theme={theme}>
      <MessageContainer>{message}</MessageContainer>;
    </ThemeProvider>
  );
};

export default Message;

Message.propTypes = {
  message: PropTypes.string,
};

const MessageContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xxl};
  background-color: rgb(255, 255, 255);
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 500;
`;

Message.defaultProps = {
  message: "",
};
