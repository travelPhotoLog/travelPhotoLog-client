import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Modal from "../common/Modal";

const Options = () => {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();

  const navigatePage = destination => {
    const path = destination === "수정" ? "photo-editor" : "new-photo";
    const url = pathname.concat(`/${path}${search}`);

    navigate(url);
  };

  return (
    <Modal size="big">
      <Container>
        <Option onClick={event => navigatePage(event.currentTarget.value)}>
          수정
        </Option>
        <Option onClick={event => navigatePage(event.currentTarget.value)}>
          업로드
        </Option>
      </Container>
    </Modal>
  );
};

export default Options;

const Container = styled.div`
  ${({ theme }) => theme.container.flexSpaceAround};
  width: 70%;
  height: 100%;
`;

const Option = styled.button`
  ${({ theme }) => theme.container.flexCenter};
  width: 25%;
  height: 25%;
  padding: ${({ theme }) => theme.spacing.xxl};
  border: none;
  border-radius: 20px;
  color: white;
  background-color: lightgreen;
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  font-weight: bold;
  cursor: pointer;
`;
