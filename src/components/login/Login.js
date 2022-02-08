import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import styled from "styled-components";
import axios from "axios";

import { signUpActions } from "../../features/signUpSlice";
import { authentication } from "../../utils/firebase";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userInfo = await signInWithPopup(authentication, provider);

    setUserEmail(userInfo.user.email);
    setPhotoURL(userInfo.user.photoURL);
  };

  useEffect(async () => {
    if (!userEmail) {
      return;
    }

    const { data } = await axios.post("/auth/login");

    if (data.result === "해당 유저가 존재하지 않습니다") {
      dispatch(
        signUpActions.saveSignUpInfo({
          email: userEmail,
          profileUrl: photoURL,
        })
      );

      navigate("/auth/sign-up");
      return;
    }

    if (data.result === "재로그인이 필요한 유저입니다") {
      navigate("/auth/login");
    }
  }, [userEmail]);

  return (
    <>
      <MainContainer>
        <Container>
          <ImageContainer>
            <p>Hello Travel world</p>
          </ImageContainer>
          <div>
            <h3>Welcome to Travel PhotoLog</h3>
            <GoogleButton onClick={signInWithGoogle} />
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
  background: url("/login2.png") no-repeat;
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
  border: 1px double gray;
  background: #f5f5f5;
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
