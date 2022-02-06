import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";

import Header from "../components/Header";
import MainPage from "../components/MainPage";
import Login from "../components/Login";
import GlobalStyle from "../styles/GlobalStyle";
import SignUp from "../components/SignUp";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/sign-up" element={<SignUp />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
};

export default App;
