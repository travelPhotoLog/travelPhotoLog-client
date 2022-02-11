import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Routes } from "react-router-dom";

import Header from "../components/Header";
import MainPage from "../components/MainPage";
import Login from "../components/login/Login";
import MapList from "../components/map/MapList";
import SignUp from "../components/login/SignUp";
import MapDetail from "../components/map/MapDetail";
import NewMap from "../components/map/NewMap";
import Modal from "../components/common/Modal";
import GlobalStyle from "../styles/GlobalStyle";
import InvitationResult from "../components/Invitation/InvitationResult";

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
          <Route path="/my-travels" element={<MapList />} />
          <Route path="/my-travels/:id/*" element={<MapDetail />} />
          <Route
            path="/my-travels/:id/invitation/:token"
            element={<InvitationResult />}
          />
          <Route
            path="/my-travels/new-map"
            element={
              <Modal size="small">
                <NewMap />
              </Modal>
            }
          />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
};

export default App;
