import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled, { ThemeProvider } from "styled-components";

import theme from "../../styles/theme";
import { StyledButton } from "../common/CommonStyle";

const Map = ({ map }) => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <MapButton onClick={() => navigate(`${map.id}`)}>{map.title}</MapButton>
    </ThemeProvider>
  );
};

export default Map;

const MapButton = styled(StyledButton)`
  ${({ theme }) => theme.container.flexSpaceAround};
  width: 60vw;
  margin: 10px;
  border-radius: 50px;
  color: black;
  font-weight: normal;
  box-shadow: 1px 1px 1px 1px #c2c2c2;
  :hover {
    background-color: #dcedc8;
  }
`;

Map.propTypes = {
  map: PropTypes.objectOf(PropTypes.string).isRequired,
};
