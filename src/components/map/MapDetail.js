import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import MarkerClusterer from "@google/markerclustererplus";
import styled, { ThemeProvider } from "styled-components";

import axios from "../../api/axiosInstance";
import { socket } from "../../socket";
import theme from "../../styles/theme";
import { ERROR_MESSAGE, RESPONSE_MESSAGE } from "../../constants";
import ResponseMessage from "../common/ResponseMessage";
import Sidebar from "../sidebar/Sidebar";
import SearchBox from "./SearchBox";

const MapDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [googleMapRef, setGoogleMapRef] = useState({ map: null, api: null });
  const [mapPoints, setMapPoints] = useState([]);

  const { REACT_APP_GOOGLE_API_KEY } = process.env;
  const pointId = location.pathname.split("/")[2];
  const defaultProps = {
    center: { lat: 37.508105, lng: 127.061341 },
    zoom: 14,
  };

  useEffect(() => {
    socket.emit("join", id);

    return () => {
      socket.emit("leave", id);
    };
  }, []);

  const handleApiLoaded = (map, api) => {
    setGoogleMapRef({ map, api });
  };

  const handleMarkerClick = ({ latitude, longitude, placeName }) => {
    navigate(
      `photos?latitude=${latitude}&longitude=${longitude}&placename=${placeName}`
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
    if (data.mapPoints && googleMapRef.map) {
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

      const currentMapPoints = data.mapPoints.map(
        point => `${point.latitude.toString()}%${point.longitude.toString()}`
      );

      setMapPoints(currentMapPoints);
    }
  };

  const { isError, error, data, refetch } = useQuery(
    "points",
    () => getPoints(pointId),
    {
      onSuccess,
      select: response => response.data,
    }
  );

  socket.on("uploadSuccess", () => {
    refetch();
  });

  if (data?.error) {
    if (data.error.code === 400) {
      return <ResponseMessage message={ERROR_MESSAGE.BAD_REQUEST} />;
    }

    if (data.error.code === 401) {
      return <ResponseMessage message={ERROR_MESSAGE.UNAUTHORIZED} />;
    }

    if (data.error.code === 403) {
      return <ResponseMessage message={ERROR_MESSAGE.FORBIDDEN} />;
    }

    if (data.error.code === 500) {
      return <ResponseMessage message={ERROR_MESSAGE.SERVER_UNSTABLE} />;
    }
  }

  if (isError) {
    return <ResponseMessage message={error.message} />;
  }

  if (data?.message) {
    if (data.message) {
      return <ResponseMessage message={RESPONSE_MESSAGE.RELOGIN_REQUIRED} />;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Sidebar />
      <Container>
        <SearchBoxContainer>
          <SearchBox />
        </SearchBoxContainer>
        <GoogleMapContainer>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: REACT_APP_GOOGLE_API_KEY,
              libraries: ["places"],
            }}
            defaultCenter={
              data?.mapPoints.length
                ? getLatestPoint(data.mapPoints)
                : defaultProps.center
            }
            defaultZoom={defaultProps.zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          />
        </GoogleMapContainer>
      </Container>
    </ThemeProvider>
  );
};

export default MapDetail;

const Container = styled.div`
  ${({ theme }) => theme.container.flexEnd};
  position: relative;
  width: 100vw;
  height: 90vh;
  background-color: transparent;
`;

const GoogleMapContainer = styled.div`
  width: 70%;
  height: 100%;
`;

const SearchBoxContainer = styled.div`
  width: 28%;
  height: 100%;
`;
