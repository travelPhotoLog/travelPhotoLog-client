import React, { useEffect } from "react";
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
import PostingEditor from "../components/board/PostingEditor";
import InvitationResult from "../components/Invitation/InvitationResult";
import Options from "../components/map/Options";
import PhotoEditor from "../components/photo/PhotoEditor";
import PhotoUploader from "../components/photo/PhotoUploader";
import PhotoDetail from "../components/photo/PhotoDetail";
import UserMapList from "../components/board/UserMapList";
import MyPostingList from "../components/board/MyPostingList";
import PostingDetail from "../components/board/PostingDetail";
import PostingPhotoList from "../components/board/PostingPhotoList";
import { socket, SocketContext } from "../socket";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
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
            path="/my-travels/:id/invitation/:token"
            element={<InvitationResult />}
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
            <Route path=":id" element={<PhotoDetail />} />
            <Route path="photos" element={<PhotoList />} />
            <Route path="options" element={<Options />} />
            <Route path="options/new-photo" element={<PhotoUploader />} />
            <Route path="options/photo-editor" element={<PhotoEditor />} />
            <Route path="invitation" element={<NewInvitation />} />
          </Route>
          <Route
            path="/my-travels/:id/options/photo-editor"
            element={<PhotoEditor />}
          />
          <Route
            path="board/new-posting/*"
            element={
              <>
                <PostingEditor />
                <Outlet />
              </>
            }
          >
            <Route
              path=":id/*"
              element={
                <>
                  <UserMapList />
                  <Outlet />
                </>
              }
            >
              <Route path=":id" element={<PostingPhotoList />} />
            </Route>
          </Route>
          <Route path="/board" element={<Board />} />
          <Route path="/board/:nickname" element={<MyPostingList />} />
          <Route path="/board/posting/:id" element={<PostingDetail />} />
          <Route path="/board/write/:id" element={<PostingEditor />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </SocketContext.Provider>
  );
};

export default App;
