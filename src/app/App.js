import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";

import Header from "../components/Header";
import MainPage from "../components/MainPage";
import GlobalStyle from "../styles/GlobalStyle";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
};

export default App;
