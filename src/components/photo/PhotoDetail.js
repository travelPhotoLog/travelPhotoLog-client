import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import styled, { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import axios from "axios";

import { ERROR_MESSAGE, LOADING_MESSAGE } from "../../constants";
import { photoActions } from "../../features/photoSlice";
import theme from "../../styles/theme";
import Message from "../common/Message";
import ResponseMessage from "../common/ResponseMessage";
import CommentList from "./CommentList";

const PhotoDetail = ({ mapId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);
  const user = useSelector(state => state.user);
  const photoIndex = useSelector(state => state.photo);
  const index = photoIndex.currentIndex;

  const queryClient = useQueryClient();
  const photos = queryClient.getQueryData("photos")?.data?.photos;
  const photo = photos[index];
  const [isUploader, setIsUploader] = useState(
    photo.createdBy === user.user.nickname
  );

  const { url, description, createdBy, createdAt } = photo;
  const date = dayjs(createdAt).format("YYYY년 MM월 DD일 HH:mm:ss");

  const deletePhoto = (id, mapId) => {
    return axios.delete(`/photo/${id}?map=${mapId}`);
  };

  const { data, isLoading, isFetching, isError } = useQuery(
    "photoDelete",
    () => deletePhoto(photo.id, mapId),
    {
      enabled: !!isDeleted,
      select: response => response.data,
    }
  );

  if (isLoading || isFetching) {
    return <Message message={LOADING_MESSAGE.DELETING_PHOTO} />;
  }

  if (data?.result) {
    navigate(-1);
  }

  if (data?.error) {
    return <Message message={ERROR_MESSAGE.SERVER_UNSTABLE} />;
  }

  const handleLeftClick = () => {
    if (index > 0) {
      dispatch(photoActions.updateIndex({ index: index - 1 }));
      setIsUploader(photos[index - 1].createdBy === user.user.nickname);
    }
  };

  const handleRightClick = () => {
    if (index < photos.length - 1) {
      dispatch(photoActions.updateIndex({ index: index + 1 }));
      setIsUploader(photos[index + 1].createdBy === user.user.nickname);
    }
  };

  const handleDeleteclick = () => {
    setIsDeleted(true);
  };

  return isError ? (
    <ResponseMessage message={ERROR_MESSAGE.SERVER_UNSTABLE} />
  ) : (
    <ThemeProvider theme={theme}>
      <Container>
        <LeftButton onClick={handleLeftClick} />
        <Detail>
          <Img src={url} alt={description} />
          <Description>{description}</Description>
          <Box>
            <SubData>{createdBy}</SubData>
            <SubData>{date}</SubData>
            <Button
              className={isUploader ? "show" : "hide"}
              onClick={handleDeleteclick}
            >
              DELETE
            </Button>
          </Box>
          <CommentList />
        </Detail>
        <RightButton onClick={handleRightClick} />
      </Container>
    </ThemeProvider>
  );
};

export default PhotoDetail;

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  vertical-align: middle;
`;

const LeftButton = styled(AiOutlineLeft)`
  position: fixed;
  top: 50%;
  left: 22%;
  color: black;
  font-size: 30px;
  cursor: pointer;
`;

const RightButton = styled(AiOutlineRight)`
  position: fixed;
  top: 50%;
  right: 22%;
  color: black;
  font-size: 30px;
  cursor: pointer;
`;

const Detail = styled.div`
  ${({ theme }) => theme.container.flexCenterColumn}
  flex-wrap: wrap;
`;

const Box = styled.div`
  width: 33vw;
  height: auto;
  margin: ${({ theme }) => theme.spacing.base};
  text-align: right;
`;

const SubData = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 500;
`;

const Description = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
`;

const Button = styled.button`
  width: 15%;
  height: 30%;
  margin: ${({ theme }) => theme.spacing.base} 0;
  border-radius: 5%;
  background-color: grey;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 500;
  &.hide {
    display: none;
  }
`;

const Img = styled.img`
  width: 33vw;
  height: auto;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 2%;
`;

PhotoDetail.propType = {
  mapId: PropTypes.string.isRequired,
};
