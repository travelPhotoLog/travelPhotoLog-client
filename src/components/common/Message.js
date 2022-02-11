import React from "react";
import styled from "styled-components";
import { PropTypes } from "prop-types";

const Message = ({ message }) => {
  return <MessageContainer>{message}</MessageContainer>;
};

export default Message;

Message.propTypes = {
  message: PropTypes.string.isRequired,
};

const MessageContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xxl};
  background-color: rgb(255, 255, 255);
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 500;
`;
