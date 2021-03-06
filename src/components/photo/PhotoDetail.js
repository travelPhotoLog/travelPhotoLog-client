import React, { useCallback, useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import styled, { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import axios from "../../api/axiosInstance";
import { ERROR_MESSAGE, LOADING_MESSAGE } from "../../constants";
import { photoActions } from "../../features/photoSlice";
import theme from "../../styles/theme";
import Message from "../common/Message";
import ResponseMessage from "../common/ResponseMessage";
import CommentList from "./CommentList";
import Modal from "../common/Modal";

const PhotoDetail = () => {
  const window = useRef(null);

  const moveScrollMount = useCallback(() => {
    if (window.current) {
      window.current.scrollTo({
        top: window.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    moveScrollMount();
  }, []);

  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);
  const user = useSelector(state => state.user.user);
  const index = useSelector(state => state.photo.currentIndex);
  const queryClient = useQueryClient();

  const mapId = pathname.split("/")[2];

  const photos = queryClient.getQueryData("photos")?.data?.photos;

  if (!photos) {
    navigate("/my-travels/");

    return <div />;
  }

  const photo = photos[index];
  const [isUploader, setIsUploader] = useState(
    photo.createdBy === user.nickname
  );

  const { url, description, createdBy, createdAt } = photo;
  const date = dayjs(createdAt).format("YYYY년 MM월 DD일 HH:mm:ss");

  const deletePhoto = (id, mapId) => {
    return axios.delete(`/photo/${id}?map=${mapId}`);
  };

  const onSuccess = () => {
    queryClient.invalidateQueries("photos");
    navigate(-1);
  };

  const { data, isLoading, isFetching, isError } = useQuery(
    "photoDelete",
    () => deletePhoto(photo.id, mapId),
    {
      enabled: !!isDeleted,
      select: response => response.data,
      onSuccess,
    }
  );

  if (isLoading || isFetching) {
    return <Message message={LOADING_MESSAGE.DELETING_PHOTO} />;
  }

  if (data?.error) {
    return <Message message={ERROR_MESSAGE.SERVER_UNSTABLE} />;
  }

  const handleLeftClick = () => {
    if (index > 0) {
      dispatch(photoActions.updateIndex({ index: index - 1 }));
      setIsUploader(photos[index - 1].createdBy === user.nickname);
    }
  };

  const handleRightClick = () => {
    if (index < photos.length - 1) {
      dispatch(photoActions.updateIndex({ index: index + 1 }));
      setIsUploader(photos[index + 1].createdBy === user.nickname);
    }
  };

  return isError ? (
    <Modal size="big">
      <ResponseMessage message={ERROR_MESSAGE.SERVER_UNSTABLE} />
    </Modal>
  ) : (
    <ThemeProvider theme={theme}>
      <Modal size="big" id={mapId}>
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
                onClick={() => setIsDeleted(true)}
              >
                DELETE
              </Button>
            </Box>
            <CommentList />
          </Detail>
          <RightButton onClick={handleRightClick} />
        </Container>
      </Modal>
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
  transition: all 0.1s ease-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.3);
  }
`;

const RightButton = styled(AiOutlineRight)`
  position: fixed;
  top: 50%;
  right: 22%;
  color: black;
  font-size: 30px;
  transition: all 0.1s ease-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.3);
  }
`;

const Detail = styled.div`
  ${({ theme }) => theme.container.flexCenterColumn}
  flex-wrap: wrap;
  width: 100%;
  padding-top: 1rem;
  margin-top: 2rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
`;

const Box = styled.div`
  width: 85%;
  height: auto;
  padding-bottom: 1rem;
  margin: ${({ theme }) => theme.spacing.base};
  border-bottom: 1px solid #a6ae9c;
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
  transition: all 0.3s ease-out;
  &:hover {
    background-color: black;
  }
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
