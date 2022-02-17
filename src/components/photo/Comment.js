import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery, useQueryClient } from "react-query";
import Proptypes from "prop-types";
import dayjs from "dayjs";
import axios from "axios";
import styled, { ThemeProvider } from "styled-components";

import {
  ERROR_MESSAGE,
  LOADING_MESSAGE,
  RESPONSE_MESSAGE,
} from "../../constants";
import theme from "../../styles/theme";
import Message from "../common/Message";

const Comment = ({ comment }) => {
  const [hasError, setHasError] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const index = useSelector(state => state.photo.currentIndex);
  const user = useSelector(state => state.user);
  const queryClient = useQueryClient();

  const photos = queryClient.getQueryData("photos")?.data?.photos;
  const photo = photos[index];

  const { message, createdAt, createdBy } = comment;
  const date = dayjs(createdAt).format("YY/MM/DD HH:mm");

  const deleteComment = (commentId, photoId) => {
    setIsDelete(false);

    return axios.delete(`/comment/${commentId}?photo=${photoId}`);
  };

  const { data, isLoading, isFetching, isError } = useQuery(
    "deleteComment",
    () => deleteComment(comment._id, photo.id),
    {
      enabled: !!isDelete,
      select: response => response.data,
    }
  );

  if (isLoading || isFetching) {
    return <Message message={LOADING_MESSAGE.SENDING_IN_PROGRESS} />;
  }

  if (data?.comments) {
    // 소켓..?
  }

  if (data?.error) {
    if (data.error.code === 500) {
      setHasError(true);
    }
  }

  return hasError || isError ? (
    <RESPONSE_MESSAGE message={ERROR_MESSAGE.SERVER_UNSTABLE} />
  ) : (
    <ThemeProvider theme={theme}>
      <Container>
        <Creator>[ {createdBy} ]</Creator>
        <Reply>{message}</Reply>
        <Date>{date}</Date>
        <Button
          className={createdBy === user.user.nickname ? "show" : "hidden"}
          onClick={() => setIsDelete(true)}
        >
          Delete
        </Button>
      </Container>
    </ThemeProvider>
  );
};

export default Comment;

const Container = styled.div`
  width: 33vw;
  margin: ${({ theme }) => theme.spacing.small} 0;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const Creator = styled.div`
  display: inline-block;
  margin: 0 ${({ theme }) => theme.spacing.base};
  font-weight: 600;
`;

const Reply = styled.div`
  display: inline-block;
  margin: 0 ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const Date = styled.div`
  display: inline-block;
  margin: 0 ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const Button = styled.button`
  width: 10%;
  margin: ${({ theme }) => theme.spacing.base};
  border-radius: 5%;
  background-color: grey;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 600;
  &.hidden {
    display: none;
  }
`;

Comment.propTypes = {
  comment: {
    createdAt: Proptypes.string.isRequired,
    createdBy: Proptypes.string.isRequired,
    message: Proptypes.string.isRequired,
    _id: Proptypes.string.isRequired,
  }.isRequired,
};
