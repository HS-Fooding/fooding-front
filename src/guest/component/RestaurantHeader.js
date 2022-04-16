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
import {
  faMap,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const RestaurantHeader = () => {
  
  return (
   <div>
       <div>지금 보고 있는 지역은 강남역</div>
       <div> <FontAwesomeIcon icon={faMap} /> | <FontAwesomeIcon icon={faMagnifyingGlass} /> </div></div>
  );
};
export default RestaurantHeader;
