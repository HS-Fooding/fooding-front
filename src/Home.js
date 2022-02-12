import React, { useEffect, useState } from "react";
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import GlobalStyle from "./GlobalStyle";

const Container = styled.div``;
const Button = styled.button`
  border:none;
  background-color:${(props) => props.theme.mainColor};
  width:100%;
  &:hover{
    cursor:pointer;
  }
`;
const Home = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Link to={"/review"}>
          <Button>리뷰버튼</Button>
        </Link>
      </Container>
    </>
  );
};

export default Home;
