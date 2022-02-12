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
  const [warnMsg, setWarnMsg] = useState("");
  const [isSave, setIsSave] = useState(false);
  const photoIndex = useSelector(state => state.photo);
  const user = useSelector(state => state.user);
  const index = photoIndex.currentIndex;
  const queryClient = useQueryClient();
  const photos = queryClient.getQueryData("photos")?.data?.photos;
  const commentList = photos[index].comments;

  const postComment = () => {
    const comment = {
      createdAt: new Date(),
      createdBy: user.user.nickname,
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
    // 왜 여기서는 리렌더링 안일어나..?
  }

  if (data?.error) {
    if (data.error.code === 500) {
      return setWarnMsg("잠시 후에 다시 시도해주세요.");
    }

    setWarnMsg(data.error.message);
  }

  const handleSaveClick = () => {
    const trimmedReply = reply.trimStart();

    if (!trimmedReply) {
      setWarnMsg("내용을 입력해주세요.");
      return;
    }

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
        <Message message={warnMsg} />
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
