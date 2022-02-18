import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import queryString from "query-string";
import axios from "axios";

import { socket } from "../../socket";
import theme from "../../styles/theme";
import { ERROR_MESSAGE } from "../../constants";
import { Input, StyledButton } from "../common/CommonStyle";
import ResponseMessage from "../common/ResponseMessage";
import Modal from "../common/Modal";

const PhotoUploader = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { nickname } = useSelector(state => state.user.user);
  const [isUpload, setIsUpload] = useState(false);
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

  useEffect(() => {
    if (isUpload) {
      socket.emit("uploadSuccess", mapId);
    }
  }, [isUpload]);

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

    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URI}/photo/new`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (data.result === "ok") {
      setIsUpload(true);
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
              placeholder="사진에 대한 설명을 간략하게 남겨주세요 📷"
              onChange={handleInputChange}
            />
            <DateLabel>위 사진을 어느 날의 기억으로 남기고 싶나요?</DateLabel>
            <DateInput
              type="date"
              name="date"
              value={formInputs.date}
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

const DateLabel = styled.div`
  ${({ theme }) => theme.container.flexCenter};
  width: 80%;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  color: gray;
`;
const UploadButton = styled(StyledButton)`
  ${({ theme }) => theme.container.flexCenter};
  width: 80%;
  background-color: green;
  color: white;
  text-align: center;
`;
