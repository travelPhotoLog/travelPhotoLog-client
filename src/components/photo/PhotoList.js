import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { FcPlus } from "react-icons/fc";
import styled, { ThemeProvider } from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";

import theme from "../../styles/theme";
import { ERROR_MESSAGE, LOADING_MESSAGE } from "../../constants";
import ResponseMessage from "../common/ResponseMessage";
import Message from "../common/Message";
import Photo from "./Photo";
import { photoActions } from "../../features/photoSlice";

const PhotoList = () => {
  const { search: query } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePhotoClick = event => {
    const photoId = event.currentTarget.id;
    const { index } = event.currentTarget.dataset;

    dispatch(photoActions.updateIndex({ index: Number(index) }));
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
    return <Message message={LOADING_MESSAGE.LOADING_PHOTOS} />;
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
        {data?.photos.map((photo, index) => (
          <Photo
            key={photo.id}
            photo={photo}
            index={index}
            onClick={handlePhotoClick}
          />
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
  flex-wrap: wrap;
  width: 90%;
  height: 90%;
  padding: ${({ theme }) => theme.spacing.xxxl};
  text-align: center;
`;

const NewButton = styled.div`
  ${({ theme }) => theme.container.flexCenterColumn};
  width: 10vw;
  height: 30vh;
  margin: ${({ theme }) => theme.spacing.xxl};
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  cursor: pointer;
`;