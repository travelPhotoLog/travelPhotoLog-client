import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled, { ThemeProvider } from "styled-components";

import "react-quill/dist/quill.snow.css";
import theme from "../../styles/theme";
import Modal from "../common/Modal";
import Message from "../common/Message";
import ResponseMessage from "../common/ResponseMessage";
import { StyledButton } from "../common/CommonStyle";
import { LOADING_MESSAGE } from "../../constants";

const PostingDetail = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const { id } = useParams();

  const getPostingDetail = id => {
    return axios.get(`/posting/${id}`);
  };

  const { data, isLoading, isFetching, isError, error } = useQuery(
    "photos",
    () => getPostingDetail(id),
    {
      select: response => response?.data,
    }
  );

  const title = data?.posting?.title;
  const content = data?.posting?.content;
  const createdBy = data?.posting?.createdBy;

  const handleMoveBack = () => {
    navigate("/board");
  };

  const handleEditPosting = (id, posting) => {
    navigate(`/board/write/${id}`, { state: posting });
  };

  const handleDeletePosting = async () => {
    navigate(`/board/${user.nickname}`);
    await axios.delete(`/posting/${id}?user=${user.id}`);
  };

  if (isLoading || isFetching) {
    return <Message message={LOADING_MESSAGE.LOADING_POSTING} />;
  }

  return isError ? (
    <Modal size="big">
      <ResponseMessage message={error.message} />
    </Modal>
  ) : (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>
          <div>
            <TitleText>{title}</TitleText>
          </div>
        </Title>
        <Form>
          <h1 style={{ color: "#A5B592" }}>POSTING DETAIL</h1>
          <Editor>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </Editor>
        </Form>
        <Buttons>
          <Button onClick={handleMoveBack}>Back</Button>
          <Button
            className={createdBy !== user.nickname ? "hidden" : "shown"}
            type="submit"
            onClick={() => handleEditPosting(id, data.posting)}
          >
            Edit
          </Button>
          <Button
            className={createdBy !== user.nickname ? "hidden" : "shown"}
            type="submit"
            onClick={handleDeletePosting}
          >
            Delete
          </Button>
        </Buttons>
      </Container>
    </ThemeProvider>
  );
};

export default PostingDetail;

const Container = styled.div`
  width: 80%;
  margin: 10px auto;
  height: 15rem;
`;

const Form = styled.form`
  margin: 10px auto;
  margin-bottom: 50px;
`;

const Title = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  padding: 2px;
  text-align: center;
  border-bottom: 1px dotted #a5b592;
  font-size: 25px;
`;

const TitleText = styled.h1`
  color: #5a6151;
  border-radius: 5px;
`;

const Editor = styled.div`
  width: 100%;
  height: 30rem;
  margin: 10px auto;
  border: 1px solid gray;
  border-radius: 10px;
  overflow: scroll;
`;

const Buttons = styled.div`
  text-align: center;
`;

const Button = styled(StyledButton)`
  display: inline;
  padding: 5px;
  border-radius: 5px;
  background-color: #dcedc8;
  &.hidden {
    display: none;
  }
`;
