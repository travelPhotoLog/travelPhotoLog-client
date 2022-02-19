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
        <Option onClick={event => navigatePage(event.target.innerText)}>
          수정
        </Option>
        <Option onClick={event => navigatePage(event.target.innerText)}>
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
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  color: #5a6151;
  background-color: #f5f1e1;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #5a6151;
    color: #f5f1e1;
  }
`;
