import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { ERROR_MESSAGE, RESPONSE_MESSAGE } from "../../constants";
import theme from "../../styles/theme";
import ResponseMessage from "../common/ResponseMessage";

const NewInvitation = () => {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSuccess = data => {
    if (data.result === RESPONSE_MESSAGE.USER_NOT_EXIST) {
      setMessage(RESPONSE_MESSAGE.USER_NOT_EXIST);
      return;
    }

    if (data.result === RESPONSE_MESSAGE.ALREADY_IN_SAME_GROUP) {
      setMessage(RESPONSE_MESSAGE.ALREADY_IN_SAME_GROUP);
      return;
    }

    if (data.result === RESPONSE_MESSAGE.ALREADY_INVITED) {
      setMessage(RESPONSE_MESSAGE.ALREADY_INVITED);
      return;
    }

    if (data.result === RESPONSE_MESSAGE.SENDING_SUCCESS) {
      setMessage("초대 링크 전송에 성공했습니다🍑");
    }
  };

  const sendEmail = (id, email) => {
    return axios.put(`/map/${id}/invitation`, {
      email,
    });
  };

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery(
    "sendEmail",
    () => sendEmail(id, email),
    {
      onSuccess,
      enabled: false,
      select: response => response.data,
    }
  );

  if (isLoading || isFetching) {
    return <Message>잠시만 기다려주세요...</Message>;
  }

  if (data?.error) {
    if (data.error.code === 400) {
      return <ResponseMessage message={ERROR_MESSAGE.BAD_REQUEST} />;
    }

    if (data?.error.code === 500) {
      return <ResponseMessage message={ERROR_MESSAGE.SERVER_UNSTABLE} />;
    }
  }

  const handleSendClick = event => {
    event.preventDefault();

    refetch();
  };

  return isError ? (
    <ResponseMessage message={error.message} />
  ) : (
    <Form onSubmit={handleSendClick}>
      <Title>Invite new member</Title>
      <Input
        placeholder="Please enter E-mail"
        onChange={event => setEmail(event.target.value)}
      />
      <Button type="submit">Send</Button>
      <Message>{message || null}</Message>
    </Form>
  );
};

const Form = styled.form`
  position: relative;
  width: 100%;
  height: 50%;
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
  height: 30%;
  margin: 0 ${({ theme }) => theme.spacing.base};
`;

const Button = styled.button`
  width: 15%;
  height: 30%;
  margin: 0 ${({ theme }) => theme.spacing.base};
  border-radius: 5%;
  background-color: grey;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
`;

const Message = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xxl};
  background-color: rgb(255, 255, 255);
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 500;
`;

export default NewInvitation;
