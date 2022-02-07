import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import axios from "axios";

import StyledButton from "../common/CommonStyle";
import theme from "../../styles/theme";

const SignUp = () => {
  const [message, setMessage] = useState("");
  const { signUpInfo } = useSelector(state => state.signUp);
  const navigate = useNavigate();

  const handleSaveButtonClick = async event => {
    event.preventDefault();

    const nickname = event.target.nickname.value;
    const contact = event.target.contact.value;
    const birthday = event.target.birthday.value;
    const occupation = event.target.occupation.value;

    if (new Date(birthday) > new Date()) {
      setMessage("생일은 현재 날짜보다 이전 날짜여야 합니다.");

      return;
    }

    if (contact.length) {
      if (!contact.includes("-")) {
        setMessage("전화번호는 '-'를 포함하여 입력해주세요.");

        return;
      }

      const [frontNumber, middleNumber, backNumber] = contact.split("-");

      if (
        frontNumber.length !== 3 ||
        middleNumber.length !== 4 ||
        backNumber.length !== 4
      ) {
        setMessage("휴대폰 번호의 형식에 맞게 입력해주세요.");

        return;
      }
    }

    const { data } = await axios.post("/auth/sign-up", {
      user: {
        email: signUpInfo.email,
        profileUrl: signUpInfo.profileUrl,
        nickname,
        contact,
        birthday,
        occupation,
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
          <Form onSubmit={handleSaveButtonClick}>
            <Title>[ Personal Information ]</Title>
            <Message>
              {message || "연락처, 생일, 직업은 필수 입력 사항이 아닙니다."}
            </Message>
            <Input name="nickname" placeholder="Nickname" required />
            <Input name="contact" placeholder="Contact includes '-'" />
            <Input name="birthday" type="date" />
            <Select name="occupation">
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
