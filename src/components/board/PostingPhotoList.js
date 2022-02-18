import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";

import { postingPhotoActions } from "../../features/postingPhotoSlice";
import { ERROR_MESSAGE, LOADING_MESSAGE } from "../../constants";
import ResponseMessage from "../common/ResponseMessage";
import Message from "../common/Message";
import Modal from "../common/Modal";
import PostingPhoto from "./PostingPhoto";

const PostingPhotoList = () => {
  const { id: mapId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPhotos = id => {
    return axios.get(`${process.env.REACT_APP_SERVER_URI}/map/${id}/photos`);
  };

  const { data, isLoading, isFetching } = useQuery(
    "photos",
    () => getPhotos(mapId),
    {
      select: response => response.data,
    }
  );

  const handlePhotoClick = event => {
    const { index } = event.currentTarget.dataset;
    const { photos } = data;

    dispatch(postingPhotoActions.savePhotoUrlInfo(photos[index]));
    navigate(-2);
  };

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

  return (
    <Modal size="big">
      <Container>
        {data?.photos.map((photo, index) => (
          <PostingPhoto
            key={photo.id}
            photo={photo}
            index={index}
            onClick={handlePhotoClick}
          />
        ))}
      </Container>
    </Modal>
  );
};

export default PostingPhotoList;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  height: 90%;
  padding: ${({ theme }) => theme.spacing.xxxl};
  text-align: center;
`;
