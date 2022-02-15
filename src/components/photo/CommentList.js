import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import axios from "axios";
import styled, { ThemeProvider } from "styled-components";

import { LOADING_MESSAGE, ERROR_MESSAGE } from "../../constants";
import theme from "../../styles/theme";
import Message from "../common/Message";
import ResponseMessage from "../common/ResponseMessage";
import Comment from "./Comment";

const CommentList = () => {
  const [reply, setReply] = useState("");
  const [notice, setNotice] = useState("");
  const user = useSelector(state => state.user.user);
  const index = useSelector(state => state.photo.currentIndex);
  const queryClient = useQueryClient();
  const photo = queryClient.getQueryData("photos")?.data?.photos[index];
  const photoId = queryClient.getQueryData("photos")?.data?.photos[index].id;
  const [comments, setComments] = useState([]);

  const postComment = id => {
    const comment = {
      createdAt: new Date(),
      createdBy: user.nickname,
      message: reply,
    };

    return axios.post("/comment/new", { comment, photo: id });
  };

  const { data, isLoading, isFetching, isError, refetch } = useQuery(
    "postComment",
    () => postComment(photoId),
    {
      enabled: false,
      select: response => response.data,
      initialData: () => {
        const photo = queryClient.getQueryData("photos")?.data?.photos[index];
        const { comments } = photo;

        if (photo) {
          return {
            data: { comments },
          };
        }
      },
    }
  );

  useEffect(() => {
    if (data?.comments === photo.comments) {
      setComments(photo.comments);
      return;
    }

    if (data?.comments !== photo.comments) {
      setComments(data?.comments);
    }
  }, [data]);

  useEffect(() => {
    if (data?.comments === photo.comments) {
      setComments(data?.comments);
      return;
    }

    if (data?.comments !== photo.comments) {
      setComments(photo.comments);
    }
  }, [index]);

  if (isLoading || isFetching) {
    return <Message message={LOADING_MESSAGE.SENDING_IN_PROGRESS} />;
  }

  if (data?.error) {
    if (data.error.code === 500) {
      return setNotice("잠시 후에 다시 시도해주세요.");
    }

    setNotice(data.error.message);
  }

  const handleSaveClick = event => {
    event.preventDefault();

    const trimmedReply = reply.trimStart();

    if (!trimmedReply) {
      setReply("");
      setNotice("내용을 입력해주세요.");

      return;
    }

    setReply("");
    refetch();
  };

  return isError ? (
    <ResponseMessage message={ERROR_MESSAGE.SERVER_UNSTABLE} />
  ) : (
    <ThemeProvider theme={theme}>
      <Form onSubmit={handleSaveClick}>
        <Input
          name="message"
          onChange={event => setReply(event.target.value)}
          value={reply}
          required
        />
        <Button type="submit">save</Button>
        <Message message={notice} />
      </Form>
      {comments.map(comment => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </ThemeProvider>
  );
};

export default CommentList;

const Form = styled.form`
  position: relative;
  width: 35vw;
  height: 10vh;
  background-color: rgb(255, 255, 255);
  text-align: center;
`;

const Input = styled.input`
  width: 24vw;
  height: 4vh;
  margin: 0 ${({ theme }) => theme.spacing.base};
`;

const Button = styled.button`
  width: 15%;
  height: 4vh;
  margin: ${({ theme }) => theme.spacing.base};
  border-radius: 5%;
  background-color: grey;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: 600;
`;
