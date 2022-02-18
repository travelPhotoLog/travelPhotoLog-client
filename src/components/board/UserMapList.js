import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import axios from "axios";
import styled, { ThemeProvider } from "styled-components";

import theme from "../../styles/theme";
import { ERROR_MESSAGE } from "../../constants";
import ResponseMessage from "../common/ResponseMessage";
import Modal from "../common/Modal";
import UserMap from "./UserMap";

const getMapList = id => {
  return axios.get(`${process.env.REACT_APP_SERVER_URI}/user/${id}/maps`);
};

const UserMapList = () => {
  const { user } = useSelector(state => state.user);
  const userId = user.id;

  const { data, isError, error, isLoading } = useQuery(
    "mapList",
    () => getMapList(userId),
    {
      enabled: !!userId,
      select: response => response.data,
    }
  );

  const mapList = data?.maps;

  if (isLoading) {
    return <div />;
  }

  if (isError) {
    return <ResponseMessage message={error.message} />;
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
    <ThemeProvider theme={theme}>
      <Modal size="big">
        <MainContainer>
          <Container>
            <Title>My Travels</Title>
            {mapList?.map(item => (
              <UserMap key={item.id} map={item} userId={userId} />
            ))}
          </Container>
        </MainContainer>
      </Modal>
    </ThemeProvider>
  );
};

export default UserMapList;

const MainContainer = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #fafafa;
  background-position: center top;
  background-color: #dcedc8;
  background: url("https://travelphotolog.s3.ap-northeast-2.amazonaws.com/myboards-background.png")
    no-repeat;
  background-position: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  width: 80%;
  left: 10%;
  align-items: center;
  border-radius: 10px;
`;

const Title = styled.h1`
  padding: 10px 20px;
  font-size: 25px;
  font-weight: bold;
`;
