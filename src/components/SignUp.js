import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import StyledButton from "../styles/commonStyle";
import theme from "../styles/theme";

const SignUp = () => {
  const [nickname, setNickname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [contact, setContact] = useState("");
  const [occupation, setOccupation] = useState("");
  const [message, setMessage] = useState("");
  const { signUpInfo } = useSelector(state => state.signUp);
  const navigate = useNavigate();

  const handleSaveClick = async event => {
    event.preventDefault();

    if (new Date(birthday) > new Date()) {
      setMessage("생일은 현재 날짜보다 이전 날짜여야 합니다.");

      return;
    }

    const { data } = await axios.post("/auth/sign-up", {
      user: {
        nickname,
        contact,
        occupation,
        email: signUpInfo.email,
        profileUrl: signUpInfo.profileUrl,
        birthday: birthday ? new Date(birthday) : "",
      },
    });

    if (data.result === "ok") {
      setMessage("");

      setTimeout(() => {
        navigate("/");
      }, 500);
    }

    if (data.result === "해당 닉네임이 존재합니다") {
      setMessage("이미 존재하는 닉네임입니다.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <Container>
          <ImageContainer>
            <p>Hello Travel world</p>
          </ImageContainer>
          <Form onSubmit={handleSaveClick}>
            <Title>[ Personal Information ]</Title>
            <Message>
              {message || "연락처, 생일, 직업은 필수 입력 사항이 아닙니다."}
            </Message>
            <Input
              placeholder="Nickname"
              required
              onChange={event => setNickname(event.target.value)}
            />
            <Input
              placeholder="Contact includes '-'"
              onChange={event => setContact(event.target.value)}
            />
            <Input
              type="date"
              onChange={event => setBirthday(event.target.value)}
            />
            <Select onChange={event => setOccupation(event.target.value)}>
              <option value="">Please select an accupation</option>
              <option value="student">Student</option>
              <option value="officeWorker">Office Worker</option>
              <option value="housewife">Housewife</option>
              <option value="jobSeeker">Job Seeker</option>
              <option value="etc">etc</option>
            </Select>
            <SaveButton type="submit">Save</SaveButton>
          </Form>
        </Container>
      </MainContainer>
      <Footer>© OCN cooperation</Footer>
    </ThemeProvider>
  );
};

export default SignUp;

const MainContainer = styled.div`
  ${({ theme }) => theme.container.flexCenterColumn};
  position: relative;
  height: 86vh;
  background: url("/login2.png") no-repeat;
  background-position: center top;
`;

const Container = styled.div`
  ${({ theme }) => theme.container.flexSpaceAround};
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 60%;
  border: 1px double gray;
  border-radius: 10px;
  background: #f5f5f5;
`;

const ImageContainer = styled.div`
  width: 25%;
  text-align: center;
`;

const Form = styled.form`
  ${({ theme }) => theme.container.flexCenterColumn};
  width: 350px;
  height: 30%;
`;

const Title = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: 600;
`;

const Message = styled.div`
  width: 100%;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  height: 25%;
  margin: ${({ theme }) => theme.spacing.xxxl} 0;
`;

const Select = styled.select`
  width: 100%;
  height: 25%;
  margin: ${({ theme }) => theme.spacing.xxxl} 0;
`;

const SaveButton = styled(StyledButton)`
  display: inline;
  margin: ${({ theme }) => theme.spacing.xl};
  background-color: transparent;
  text-align: center;
`;

const Footer = styled.div`
  padding-top: 10px;
  color: #9e9e9e;
`;
