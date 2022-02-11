import React, { useEffect, useState } from "react";
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import styled,{createGlobalStyle} from "styled-components";
const body = createGlobalStyle`
  body {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Container = styled.div`
  width: 350px;
  height: 600px;
  border: 1px solid black;
`;
const Home = () => {
  return (
    <Container>
      <Link to={"/review"}>
        <button>리뷰</button>
      </Link>
    </Container>
  );
};

export default Home;
