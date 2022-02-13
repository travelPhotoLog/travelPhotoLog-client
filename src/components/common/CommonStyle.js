import styled from "styled-components";

const StyledButton = styled.button`
  display: inline-flex;
  padding: ${({ theme }) => theme.spacing.xl};
  margin-left: ${({ theme }) => theme.spacing.xl};
  margin-right: ${({ theme }) => theme.spacing.xl};
  width: 8rem;
  outline: none;
  border: none;
  border-radius: 4px;
  color: black;
  background-color: white;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: bold;
  cursor: pointer;
`;

const Input = styled.input`
  ${({ theme }) => theme.container.flexCenter};
  width: 100%;
  height: 15%;
  padding: ${({ theme }) => theme.spacing.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  border: 1px solid gray;
  border-radius: 15px;
  text-align: center;
`;

export { Input, StyledButton };
