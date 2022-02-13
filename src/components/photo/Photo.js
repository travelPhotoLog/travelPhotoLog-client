import React from "react";
import styled, { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";

import theme from "../../styles/theme";

const Photo = ({ photo, index, onClick }) => {
  const { id, url, description } = photo;

  return (
    <ThemeProvider theme={theme}>
      <PhotoCardContainer id={id} data-index={index} onClick={onClick}>
        <Image src={url} />
        <p>{description}</p>
      </PhotoCardContainer>
    </ThemeProvider>
  );
};

export default Photo;

const PhotoCardContainer = styled.div`
  ${({ theme }) => theme.container.flexCenterColumn};
  width: 10vw;
  height: 30vh;
  margin: ${({ theme }) => theme.spacing.xxl};
  padding: ${({ theme }) => theme.spacing.base};
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 90%;
  height: 80%;
  margin-bottom: ${({ theme }) => theme.spacing.base};
`;

Photo.propTypes = {
  photo: PropTypes.objectOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
