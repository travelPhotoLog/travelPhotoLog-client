import React, { useState } from "react";
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
  // setNotice를 사용하는 부분에서 과한 리랜더링이 발생함..
  const [notice, setNotice] = useState("");
  const [isSave, setIsSave] = useState(false);
  const index = useSelector(state => state.photo.currentIndex);
  const user = useSelector(state => state.user.user);
  const queryClient = useQueryClient();

  const photos = queryClient.getQueryData("photos")?.data?.photos;
  const commentList = photos[index].comments;

  const postComment = () => {
    const comment = {
      createdAt: new Date(),
      createdBy: user.nickname,
      message: reply,
    };

    const photo = photos[index].id;

    setIsSave(false);
    setReply("");

    return axios.post("/comment/new", { comment, photo });
  };

  const { data, isLoading, isFetching, isError } = useQuery(
    "postComment",
    postComment,
    {
      enabled: !!isSave,
      select: response => response.data,
    }
  );

  if (isLoading || isFetching) {
    return <Message message={LOADING_MESSAGE.SENDING_IN_PROGRESS} />;
  }

  if (data?.result) {
    return setNotice("댓글이 등록되었습니다-🍑");
  }

  if (data?.error) {
    if (data.error.code === 500) {
      return setNotice("잠시 후에 다시 시도해주세요.");
    }

    setNotice(data.error.message);
  }

  const handleSaveClick = () => {
    const trimmedReply = reply.trimStart();

    if (!trimmedReply) {
      setNotice("내용을 입력해주세요.");
      return;
    }

    // 스테이트를 변경하면 리랜더가 일어나서 새로고침 한 것처럼 문제가 발생
    setIsSave(true);
  };

  return isError ? (
    <ResponseMessage message={ERROR_MESSAGE.SERVER_UNSTABLE} />
  ) : (
    <ThemeProvider theme={theme}>
      <Form>
        <Input
          name="message"
          onChange={event => setReply(event.target.value)}
          value={reply}
          required
        />
        <Button onClick={handleSaveClick}>save</Button>
        <Message message={notice} />
      </Form>
      {commentList.map(comment => (
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
