import styled from "styled-components";
import GlobalStyle from "../GlobalStyle";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  background-color: ${(props) => props.theme.mainColor};
  color: white;
  padding: 5px;
  font-size: 12px;
  /* border-bottom: 1px solid ${(props) => props.theme.borderGrayColor}; */
  position: absolute;
  top: 0;
`;

const Header = ({ title }) => {
  return (
    <>
      <GlobalStyle />
      <Container>{title}</Container>
    </>
  );
};

export default Header;
