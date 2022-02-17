import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled, { ThemeProvider } from "styled-components";

import axios from "../../api/axiosInstance";
import { ERROR_MESSAGE } from "../../constants";
import theme from "../../styles/theme";
import Message from "../common/Message";
import ResponseMessage from "../common/ResponseMessage";
import Comment from "./Comment";

const CommentList = () => {
  const [reply, setReply] = useState("");
  const [notice, setNotice] = useState("");
  const [photos, setPhotos] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const user = useSelector(state => state.user.user);
  const index = useSelector(state => state.photo.currentIndex);
  const { url } = useSelector(state => state.url);

  useEffect(async () => {
    try {
      const { photos } = (await axios.get(url)).data;

      setPhotos(photos);
      setCommentList(photos[index].comments);
    } catch {
      return <ResponseMessage message={ERROR_MESSAGE.SERVER_UNSTABLE} />;
    }
  }, [index]);

  const handleSaveClick = async event => {
    event.preventDefault();

    const trimmedReply = reply.trimStart();

    if (!trimmedReply) {
      setReply("");
      setNotice("내용을 입력해주세요.");

      return;
    }

    setReply("");

    const comment = {
      createdAt: new Date(),
      createdBy: user.nickname,
      message: reply,
    };

    try {
      const { comments } = (
        await axios.post("/comment/new", { comment, photo: photos[index].id })
      ).data;

      setCommentList(comments);
    } catch {
      return <ResponseMessage message={ERROR_MESSAGE.SERVER_UNSTABLE} />;
    }
  };

  return (
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
      {commentList.map(comment => (
        <Comment key={comment._id} comment={comment} onSet={setCommentList} />
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
