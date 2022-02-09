import React, { useState } from "react";
import styled from "styled-components";

const Sidebar = () => {
  const [xPosition, setX] = useState(-300);

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
    } else {
      setX(-300);
    }
  };

  return (
    <Container width={xPosition}>
      <ToggleButton onClick={() => toggleMenu()} width={300} />
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  width: 300px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  border-radius: 0;
  background-color: #cedae9;
  opacity: 0.5;
  transform: translatex(${props => props.width}px);
  transition: 0.8s ease;
`;

const ToggleButton = styled.button`
  height: 70px;
  border-top-right-radius: 10rem;
  border-bottom-right-radius: 9rem;
  width: 15px;
  position: absolute;
  z-index: 1;
  background-color: #a4aeba;
  transform: translate(300px, 10vh);
`;
