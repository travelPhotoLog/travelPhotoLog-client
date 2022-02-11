import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { FcPlus } from "react-icons/fc";
import styled, { ThemeProvider } from "styled-components";
import axios from "axios";

import theme from "../../styles/theme";
import { ERROR_MESSAGE } from "../../constants";
import ResponseMessage from "../common/ResponseMessage";
import Photo from "./Photo";

const PhotoList = () => {
  const { search: query } = useLocation();
  const navigate = useNavigate();

  const handlePhotoClick = event => {
    const photoId = event.currentTarget.id;

    navigate(`../${photoId}`);
  };

  const handleNewButtonClick = () => {
    navigate(`../options${query}`);
  };

  const getPhotos = query => {
    return axios.get(`/point/photos${decodeURI(query)}`);
  };

  const { data, isLoading, isFetching, isError, error } = useQuery(
    "photos",
    () => getPhotos(query),
    {
      select: response => response.data,
    }
  );

  if (isLoading || isFetching) {
    return <ResponseMessage message="사진을 불러오는 중입니다..." />;
  }

  if (data?.error) {
    if (data.error.code === 400) {
      return <ResponseMessage message={ERROR_MESSAGE.BAD_REQUEST} />;
    }

    if (data.error.code === 500) {
      return <ResponseMessage message={ERROR_MESSAGE.SERVER_UNSTABLE} />;
    }
  }

  return isError ? (
    <ResponseMessage message={error.message} />
  ) : (
    <ThemeProvider theme={theme}>
      <Container>
        {data?.photos.map(photo => (
          <Photo key={photo.id} photo={photo} onClick={handlePhotoClick} />
        ))}
        <NewButton onClick={handleNewButtonClick}>
          <FcPlus />
        </NewButton>
      </Container>
    </ThemeProvider>
  );
};

export default PhotoList;

const Container = styled.div`
  display: flex;
  width: 90%;
  height: 90%;
  padding: ${({ theme }) => theme.spacing.xxxl};
`;

const NewButton = styled.div`
  ${({ theme }) => theme.container.flexCenterColumn};
  width: 200px;
  height: 260px;
  margin: ${({ theme }) => theme.spacing.xxl};
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  cursor: pointer;
`;
