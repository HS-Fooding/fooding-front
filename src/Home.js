import React, { useEffect, useState } from "react";
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import GlobalStyle from "./GlobalStyle";

const Container = styled.div``;

const Home = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Link to={"/review"}>
          <button>리뷰버튼</button>
        </Link>
      </Container>
    </>
  );
};

export default Home;
