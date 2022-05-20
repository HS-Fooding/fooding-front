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
// import Reservation from "./manage/Reservation";
import LoginMg from "./manage/LoginMg";
import SignUpMg from "./manage/SignUpMg";
import MyCanvas from "./manage/MyCanvas";
import ManageReserv from "./manage/ManageReserv";
// import TestManageReserv2 from "./manage/ManageReserv2";
import Chart from "./manage/Chart";
import UserData from "./manage/UserData";
import CurrentTableState from "./manage/CurrentTableState";

import maincanvas from "./manage/maincanvas";
import RestaurantList from "./guest/router/RestaurantList";
import Reservation1 from "./guest/router/Reservation1";
import Reservation2 from "./guest/router/Reservation2";
import MarketDetail from "./guest/router/MarketDetail";
import RestaurantSearch from "./guest/router/RestaurantSearch";
import RestaurantInput from "./guest/component/RestaurantInput";

import MyPageHome from "./guest/router/MyPageHome";
import ReservList from "./guest/router/ReservList";
import FavorList from "./guest/router/FavorList";

import Location from "./guest/router/Location";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/guest/review/:marketId" element={<Review />}></Route>
          <Route path="/writeReview" element={<WriteReview />}></Route>
          <Route path="/guest/sign" element={<SignUp />}></Route>
          <Route path="/guest/login" element={<Login />}></Route>
          <Route
            path="/review/:marketId/:reviewId"
            element={<ReviewDetail />}
          ></Route>

          <Route path="/manager/login" element={<LoginMg />}></Route>
          <Route path="/manager/signup" element={<SignUpMg />}></Route>
          {/* <Route path="/manager/signup" element={<SignUpMg />}></Route> */}

          <Route path="/manager/register" element={<Register />}></Route>
          <Route
            path="/manager/manageReserv"
            element={<ManageReserv />}
          ></Route>
          <Route path="/manager/chart" element={<Chart />}></Route>

          <Route path="/manager/userData" element={<UserData />}></Route>
          <Route
            path="/manager/currentTableState"
            element={<CurrentTableState />}
          ></Route>
          <Route path="/guest/location" element={<Location />}></Route>

          <Route
            path="/guest/restaurantList"
            element={<RestaurantList />}
          ></Route>
          <Route
            path="/guest/restaurantSearch"
            element={<RestaurantSearch />}
          ></Route>
          <Route path="/guest/reservation1" element={<Reservation1 />}></Route>
          <Route path="/guest/reservation2" element={<Reservation2 />}></Route>
          <Route path="/guest/:marketId" element={<MarketDetail />}></Route>
          <Route path="/guest/myPage" element={<MyPageHome />}></Route>
          <Route
            path="/guest/myPage/reservList"
            element={<ReservList />}
          ></Route>
          <Route
            path="/guest/myPage/favorList"
            element={<FavorList />}
          ></Route>
          path="/guest/myPage/favorList"
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
