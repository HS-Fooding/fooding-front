import React from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home.js";
import Review from "./component/Review.js";
import WriteReview from "./component/WriteReview.js";
import SignUp from "./component/SignUp.js";
import Login from "./component/Login.js";
import styled, { ThemeProvider } from "styled-components";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/review" element={<Review />}></Route>
          <Route path="/writeReview" element={<WriteReview />}></Route>
          <Route path="/sign" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
