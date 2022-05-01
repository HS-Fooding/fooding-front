import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Header from "../component/Header";
import { useNavigate, Link } from "react-router-dom";

import { url,token } from "../../Api";
import axios from "axios";
// src\Api.js
//src\guest\component\Login.js
import { motion, AnimatePresence } from "framer-motion";
// border: 1px solid black;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faMagnifyingGlass,faAngleLeft } from "@fortawesome/free-solid-svg-icons";
const Container = styled.div`
  width: 410px;
  height: 60px;
  background-color:red;
  z-index: 2;
  position: absolute;
  top: 0;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
`;
const AreaContainer = styled.div`
  width: 50px;
  height: 30px;
  margin-left: 15px;
  font-size: 11px;
  background-color:orange;
  display:flex;
  justify-content: center;
  align-items: center;
  p {
    margin-bottom: 5px;
  }
  .Area {
    font-size: 18px;
    font-weight: bold;
  }
`;
const MapSearchContainer = styled.div`
  width: 350px;
  background-color:blue;
  margin-right: 10px;
 
  height: 30px;
  font-size: 23px;
  color: gray;
  display: flex;
  justify-content: space-between;
  input {
    width:300px;
  }
`;
const InputContainer = styled.div`
  width:200px;
  height:30px;
  input{
    height:30px;

  }
`;

const RestaurantInput = (props) => {
  const [searchWord,setSearchWord] = useState();
  const [searchResult,setSearchResult] = useState();

  const bringSearchWord=(e)=>{
    setSearchWord(e.target.value);
    console.log(e.target.value);
  }
const handleCreate = (data)=>{
  props.oncreate(data.content);
}
const getSearch = (e) =>{
  e.preventDefault();
  setSearchWord("");
  const getToken = localStorage.getItem("token");
  const id = localStorage.getItem("marketId");
  //.get(url + `/fooding/restaurant/${id}`, {
  axios
    .get(url + `/fooding/restaurant?name=${searchWord}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken,
      },
    })
    .then((res) => {
      console.log(res.data);
      setSearchResult(res.data);
      handleCreate(res.data);
    })
    .catch((err) => {
     
    });
}
  return (
    <Container>
      <AreaContainer>
          <FontAwesomeIcon icon={faAngleLeft} className="icon" size="lg" />
          </AreaContainer>
          <MapSearchContainer>        
            {/* <div onClick={}>돋보기 아이콘 클릭하면 검색결과를 보여주는 페이지로 이동함 이동할 때 검색한 키워드도 전달 해야함? */}            
          <InputContainer><form onSubmit={getSearch} ><input onChange={bringSearchWord} value={searchWord} type="text"></input></form></InputContainer>
            {/* <div>
              <FontAwesomeIcon icon={faMap} />
            </div> */}
        </MapSearchContainer>

    </Container>
  );
};
export default RestaurantInput;
