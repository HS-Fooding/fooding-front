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
import { faMap, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const Container = styled.div`
  width: 410px;
  height: 60px;

  z-index: 2;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const AreaContainer = styled.div`
  width: 188px;
  height: 30px;
  margin-left: 15px;
  font-size: 11px;
  p {
    margin-bottom: 5px;
  }
  .Area {
    font-size: 18px;
    font-weight: bold;
  }
`;
const MapSearchContainer = styled.div`
  width: 85px;
  margin-right: 10px;
  margin-top: 17px;
  height: 30px;
  font-size: 23px;
  color: gray;
  display: flex;
  justify-content: space-between;
`;
const RestaurantHeader = () => {
  return (
    <Container>
      <AreaContainer>
        <p>지금 보고 있는 지역은</p> <div className="Area">강남역</div>
      </AreaContainer>
      <MapSearchContainer>
        {" "}
        <div>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>{" "}
        <p> | </p>{" "}
        <div>
          <FontAwesomeIcon icon={faMap} />
        </div>{" "}
      </MapSearchContainer>
    </Container>
  );
};
export default RestaurantHeader;
