import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { FcPlus } from "react-icons/fc";
import styled, { ThemeProvider } from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";

import theme from "../../styles/theme";
import { ERROR_MESSAGE, LOADING_MESSAGE } from "../../constants";
import ResponseMessage from "../common/ResponseMessage";
import { photoActions } from "../../features/photoSlice";
import Message from "../common/Message";
import Modal from "../common/Modal";
import Photo from "./Photo";

const PhotoList = () => {
  const { id: mapId } = useParams();
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

  const getPhotos = (query, mapId) => {
    const queryForMapList = `${query}&map=${mapId}`;

    return axios.get(`/point/photos${decodeURI(queryForMapList)}`);
  };

  const { data, isLoading, isFetching, isError, error } = useQuery(
    "photos",
    () => getPhotos(query, mapId),
    {
      select: response => response.data,
    }
  );

  if (isLoading || isFetching) {
    return (
      <Modal size="big">
        <Message message={LOADING_MESSAGE.LOADING_PHOTOS} />
      </Modal>
    );
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
    <Modal size="big">
      <ResponseMessage message={error.message} />\
    </Modal>
  ) : (
    <ThemeProvider theme={theme}>
      <Modal size="big" id={mapId}>
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
      </Modal>
    </ThemeProvider>
  );
};

export default PhotoList;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
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
