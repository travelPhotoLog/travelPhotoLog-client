import React, { useState, useMemo, useRef, useEffect } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import styled, { ThemeProvider } from "styled-components";

import { ERROR_MESSAGE, LOADING_MESSAGE } from "../../constants";
import Message from "../common/Message";
import ResponseMessage from "../common/ResponseMessage";
import { StyledButton } from "../common/CommonStyle";
import theme from "../../styles/theme";
import Modal from "../common/Modal";

const PostingDetail = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const { id } = useParams();

  const detailPosting = id => {
    return axios.get(`/posting/${id}`);
  };

  const { data, isLoading, isFetching, isError, error } = useQuery(
    "photos",
    () => detailPosting(id),
    {
      select: response => response?.data,
    }
  );

  const title = data?.posting?.title;
  const content = data?.posting?.content;

  const handleEditPosting = () => {
    navigate(`/board/write/${id}`);
  };

  const handleDeletePosting = () => {
    navigate(`/board/${user.nickname}`);
  };

  if (isLoading || isFetching) {
    return <Message message={LOADING_MESSAGE.LOADING_PHOTOS} />;
  }

  return isError ? (
    <Modal size="big">
      <ResponseMessage message={error.message} />\
    </Modal>
  ) : (
    <ThemeProvider theme={theme}>
      <Container>
        <Title style={{ maxWidth: "700px", margin: "2rem auto" }}>
          <div style={{ textAlign: "center" }}>
            <h1>POSTING DETAIL</h1>
            <h1>{title}</h1>
          </div>
        </Title>
        <Editor>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Editor>
        <Button type="submit" onClick={handleEditPosting}>
          Edit
        </Button>
        <Button type="submit" onClick={handleDeletePosting}>
          Delete
        </Button>
      </Container>
    </ThemeProvider>
  );
};

export default PostingDetail;

const Container = styled.div`
  maxwidth: 700px;
  margin: auto 50px;
`;

const Title = styled.div``;

const Button = styled(StyledButton)`
  padding: 10px;
`;

const Editor = styled.div`
  width: 500px;
  height: 400px;
  margin: 10px auto;
  border: 1px solid black;
`;

const WarningMessage = styled.div`
  width: 100%;
  height: 10%;
  margin-bottom: ${({ theme }) => theme.spacing.base};
  color: red;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 700;
  text-align: center;
`;
