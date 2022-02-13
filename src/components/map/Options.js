import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Modal from "../common/Modal";

const Option = ({ children: option }) => {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();

  const navigatePage = destination => {
    const path = destination === "수정" ? "photo-editor" : "new-photo";

    const url = pathname.concat(`/${path}${search}`);
    navigate(url);
  };

  return (
    <OptionButton onClick={() => navigatePage(option)}>{option}</OptionButton>
  );
};

const Options = () => {
  return (
    <Modal size="big">
      <Container>
        <Option>수정</Option>
        <Option>업로드</Option>
      </Container>
    </Modal>
  );
};

export default Options;

const Container = styled.div`
  ${({ theme }) => theme.container.flexSpaceAround};
  width: 100%;
  height: 100%;
`;

const OptionButton = styled.button`
  ${({ theme }) => theme.container.flexCenter};
  width: 30%;
  height: 25%;
  padding: ${({ theme }) => theme.spacing.xxl};
  outline: none;
  border: none;
  border-radius: 20px;
  color: white;
  background-color: lightgreen;
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  font-weight: bold;
  cursor: pointer;
`;
