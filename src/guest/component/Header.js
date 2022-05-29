import styled from "styled-components";
import GlobalStyle from "../../../src/GlobalStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  /* position: absolute; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 410px;
  height: 60px;
  background-color: white;
  color: black;
  padding: 5px 15px;
  font-size: 15px;
  border: 1px solid ${(props) => props.theme.borderGrayColor};
  /* /* position: absolute; */
  position: fixed;
  top: 0;
  font-weight: bold;
  z-index: 3;
  .icon {
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.mainColor};
    }
    color: ${(props) => props.theme.mainColor};
  }
`;

const Header = ({ title, back, marketId }) => {
  let navigate = useNavigate();

  return (
    <>
      <GlobalStyle />
      <Container>
        <FontAwesomeIcon
          onClick={() => {
            navigate(-1);
          }}
          icon={faAngleLeft}
          className="icon"
          size="lg"
        />

        <span>{title}</span>
        <div></div>
      </Container>
    </>
  );
};

export default Header;
