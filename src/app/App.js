import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Routes, Outlet } from "react-router-dom";

import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header";
import MainPage from "../components/MainPage";
import Login from "../components/login/Login";
import MapList from "../components/map/MapList";
import SignUp from "../components/login/SignUp";
import MapDetail from "../components/map/MapDetail";
import NewMap from "../components/map/NewMap";
import Modal from "../components/common/Modal";
import PhotoList from "../components/photo/PhotoList";
import NewInvitation from "../components/Invitation/NewInvitation";
import InvitationResult from "../components/Invitation/InvitationResult";
import Selection from "../components/map/SelectionButton";
import PhotoEditor from "../components/PhotoEditor";

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
          <Route
            path="/my-travels/new-map"
            element={
              <Modal size="small">
                <NewMap />
              </Modal>
            }
          />
          <Route
            path="/my-travels/:id/*"
            element={
              <>
                <MapDetail />
                <Outlet />
              </>
            }
          >
            <Route
              path="photos"
              element={
                <Modal size="big">
                  <PhotoList />
                </Modal>
              }
            />
            <Route
              path="options"
              element={
                <Modal size="big" column={false}>
                  <Selection>수정</Selection>
                  <Selection>업로드</Selection>
                </Modal>
              }
            />
            <Route
              path="options/new-photo"
              element={<Modal size="big">사진업로드 페이지</Modal>}
            />
            <Route
              path="invitation"
              element={
                <Modal size="small">
                  <NewInvitation />
                </Modal>
              }
            />
            <Route path="invitation/:token" element={<InvitationResult />} />
          </Route>
          <Route
            path="/my-travels/:id/options/photo-editor"
            element={<PhotoEditor />}
          />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
};

export default App;
