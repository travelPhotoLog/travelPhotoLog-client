import React from "react";
import styled, { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";
import { IoIosAlbums } from "react-icons/io";

import theme from "../../styles/theme";

const Marker = ({ count, onClick }) => {
  return (
    <ThemeProvider theme={theme}>
      <Container onClick={onClick}>
        <IoIosAlbums />
        <Count>{count}</Count>
      </Container>
    </ThemeProvider>
  );
};

export default Marker;

Marker.propTypes = {
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Container = styled.div`
  ${({ theme }) => theme.container.flexCenter};
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: transparent;
  color: blue;
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
`;

const Count = styled.div`
  position: absolute;
  top: -15px;
  left: -15px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: black;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.small};
  text-align: center;
  line-height: 20px;
`;
