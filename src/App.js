import React from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home.js";
import Review from "./guest/router/Review.js";
import WriteReview from "./guest/router/WriteReview.js";
import SignUp from "./guest/router/SignUp.js";
import Login from "./guest/router/Login.js";
import styled, { ThemeProvider } from "styled-components";
import theme from "./theme";
import ReviewDetail from "./guest/router/ReviewDetail";
import Register from "./manage/Register";
import Reservation from "./manage/Reservation";
import LoginMg from "./manage/LoginMg";
import SignUpMg from "./manage/SignUpMg";
import MyCanvas from "./manage/MyCanvas";
import maincanvas from "./manage/maincanvas";
import RestaurantList from "./guest/router/RestaurantList";
import Reservation1 from "./guest/router/Reservation1";

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
          <Route path="/:reviewId" element={<ReviewDetail />}></Route>
          <Route path="/reservation" element={<Reservation />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/manager/login" element={<LoginMg />}></Route>

          <Route path="/manager/signup" element={<SignUpMg />}></Route>
          <Route path="/canvas" element={<MyCanvas />}></Route>
          <Route path="/guest/restaurantList" element={<RestaurantList />}></Route>
          <Route path="/guest/reservation1" element={<Reservation1 />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
