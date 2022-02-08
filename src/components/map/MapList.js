import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled, { ThemeProvider } from "styled-components";
import { FaRegPlusSquare } from "react-icons/fa";

import Map from "./Map";
import ErrorPage from "../error/ErrorPage";
import theme from "../../styles/theme";
import StyledButton from "../common/CommonStyle";
import ERROR_MESSAGE from "../../constants";

const getMapList = id => {
  return axios.get(`/user/${id}/maps`);
};

const MapList = () => {
  const navigate = useNavigate();
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
    return <div>Loading...</div>;
  }

  if (isError) {
    return <ErrorPage message={error.message} />;
  }

  if (data?.error) {
    if (data.error.status === 400) {
      return <ErrorPage message={ERROR_MESSAGE.BAD_REQUEST} />;
    }
    if (data.error.status === 500) {
      return <ErrorPage message={ERROR_MESSAGE.SERVER_USTABLE} />;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <Container>
          <Phrase>
            Travel and change of place impart new vigor to the mind
          </Phrase>
          <Title>My Travels</Title>
          {mapList?.map(item => (
            <Map key={item.id} map={item} />
          ))}
          <MapButton onClick={() => navigate("/my-travels/new-map")}>
            <FaRegPlusSquare />
          </MapButton>
        </Container>
      </MainContainer>
    </ThemeProvider>
  );
};

export default MapList;

const MainContainer = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #fafafa;
  background-position: center top;
  background: url("images/myboards-background.png") no-repeat;
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

const Phrase = styled.h1`
  padding: 10px 20px;
  margin: 20px;
  background-color: white;
  color: #9e9e9e;
  font-size: 20px;
  font-weight: semi;
  font-style: italic;
  font-family: "Gill Sans", sans-serif;
`;

const Title = styled.h1`
  padding: 10px 20px;
  font-size: 25px;
  font-weight: bold;
`;

const MapButton = styled(StyledButton)`
  display: flex;
  justify-content: center;
  margin: 10px;
  width: 60vw;
  color: black;
  font-weight: normal;
  border-radius: 50px;
  box-shadow: 1px 1px 1px 1px #c2c2c2;
  :hover {
    background-color: #dcedc8;
  }
`;
