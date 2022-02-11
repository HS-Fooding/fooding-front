import logo from "./logo.svg";
import React from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home.js";
import Review from "./component/Review.js";
import WriteReview from "./component/WriteReview.js";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/review" element={<Review />}></Route>
        <Route path="/writeReview" element={<WriteReview />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
