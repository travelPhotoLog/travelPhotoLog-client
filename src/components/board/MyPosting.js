import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled, { ThemeProvider } from "styled-components";
import dayjs from "dayjs";

import theme from "../../styles/theme";

const Posting = ({ postingInfo }) => {
  const navigate = useNavigate();

  const { _id, title, createdAt, createdBy } = postingInfo;
  const date = dayjs(createdAt).format("YY/MM/DD");
  const defaultImage =
    "https://t1.daumcdn.net/cfile/tistory/99D77C485C6A8D042C";

  const handlePostClick = () => {
    navigate(`/board/${_id}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container onClick={handlePostClick}>
        <Img src={defaultImage} />
        <Title>{title}</Title>
        <Date>{date}</Date>
        <Creator>{createdBy}</Creator>
      </Container>
    </ThemeProvider>
  );
};

export default Posting;

const Container = styled.div`
  ${({ theme }) => theme.container.flexCenterColumn};
  width: 15vw;
  height: 30vh;
  margin: ${({ theme }) => theme.spacing.xxxl};
  padding: ${({ theme }) => theme.spacing.base};
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  text-align: center;
  cursor: pointer;
`;

const Img = styled.img`
  width: 80%;
  height: 55%;
`;

const Title = styled.div`
  width: 80%;
  height: 10%;
  margin: ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
`;

const Date = styled.div`
  width: 80%;
  height: 8%;
  margin: ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 500;
  text-align: right;
`;

const Creator = styled.div`
  width: 80%;
  height: 8%;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 500;
  text-align: right;
`;

Posting.propTypes = {
  postingInfo: {
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
    hashtags: PropTypes.array.isRequired,
    logOption: PropTypes.bool.isRequired,
    regions: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }.isRequired,
};
