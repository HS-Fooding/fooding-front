import styled from "styled-components";
import GlobalStyle from "../GlobalStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: white;
  color: black;
  padding: 5px 15px;
  font-size: 15px;
  border: 1px solid ${(props) => props.theme.borderGrayColor};
  position: absolute;
  top: 0;
  font-weight: bold;
  z-index:3;
  .icon {
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.manColor};
    }
    color: ${(props) => props.theme.mainColor};
  }
`;

const Header = ({ title, back }) => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Link to={back}>
          <FontAwesomeIcon icon={faAngleLeft} className="icon" size="lg" />
        </Link>
        <span>{title}</span>
        <div></div>
      </Container>
    </>
  );
};

export default Header;
