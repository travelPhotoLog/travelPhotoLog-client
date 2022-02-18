import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import Cookies from "universal-cookie";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import styled from "styled-components";
import axios from "axios";

import { signUpActions } from "../../features/signupSlice";
import { authentication } from "../../utils/firebase";
import { userActions } from "../../features/userSlice";
import { ERROR_MESSAGE, RESPONSE_MESSAGE } from "../../constants";
import ResponseMessage from "../common/ResponseMessage";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({
    email: "",
    photoURL: "",
  });
  const cookies = new Cookies();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userInfo = await signInWithPopup(authentication, provider);

    const { email, photoURL } = userInfo.user;

    setUser({ email, photoURL });
  };

  useEffect(async () => {
    if (!user.email) {
      return;
    }

    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URI}/auth/login`,
      { email: user.email },
      { withCredentials: true }
    );

    if (data.user) {
      if (data.accessToken) {
        cookies.set("accessToken", data.accessToken, {
          path: "/",
          // httpOnly: true,
          maxAge: 14 * 24 * 60 * 60,
        });
      }

      if (data.refreshToken) {
        cookies.set("refreshToken", data.refreshToken, {
          path: "/",
          // httpOnly: true,
          maxAge: 14 * 24 * 60 * 60,
        });
      }

      dispatch(userActions.updateUser(data.user));
      navigate(-1);

      return;
    }

    if (data.result === RESPONSE_MESSAGE.USER_NOT_EXIST) {
      dispatch(
        signUpActions.saveSignUpInfo({
          email: user.email,
          profileUrl: user.photoURL,
        })
      );

      navigate("/auth/sign-up");
      return;
    }

    if (data.result === RESPONSE_MESSAGE.RELOGIN_REQUIRED) {
      navigate("/auth/login");
      return;
    }

    if (data.error) {
      if (data.error.code === 400) {
        setErrorMessage(ERROR_MESSAGE.BAD_REQUEST);
        return;
      }

      if (data.error.code === 500) {
        setErrorMessage(ERROR_MESSAGE.SERVER_UNSTABLE);
      }
    }
  }, [user.email]);

  return errorMessage ? (
    <ResponseMessage message={errorMessage} />
  ) : (
    <>
      <MainContainer>
        <Container>
          <ImageContainer>
            <p>Hello Travel world</p>
          </ImageContainer>
          <div>
            <h3>Welcome to Travel PhotoLog</h3>
            <GoogleButton onClick={signInWithGoogle} />
            {errorMessage && <p>{errorMessage}</p>}
          </div>
        </Container>
      </MainContainer>
      <Footer>© OCN cooperation</Footer>
    </>
  );
};

export default Login;

const MainContainer = styled.div`
  position: relative;
  height: 86vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url("/login.png") no-repeat;
  background-position: center top;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 60%;
  border: 1px double #ebedf2;
  background: white;
  border-radius: 10px;
`;

const ImageContainer = styled.div`
  width: 30%;
  border-right: 1px solid black;
`;

const Footer = styled.div`
  padding-top: 10px;
  color: #9e9e9e;
`;
