import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Header from "../component/Header";
import { useNavigate, Link } from "react-router-dom";

import { url } from "../../Api";
// src\Api.js
//src\guest\component\Login.js
import { motion, AnimatePresence } from "framer-motion";
// border: 1px solid black;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil } from "@fortawesome/free-solid-svg-icons";
import RestaurantHeader from "./RestaurantHeader";
const Container = styled.div`
  width: 190px;
  height: 260px;
  /* background-color:orange; */
  /* border:1px solid black; */
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BestMenuContainer = styled.div`
  width: 190px;
  height: 180px;
  /* background-color:blue; */
`;
const NameNStarsContainer = styled.div`
  width: 184px;
  height: 21px;
  display: flex;
  margin-top: 8px;

  /* background-color:pink; */
  justify-content: space-between;
  .NameOfRestaurant {
    font-size: 16px;
    font-weight: bold;
  }
  .Stars {
    font-size: 18px;
    color: orange;
    font-weight: bold;
  }
`;
const Category = styled.div`
  width: 184px;
  font-size: 12px;
  height: 18px;
  color: gray;
  margin-top: 5px;
`;
const NumOfViewsNReviews = styled.div`
  width: 184px;
  height: 20px;
  display: flex;
  font-size: 12px;
  color: gray;
  margin-top: 3px;
  /* background-color:white; */
  .views {
    margin-right: 12px;
  }
  .reviews {
  }
`;
const Restaurant = () => {
  return (
    <Container>
      <BestMenuContainer>
        <img
          style={{ width: "188px", height: "180px" }}
          src="data:image/jpeg;base64,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"
        ></img>
      </BestMenuContainer>

      <NameNStarsContainer>
        <div className="NameOfRestaurant">유명한 라멘</div>
        <div className="Stars">4.5</div>
      </NameNStarsContainer>
      <Category>일식/면요리</Category>
      <NumOfViewsNReviews>
        <div className="views">
          <FontAwesomeIcon icon={faEye} /> 225
        </div>
        <div className="reviews">
          <FontAwesomeIcon icon={faPencil} /> 25
        </div>
      </NumOfViewsNReviews>
    </Container>
  );
};
export default Restaurant;
