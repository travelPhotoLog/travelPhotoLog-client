import React, { useState } from "react";
import styled from "styled-components";

import MemberList from "./MemberList";

const Sidebar = () => {
  const [xPosition, setX] = useState(-300);

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
      return;
    }

    setX(-300);
  };

  return (
    <Container width={xPosition}>
      <ToggleButton onClick={() => toggleMenu()} width={300} />
      <MemberList />
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  ${({ theme }) => theme.container.flexStartColumn}
  width: 300px;
  height: 84vh;
  border-radius: 0;
  background-color: rgba(206, 218, 233, 0.5);
  transform: translatex(${props => props.width}px);
  transition: 0.8s ease;
`;

const ToggleButton = styled.button`
  position: absolute;
  z-index: 1;
  width: 15px;
  height: 70px;
  border-top-right-radius: 10rem;
  border-bottom-right-radius: 9rem;
  background-color: #a4aeba;
  transform: translate(300px, 10vh);
`;
