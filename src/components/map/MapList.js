import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled, { ThemeProvider } from "styled-components";

import Map from "./Map";
import ErrorPage from "../error/ErrorPage";
import theme from "../../styles/theme";
import StyledButton from "../common/CommonStyle";
import ERROR_MESSAGE from "../../constants";

const MapList = () => {
  const navigate = useNavigate();

  const [mapList, setMapList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const { user } = useSelector(state => state.user);
  const userId = user.id;

  const mapListData = () => {
    return axios.get(`/user/${userId}/maps`);
  };

  const onSuccess = ({ data }) => {
    if (data.maps) {
      setMapList(data.maps);
    }

    if (data.error) {
      if (data.error.status === 400) {
        setErrorMsg(ERROR_MESSAGE.BAD_REQUEST);
      }

      if (data.error.status === 500) {
        setErrorMsg(ERROR_MESSAGE.SERVER_USTABLE);
      }
    }
  };

  useQuery("mapList", mapListData, {
    enabled: !!userId,
    onSuccess,
  });

  return mapList.length ? (
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
            +
          </MapButton>
        </Container>
      </MainContainer>
    </ThemeProvider>
  ) : (
    <ErrorPage message={errorMsg} />
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
  position: absolute;
  left: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 80%;
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
