import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import GlobalStyle from "./GlobalStyle";
import { url } from "./Api";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Button = styled.button`
  border: none;
  background-color: ${(props) => props.theme.mainColor};

  margin: 20px;
  &:hover {
    cursor: pointer;
  }
  width: 200px;
  height: 160px;
`;

const Home = () => {
  let navigate = useNavigate();
  let [isManagerToken, setIsManagerToken] = useState(false);
  let [isGuestToken, setIsGuestToken] = useState(false);

  useEffect(() => {
    const managerToken = localStorage.getItem("managerToken");
    const guestToken = localStorage.getItem("guestToken");

    console.log("render");
    if (managerToken == undefined) {
      console.log("istoken false");
      setIsManagerToken(false);
    } else {
      console.log("istoken true");
      setIsManagerToken(true);
    }

    if (guestToken == undefined) {
      console.log("istoken false");
      setIsGuestToken(false);
    } else {
      console.log("istoken true");
      setIsGuestToken(true);
    }
  }, []);

  return (
    <>
      <GlobalStyle />

      <Container>
        {/* {token == null ? navigate("/login") : null}
        <Link to={"/review"}>
          <Button>리뷰</Button>
        </Link>
        {isToken == false ? (
        
        ) : (
          <Button onClick={logoutFun}>로그아웃하기</Button>
        )}
        <Link to={"/guest/sign"}>
          <Button>회원가입 </Button>
        </Link> */}
        {isManagerToken == false ? (
          <Link to={"/manager/login"}>
            <Button>관리자</Button>
          </Link>
        ) : (
          <Link to={"/manager/register"}>
            <Button>관리자</Button>
          </Link>
        )}

        {isGuestToken == false ? (
          <Link to={"/guest/login"}>
            <Button>손님</Button>
          </Link>
        ) : (
          <Link to={"/guest/restaurantList"}>
            <Button>손님</Button>
          </Link>
        )}
      </Container>
    </>
  );
};

export default Home;
