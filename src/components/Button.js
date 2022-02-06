import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Button = ({ children, onClick }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;

const StyledButton = styled.button`
  display: inline-flex;
  padding: ${({ theme }) => theme.spacing.xl};
  margin-left: ${({ theme }) => theme.spacing.xl};
  margin-right: ${({ theme }) => theme.spacing.xl};
  width: 8rem;
  outline: none;
  border: none;
  border-radius: 4px;
  color: black;
  background-color: white;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: bold;
  cursor: pointer;
`;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
