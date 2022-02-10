import React, { useState } from "react";
import { useQuery } from "react-query";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import MarkerClusterer from "@google/markerclustererplus";
import styled, { ThemeProvider } from "styled-components";
import axios from "axios";

import ErrorPage from "../error/ErrorPage";
import Modal from "../common/Modal";
import theme from "../../styles/theme";

const MapDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [googleMapRef, setGoogleMapRef] = useState({ map: null, api: null });

  const { REACT_APP_GOOGLE_API_KEY } = process.env;
  const id = location.pathname.split("/")[2];
  const defaultProps = {
    center: { lat: 37.508105, lng: 127.061341 },
    zoom: 12,
  };

  const handleApiLoaded = (map, api) => {
    setGoogleMapRef({ map, api });
  };

  const handleMarkerClick = ({ latitude, longitude, placename }) => {
    navigate(
      `point?latitude=${latitude}&longitude=${longitude}&placename=${placename}`
    );
  };

  const getLatestPoint = array => {
    const { latitude: lat, longitude: lng } = array[array.length - 1];

    return { lat, lng };
  };

  const getPoints = id => {
    return axios.get(`/map/${id}/points`);
  };

  const onSuccess = data => {
    if (data.mapPoints) {
      const markers = data.mapPoints.map(point => {
        const marker = new googleMapRef.api.Marker({
          position: {
            lat: point.latitude,
            lng: point.longitude,
          },
          map: googleMapRef.map,
        });

        marker.addListener("click", () => {
          handleMarkerClick(point);
        });

        return marker;
      });

      const cluster = new MarkerClusterer(googleMapRef.map, markers, {
        imagePath:
          "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
      });
    }
  };

  const { isLoading, isError, error, data } = useQuery(
    "points",
    () => getPoints(id),
    {
      onSuccess,
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
              data?.mapPoints
                ? getLatestPoint(data.mapPoints)
                : defaultProps.center
            }
            defaultZoom={defaultProps.zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          />
        </GoogleMapContainer>
      </Container>
      useSuperCluster
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
