import React, { useEffect, useState, memo } from "react";
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
    height:21px;
  }
  .Stars {
    font-size: 18px;
    color: orange;
    font-weight: bold;
    height:21px;
  }
`;
const Category = styled.div`
  margin-right:3px;
  font-size: 12px;
  color: gray;
  margin-top: 5px;
  display:flex;
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
    width:60px;
   
    margin-right: 12px;
  }
  .reviews {

  }
`;
const CategoryContainer = styled.div`
  width:184px;
  height:20px;
  display:flex;
  justify-content: inline-block;
 
`;
const Restaurant = ({content}) => {
  // console.log("restaurant",content);
  // console.log("restaurant.image.path",content.image?.path);
  // console.log("restaurant.category",content.category);
  const bringCategoryValue = (value) => {
    if (value === "KOREAN") return "한식";
    else if (value === "JAPANESE") return "일식";
    else if (value === "CHINESE") return "중식";
    else if (value === "WESTERN") return "양식";
    else if (value === "VIETNAM") return "베트남";
    else if (value === "TAIWAN") return "태국";
    else if (value === "SNACK") return "분식";
    else if (value === "NOODLE") return "면요리";
    else if (value === "BBQ") return "바베큐";
    else if (value === "PORK") return "돼지고기";
    else if (value === "BEEF") return "소고기";
    else if (value === "CHICKEN") return "닭고기";
    else if (value === "LAMB") return "양고기";
    else if (value === "CAFE") return "카페";
    else if (value === "DESSERT") return "디저트";
    else if (value === "BAR") return "바";
    else if (value === "PUB") return "술집";
    // switch(value){
    //   case("KOREAN"):
    //   return "한식"
    //   break;
    // }
  };
  return (
    <Container>
      <BestMenuContainer>
        <img
          style={{ width: "188px", height: "180px","objectFit": "cover" }}
          src={content.image?.path}
          ></img>
      </BestMenuContainer>

      <NameNStarsContainer>
        <div className="NameOfRestaurant">{content.name.length>9 ? content.name.slice(0, 8) + "..." : content.name}</div>
        <div className="Stars">{(content.avgScore).toFixed(1)}</div>
      </NameNStarsContainer>
      <CategoryContainer>
       {content.category?.map((cate,index)=>{
        if(index===(content.category?.length-1)){
           return <Category>{bringCategoryValue(cate)}</Category> 
         }
         else{
         return <Category>{bringCategoryValue(cate)}/</Category>
         }
        })}
        
      </CategoryContainer>
      <NumOfViewsNReviews>
        <div className="views">
          <FontAwesomeIcon icon={faEye} /> {content.viewCount}
        </div>
        <div className="reviews">
          <FontAwesomeIcon icon={faPencil} /> {content.reviewCount}
        </div>
      </NumOfViewsNReviews>
    </Container>
  );
};
export default memo(Restaurant);
