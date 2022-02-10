import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Member = ({ member }) => {
  const { nickname, profileUrl } = member;
  const basicImg =
    "https://travelphotolog.s3.ap-northeast-2.amazonaws.com/travel.png";

  return (
    <List key={nickname}>
      <Img src={profileUrl || basicImg} alt={nickname} />
      <Nickname>{nickname}</Nickname>
    </List>
  );
};

const List = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 10%;
  padding: ${({ theme }) => theme.spacing.small};
`;

const Img = styled.img`
  height: 100%;
  border-radius: 50%;
`;

const Nickname = styled.div`
  margin-left: ${({ theme }) => theme.spacing.xl};
  color: #060b26;
  font-size: large;
  font-weight: 700;
  line-height: 100%;
`;

export default Member;

Member.propTypes = {
  member: PropTypes.shape({
    profileUrl: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
  }).isRequired,
};
