import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import queryString from "query-string";
import axios from "axios";

import theme from "../../styles/theme";
import { ERROR_MESSAGE } from "../../constants";
import { Input, StyledButton } from "../common/CommonStyle";
import ResponseMessage from "../common/ResponseMessage";
import Modal from "../common/Modal";

const PhotoUploader = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { nickname } = useSelector(state => state.user.user);
  const [formInputs, setFormInputs] = useState({
    file: "",
    description: "",
    date: "",
  });

  const { id: mapId } = params;
  const {
    latitude,
    longitude,
    placename: placeName,
  } = queryString.parse(location.search);

  const handleInputChange = event => {
    if (event.target.name === "file") {
      setFormInputs({
        ...formInputs,
        file: event.target.files[0],
      });

      return;
    }

    setFormInputs({
      ...formInputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    const photo = {
      date: formInputs.date,
      createdBy: nickname,
      description: formInputs.description,
    };

    const point = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      placeName,
    };

    const formData = new FormData();

    formData.append("image", formInputs.file);
    formData.append("photo", JSON.stringify(photo));
    formData.append("point", JSON.stringify(point));
    formData.append("map", mapId);

    const { data } = await axios.post("/photo/new", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (data.result === "ok") {
      navigate(`/my-travels/${mapId}`);
      return;
    }

    if (data.error) {
      return <ResponseMessage message={ERROR_MESSAGE.SERVER_UNSTABLE} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal size="big">
        <Container>
          <Form onSubmit={handleFormSubmit}>
            <FileInput type="file" name="file" onChange={handleInputChange} />
            <DescriptionInput
              type="text"
              name="description"
              value={formInputs.description}
              placeholder="description"
              onChange={handleInputChange}
            />
            <DateInput
              type="date"
              name="date"
              value={formInputs.date}
              placeholder="date"
              onChange={handleInputChange}
            />
            <UploadButton type="submit">UPLOAD</UploadButton>
          </Form>
        </Container>
      </Modal>
    </ThemeProvider>
  );
};

export default PhotoUploader;

const Container = styled.div`
  ${({ theme }) => theme.container.flexCenterColumn};
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.xxxl};
`;

const Form = styled.form`
  ${({ theme }) => theme.container.flexCenterColumn};
  width: 80%;
  height: 60%;
`;

const FileInput = styled(Input)``;
const DateInput = styled(Input)``;

const DescriptionInput = styled(Input)`
  height: 50%;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const UploadButton = styled(StyledButton)`
  width: 9vw;
  background-color: green;
  color: white;
  text-align: center;
`;
