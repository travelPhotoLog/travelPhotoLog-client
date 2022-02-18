import React from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { FcPlus } from "react-icons/fc";
import styled, { ThemeProvider } from "styled-components";

import axios from "../../api/axiosInstance";
import theme from "../../styles/theme";
import Member from "./Member";

const getMembers = id => {
  return axios.get(`/map/${id}/members`);
};

const MemberList = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery("members", () => getMembers(id), {
    select: response => response.data,
  });

  const memberList = data?.members;

  if (isLoading) {
    return <div />;
  }

  const handlePlusClick = () => {
    navigate("invitation");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {memberList?.map(member => (
          <Member key={Math.random(100 * 20)} member={member} />
        ))}
        <Icon size="30" onClick={handlePlusClick} />
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.div`
  ${({ theme }) => theme.container.flexStartColumn};
  align-items: center;
  z-index: 999;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.base};
  background-color: #cedae9;
  overflow-y: scroll;
`;

const Icon = styled(FcPlus)`
  &:hover {
    cursor: pointer;
  }
`;

export default MemberList;
