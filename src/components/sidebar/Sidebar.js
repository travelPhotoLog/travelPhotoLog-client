import React, { useState } from "react";
import styled from "styled-components";

import MemberList from "./MemberList";

const Sidebar = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggleClick = () => {
    const $body = document.body;

    if (isToggled) {
      setIsToggled(false);
      $body.style.overflow = "unset";

      return;
    }

    setIsToggled(true);
    $body.style.overflow = "hidden";
  };

  return (
    <Container className={isToggled ? "show" : "hide"}>
      <Outside
        className={isToggled ? "show" : "hide"}
        onClick={handleToggleClick}
      />
      <ToggleButton onClick={handleToggleClick} width={300} />
      <MemberList />
    </Container>
  );
};

export default Sidebar;

const Outside = styled.main`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  &.hide {
    display: none;
  }
  &.show {
    display: block;
  }
`;

const Container = styled.div`
  ${({ theme }) => theme.container.flexStartColumn}
  position: fixed;
  z-index: 999;
  width: 300px;
  height: 54.4rem;
  transform: translatex(${props => props.width}px);
  transition: 0.8s ease;
  &.hide {
    left: -300px;
  }
  &.show {
    left: 0px;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  width: 15px;
  height: 70px;
  border-top-right-radius: 10rem;
  border-bottom-right-radius: 10rem;
  background-color: #a4aeba;
  transform: translate(300px, 10vh);
  &:hover {
    cursor: pointer;
  }
`;
