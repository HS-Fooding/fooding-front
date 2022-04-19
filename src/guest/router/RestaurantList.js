import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Header from "../component/Header";
import { useNavigate, Link } from "react-router-dom";
import Restaurant from "../component/Restaurant";
import RestaurantHeader from "../component/RestaurantHeader";
import { url } from "../../Api";
// src\Api.js
//src\guest\component\Login.js
import { motion, AnimatePresence } from "framer-motion";
// border: 1px solid black;

const Container = styled.div`
  width: 410px;
  height: 770px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  
`;
const ListContainer = styled.div`
    width:390px;
    /* 410,770 */
    height:700px;
    /* background-color:red; */
    margin-top:65px;
    /* display:flex; */
   
  overflow: auto;
  /* display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, minmax(120px, 1fr));
  grid-template-rows: masonry; */
    display:flex;
    justify-content: space-between;
    flex-wrap:wrap;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
const Footer = styled.div`
    width:410px;
    height:60px;
    background-color:white;
    position:absolute;
    bottom:0;
`;

const RestaurantList = () => {
  const [restaurantArr,setRestaurantArr] = useState();
  const bringMarketInfo = () =>{
    var axios = require("axios");
  
   const data = new FormData();
    const getToken = localStorage.getItem("token");
    axios
      .get(url + "/fooding/restaurant", {
        headers: {
          //"Content-Type": "multipart/form-data",
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        setRestaurantArr(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(()=>{
    bringMarketInfo();
   
  },[]);
  return (
    <Container>
    
    {/* 헤더 따로 만들기 */}
   <RestaurantHeader></RestaurantHeader>
    <ListContainer>
      {/* 여기서 get해와서 배열 꺼내서  component에 prop보냄*/}
      {restaurantArr?.map((content,index)=>{
       return <Restaurant content={content}  />
    
    })}

    
    </ListContainer>
    
    </Container>
  );
};
export default RestaurantList;
