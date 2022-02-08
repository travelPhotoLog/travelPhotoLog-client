import React from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import axios from "axios";

import { userActions } from "../features/userSlice";
import theme from "../styles/theme";
import Button from "./common/Button";
import ErrorPage from "./error/ErrorPage";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const checkUserLogin = () => {
    return axios.post("/auth/auto-login");
  };

  const onSuccess = data => {
    const { user } = data;

    if (user) {
      dispatch(userActions.updateUser(user));
    }
  };

  const { isLoading, isError, error } = useQuery("user", checkUserLogin, {
    enabled: !user.isLoggedIn,
    onSuccess,
    select: response => response.data,
  });

  const handleMyTravelsClick = () => {
    if (user.isLoggedIn) {
      navigate("/my-travels");
    } else {
      navigate("/auth/login");
    }
  };

  const handleLogoutClick = async () => {
    try {
      const { status } = await axios.post("/auth/logout");

      if (status === 200) {
        dispatch(userActions.deleteUser());
        navigate("/");
      }
    } catch (error) {
      <ErrorPage message={error.message} />;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <ErrorPage message={error.message} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <HeaderContainer>
        <Logo to="/">OCN</Logo>
        <Container>
          <NavContainer>
            <StyledLink to="/board">Board</StyledLink>
            <Button onClick={handleMyTravelsClick}>My travels</Button>
          </NavContainer>
          <LoginContainer>
            {user.isLoggedIn ? (
              <Button onClick={handleLogoutClick}>Log out</Button>
            ) : (
              <StyledLink to="/auth/login">Log in</StyledLink>
            )}
          </LoginContainer>
        </Container>
      </HeaderContainer>
    </ThemeProvider>
  );
};

export default Header;

const HeaderContainer = styled.div`
  ${({ theme }) => theme.container.flexSpaceBetween};
  width: 100%;
  height: 6rem;
  border-bottom: 2px solid gray;
`;

const Container = styled.div`
  ${({ theme }) => theme.container.flexCenter};
  width: 40%;
`;

const NavContainer = styled.div`
  ${({ theme }) => theme.container.flexSpaceBetween};
`;

const LoginContainer = styled.div`
  ${({ theme }) => theme.container.flexCenter};
  padding: 0;
  padding-left: ${({ theme }) => theme.spacing.lg};
  padding-right: ${({ theme }) => theme.spacing.lg};
  width: 8rem;
  border-left: 2px solid black;
`;

const StyledLink = styled(NavLink)`
  margin-left: ${({ theme }) => theme.spacing.xl};
  margin-right: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 0.5rem;
  background-color: white;
  color: black;
  font-weight: bold;
  text-decoration: none;
`;

const Logo = styled(StyledLink)`
  background-color: transparent;
`;
