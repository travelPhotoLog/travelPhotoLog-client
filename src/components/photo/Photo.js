import React from "react";
import styled, { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";

import theme from "../../styles/theme";

const Photo = ({ photo, onClick }) => {
  const { id, url, description } = photo;

  return (
    <ThemeProvider theme={theme}>
      <PhotoCardContainer id={id} onClick={onClick}>
        <Image src={url} />
        <p>{description}</p>
      </PhotoCardContainer>
    </ThemeProvider>
  );
};

export default Photo;

Photo.propTypes = {
  photo: PropTypes.objectOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
};

const PhotoCardContainer = styled.div`
  ${({ theme }) => theme.container.flexCenterColumn};
  width: 200px;
  height: 260px;
  margin: ${({ theme }) => theme.spacing.xxl};
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 90%;
  height: 80%;
  margin-bottom: ${({ theme }) => theme.spacing.base};
`;
