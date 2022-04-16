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
const Container = styled.div``;
const Button = styled.button`
  margin-top: 10px;
  border: none;
  background-color: ${(props) => props.theme.mainColor};
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`;
const token = localStorage.getItem("token");

const Home = () => {
  let navigate = useNavigate();
  let [isToken, setIsToken] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("render");
    if (token == undefined) {
      console.log("istoken false");
      setIsToken(false);
    } else {
      console.log("istoken true");
      setIsToken(true);
    }
  }, []);
  const logoutFun = () => {
    localStorage.clear();
    setIsToken(false);
  };

  return (
    <>
      <GlobalStyle />

      <Container>
        {token == null ? navigate("/login") : null}
        <Link to={"/review"}>
          <Button>리뷰</Button>
        </Link>
        {isToken == false ? (
          <Link to={"/login"}>
            <Button>로그인하기</Button>
          </Link>
        ) : (
          <Button onClick={logoutFun}>로그아웃하기</Button>
        )}
        <Link to={"/sign"}>
          <Button>회원가입 </Button>
        </Link>
      </Container>
    </>
  );
};

export default Home;
