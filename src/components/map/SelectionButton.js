import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Selection = ({ children: option }) => {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();

  const navigatePage = destination => {
    const path = destination === "수정" ? "photo-editor" : "new-photo";

    const url = pathname.concat(`/${path}${search}`);
    navigate(url);
  };

  return (
    <SelectionButton onClick={() => navigatePage(option)}>
      {option}
    </SelectionButton>
  );
};

export default Selection;

const SelectionButton = styled.button`
  ${({ theme }) => theme.container.flexCenter};
  width: 30%;
  height: 25%;
  padding: ${({ theme }) => theme.spacing.xxl};
  outline: none;
  border: none;
  border-radius: 20px;
  color: white;
  background-color: navy;
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  font-weight: bold;
  cursor: pointer;
`;
