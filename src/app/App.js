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
import Board from "../components/board/Board";
import PhotoList from "../components/photo/PhotoList";
import NewInvitation from "../components/Invitation/NewInvitation";
import InvitationResult from "../components/Invitation/InvitationResult";
import Options from "../components/map/Options";
import PhotoEditor from "../components/photo/PhotoEditor";
import PhotoUploader from "../components/photo/PhotoUploader";
import PhotoDetail from "../components/photo/PhotoDetail";

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
          <Route path="/my-travels/new-map" element={<NewMap />} />
          <Route
            path="/my-travels/:id/*"
            element={
              <>
                <MapDetail />
                <Outlet />
              </>
            }
          >
            <Route path=":id" element={<PhotoDetail />} />
            <Route path="photos" element={<PhotoList />} />
            <Route path="options" element={<Options />} />
            <Route path="options/new-photo" element={<PhotoUploader />} />
            <Route path="options/photo-editor" element={<PhotoEditor />} />
            <Route path="invitation" element={<NewInvitation />} />
            <Route path="invitation/:token" element={<InvitationResult />} />
          </Route>
          <Route
            path="/my-travels/:id/options/photo-editor"
            element={<PhotoEditor />}
          />
          <Route path="/board" element={<Board />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
};

export default App;
