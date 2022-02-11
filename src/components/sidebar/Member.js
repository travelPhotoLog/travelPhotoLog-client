import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Member = ({ member }) => {
  const { nickname, profileUrl } = member;

  return (
    <List key={nickname}>
      <Img src={profileUrl} alt={nickname} />
      <Nickname>{nickname}</Nickname>
    </List>
  );
};

export default Member;

const List = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  z-index: 999;
  width: 100%;
  height: 10%;
  padding: ${({ theme }) => theme.spacing.small};
`;

const Img = styled.img`
  height: 85%;
  border-radius: 50%;
`;

const Nickname = styled.div`
  margin-left: ${({ theme }) => theme.spacing.xl};
  color: #060b26;
  font-size: large;
  font-weight: 700;
  line-height: 100%;
`;

Member.propTypes = {
  member: PropTypes.shape({
    profileUrl: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
  }).isRequired,
};
