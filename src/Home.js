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

        <Link to={"/manager/register"}>
          <Button>관리자</Button>
        </Link>

        {isToken == false ? (
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
