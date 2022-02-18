import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import axios from "../../api/axiosInstance";
import theme from "../../styles/theme";
import { ERROR_MESSAGE, RESPONSE_MESSAGE } from "../../constants";
import {
  validateContact,
  validateBirthday,
} from "../../utils/signUpValidation";
import { StyledButton } from "../common/CommonStyle";
import ResponseMessage from "../common/ResponseMessage";

const SignUp = () => {
  const { signUpInfo } = useSelector(state => state.signUp);
  const navigate = useNavigate();
  const [message, setMessage] = useState(
    "연락처, 생일, 직업은 선택 사항입니다."
  );
  const [warnMsgs, setWarnMsgs] = useState({
    email: "",
    profileUrl: "",
    nickname: "",
    contact: "",
    birthday: "",
    occupation: "",
  });
  const [inputValue, setInputValue] = useState({
    nickname: "",
    contact: "",
    birthday: "",
    occupation: "",
  });
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getLoginUser = async () => {
      try {
        const { data } = await axios.get("/auth/auto-login");

        if (data.user) {
          navigate("/");
          return;
        }

        if (!data.user && !signUpInfo.email) {
          navigate("/auth/login");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getLoginUser();
  }, []);

  const handleInputChange = async event => {
    const { name, value } = event.target;

    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSaveButtonClick = async event => {
    event.preventDefault();

    const messages = Object.values(warnMsgs);

    for (let i = 0; i < messages.length; i++) {
      if (messages[i] !== "") {
        return;
      }
    }

    const { nickname, contact, birthday, occupation } = inputValue;

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
        navigate("/auth/login");
      }, 500);

      return;
    }

    if (data.result === RESPONSE_MESSAGE.EXIST_NICKNAME) {
      setWarnMsgs({
        ...warnMsgs,
        nickname: "이미 존재하는 닉네임입니다.",
      });

      return;
    }

    if (data.error) {
      setWarnMsgs({
        ...warnMsgs,
        ...data.error,
      });

      return;
    }

    if (data.error.code === 500) {
      setHasError(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {hasError ? (
        <ResponseMessage message={ERROR_MESSAGE.SERVER_UNSTABLE} />
      ) : (
        <>
          <MainContainer>
            <Container>
              <ImageContainer>
                <p>Hello Travel world</p>
              </ImageContainer>
              <Form onSubmit={handleSaveButtonClick}>
                <Title>[ Personal Information ]</Title>
                <Message>{message}</Message>
                <WarningMessage>
                  {(warnMsgs.email, warnMsgs.profileUrl)}
                </WarningMessage>
                <WarningMessage>{warnMsgs.nickname}</WarningMessage>
                <Input
                  name="nickname"
                  placeholder="Nickname"
                  onChange={event => handleInputChange(event)}
                  required
                />
                <WarningMessage>{warnMsgs.contact}</WarningMessage>
                <Input
                  name="contact"
                  placeholder="Contact includes '-'"
                  onBlur={event =>
                    validateContact(event, warnMsgs, setWarnMsgs)
                  }
                  onChange={event => handleInputChange(event)}
                />
                <WarningMessage>{warnMsgs.birthday}</WarningMessage>
                <Input
                  name="birthday"
                  type="date"
                  onBlur={event =>
                    validateBirthday(event, warnMsgs, setWarnMsgs)
                  }
                  onChange={event => handleInputChange(event)}
                />
                <WarningMessage>{warnMsgs.occupation}</WarningMessage>
                <Select
                  name="occupation"
                  onChange={event => handleInputChange(event)}
                >
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
        </>
      )}
    </ThemeProvider>
  );
};

export default SignUp;

const MainContainer = styled.div`
  ${({ theme }) => theme.container.flexCenterColumn};
  position: relative;
  height: 86vh;
  background: url("/login.png") no-repeat;
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
  width: 35%;
  height: 30%;
`;

const Title = styled.div`
  width: 100%;
  height: 20%;
  margin-bottom: ${({ theme }) => theme.spacing.base};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: 600;
  text-align: center;
`;

const Message = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.base};
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

const Input = styled.input`
  width: 100%;
  height: 25%;
  margin-bottom: ${({ theme }) => theme.spacing.base};
`;

const Select = styled.select`
  width: 100%;
  height: 25%;
  margin-bottom: ${({ theme }) => theme.spacing.base};
`;

const SaveButton = styled(StyledButton)`
  display: inline;
  background-color: transparent;
  text-align: center;
`;

const Footer = styled.div`
  padding-top: 10px;
  color: #9e9e9e;
`;
