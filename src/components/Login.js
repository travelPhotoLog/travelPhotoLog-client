import React, { useState } from "react";
import axios from "axios";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import GoogleButton from "react-google-button";

import { authentication } from "../utils/firebase";

const Login = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userInfo = await signInWithPopup(authentication, provider);

    setUserEmail(userInfo.user.email);
  };

  const loginData = () => {
    return axios.post("http://localhost:8000/auth/login", { email: userEmail });
  };

  const onSuccess = data => {
    if (data) {
      localStorage.setItem("userEmail", JSON.stringify(userEmail));
      navigate("/");
    } else {
      navigate("/auth/sign-up");
    }
  };

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "loginData",
    loginData,
    {
      enabled: !!userEmail,
      onSuccess,
    }
  );

  return (
    <MainContainer>
      <Container>
        <LoginContainer>
          <h3>Welcome to Travel PhotoLog</h3>
          <GoogleButton onClick={signInWithGoogle}>Click me</GoogleButton>
        </LoginContainer>
      </Container>
    </MainContainer>
  );
};

export default Login;

const MainContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("/login.png");
`;

const Container = styled.div`
  width: 35rem;
  height: 15rem;
  margin: 9rem auto;
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  color: #616161;
`;

const LoginContainer = styled.div`
  padding: 20px;
  margin-top: 1rem;
  margin-left: 9rem;
`;
