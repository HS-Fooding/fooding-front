import styled from "styled-components";
import GlobalStyle from "../GlobalStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: ${(props) => props.theme.mainColor};
  color: white;
  padding: 5px 15px;
  font-size: 15px;
  /* border-bottom: 1px solid ${(props) => props.theme.borderGrayColor}; */
  position: absolute;
  top: 0;

  .icon {
    cursor: pointer;
  }
`;

const Header = ({ title }) => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <FontAwesomeIcon icon={faAngleLeft} className="icon" size="lg" />
        <span>{title}</span>
        <div></div>
      </Container>
    </>
  );
};

export default Header;
