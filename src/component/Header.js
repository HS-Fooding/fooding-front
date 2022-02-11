import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  background-color: gray;
`;

const Header = ({ title }) => {
  return <Container>{title}</Container>;
};

export default Header;
