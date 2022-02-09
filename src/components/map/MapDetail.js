import React from "react";
import { useQuery } from "react-query";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import styled, { ThemeProvider } from "styled-components";
import axios from "axios";

import ErrorPage from "../error/ErrorPage";
import Marker from "./Marker";
import theme from "../../styles/theme";
import Modal from "../common/Modal";

const getLatestPoint = array => {
  const { latitude: lat, longitude: lng } = array[array.length - 1];

  return { lat, lng };
};

const defaultProps = {
  center: { lat: 37.508105, lng: 127.061341 },
  zoom: 12,
};

const getPoints = id => {
  return axios.get(`/map/${id}/points`);
};

const MapDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const id = location.pathname.split("/")[2];
  const { REACT_APP_GOOGLE_API_KEY } = process.env;

  const handleMarkerClick = point => {
    navigate(
      `point?latitude=${point.latitude}&longitude=${point.longitude}&placename=${point.placename}`
    );
  };

  const { isLoading, isError, error, data } = useQuery(
    "points",
    () => getPoints(id),
    {
      select: data => data.data,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isError ? (
    <ErrorPage message={error.message} />
  ) : (
    <ThemeProvider theme={theme}>
      <Container>
        <SearchBoxContainer>SearchBox가 들어가는 곳 입니다.</SearchBoxContainer>
        <GoogleMapContainer>
          <GoogleMapReact
            bootstrapURLKeys={{ key: REACT_APP_GOOGLE_API_KEY }}
            defaultCenter={
              data ? getLatestPoint(data.mapPoints) : defaultProps.center
            }
            defaultZoom={defaultProps.zoom}
          >
            {data?.mapPoints.map(point => {
              return (
                <Marker
                  key={point._id}
                  id={point._id}
                  lat={point.latitude}
                  lng={point.longitude}
                  count={point.photos.length}
                  onClick={handleMarkerClick}
                />
              );
            })}
          </GoogleMapReact>
        </GoogleMapContainer>
      </Container>

      <Routes>
        <Route
          path="point"
          element={<Modal>포토를 가져와서 보여주는 모달입니다.</Modal>}
        />
      </Routes>
    </ThemeProvider>
  );
};

export default MapDetail;

const Container = styled.div`
  ${({ theme }) => theme.container.flexEnd};
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
`;

const GoogleMapContainer = styled.div`
  width: 70%;
  height: 100%;
`;

const SearchBoxContainer = styled.div`
  width: 30%;
  height: 100%;
`;
