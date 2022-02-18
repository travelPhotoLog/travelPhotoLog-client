import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import axios from "../../api/axiosInstance";
import theme from "../../styles/theme";
import Modal from "../common/Modal";

const NewMap = () => {
  const naviagte = useNavigate();

  const [mapTitle, setMapTitle] = useState("");
  const { id } = useSelector(state => state.user.user);

  const createNewMap = () => {
    return axios.post("/map/new", {
      map: { title: mapTitle },
      user: id,
    });
  };

  const onSuccess = () => {
    return naviagte(-1);
  };

  const { refetch } = useQuery("createNewMap", createNewMap, {
    enabled: false,
    onSuccess,
  });

  const handleCreateButtonClick = event => {
    event.preventDefault();

    refetch();
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal size="small">
        <Title>New Map</Title>
        <Message>Title</Message>
        <Form onSubmit={handleCreateButtonClick}>
          <Input
            name="title"
            onChange={event => setMapTitle(event.target.value)}
            required
          />
          <Button type="submit">CREATE</Button>
        </Form>
      </Modal>
    </ThemeProvider>
  );
};

export default NewMap;

const Form = styled.form`
  position: relative;
  width: 100%;
  height: 30%;
  margin-top: ${({ theme }) => theme.spacing.base};
  background-color: rgb(255, 255, 255);
  text-align: center;
`;

const Title = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.base};
  background-color: rgb(255, 255, 255);
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: 600;
`;

const Input = styled.input`
  width: 50%;
  height: 50%;
  margin: 0 ${({ theme }) => theme.spacing.base};
`;

const Button = styled.button`
  width: 15%;
  height: 50%;
  margin: 0 ${({ theme }) => theme.spacing.base};
  border-radius: 5%;
  background-color: grey;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
`;

const Message = styled.span`
  margin-top: ${({ theme }) => theme.spacing.xxl};
  background-color: rgb(255, 255, 255);
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 500;
`;
