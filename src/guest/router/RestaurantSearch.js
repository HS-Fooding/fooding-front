import React, { memo,useEffect, useState, useParams } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Header from "../component/Header";
import { useNavigate, Link } from "react-router-dom";
import Restaurant from "../component/Restaurant";
import RestaurantHeader from "../component/RestaurantHeader";
import RestaurantInput from "../component/RestaurantInput";
import Loader from "../component/Loader";
import { url } from "../../Api";
import axios from "axios";
// src\Api.js
//src\guest\component\Login.js
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faMagnifyingGlass,faAngleLeft } from "@fortawesome/free-solid-svg-icons";
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
const HeaderContainer = styled.div`
display: flex;
  
  align-items: center;
  width: 410px;
  height: 60px;
  background-color: white;
  color: black;
  padding: 5px 15px;
  font-size: 15px;
  border: 1px solid ${(props) => props.theme.borderGrayColor};
  position: absolute;
  
  top: 0;
  font-weight: bold;
  z-index: 3;
  .icon {
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.manColor};
    }
    color: ${(props) => props.theme.mainColor};
  }
  .map{
    
  }

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
  .Target-Element{
    width: 100vw;
    height: 140px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
  }
`;
const Footer = styled.div`
    width:410px;
    height:60px;
    background-color:white;
    position:absolute;
    bottom:0;
`;
const AreaContainer = styled.div`
  width: 50px;
  height: 30px;
  font-size: 11px;
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
  width: 340px;
  background-color:blue;
  margin-right: 10px;
 
  height: 30px;
  font-size: 23px;
  color: gray;
  display: flex;
  justify-content: space-between;
  
`;
const InputContainer = styled.div`
  width:300px;
  height:30px;
  margin-left:15px;
  input{
    width:300px;
    height:30px;
    border:0;
    outline:0;
    font-size:15px;
    color:transparent;
    text-shadow:0 0 0 #000000;
   &:focus{
      outline:none;
   }
  }
`;
const ResearchContainer = styled.div`
  width:410px;
  height:60px;
  display:flex;
  align-items:center;
  position:absolute;
  background-color:yellow;
  z-index:2;
  top:0;
`;

const RestaurantSearch = () => {
  const [restaurantArr,setRestaurantArr] = useState([]);
  const [target, setTarget] = useState(null);
  const [numOfElements,setNumOfElements] = useState()
  const [isLoaded, setIsLoaded] = useState(false);
  const [presentPage,setPresentPage] = useState(0);
  const [result,setResult] = useState();
  
  const [searchWord,setSearchWord] = useState();
  const [searchResult,setSearchResult] = useState([]);

  const [post,setPost] = useState(false);
  //const [last,setLast] = useState(false);
  let searchResultLet;
  let last = false
  const bringSearchWord=(e)=>{
    setSearchWord(e.target.value);
    console.log(e.target.value);
  }
const getSearch = (e) =>{
  e.preventDefault();
 // setSearchWord("");
 setPost(true);
  const getToken = localStorage.getItem("token");
  const id = localStorage.getItem("marketId");
  //.get(url + `/fooding/restaurant/${id}`, {
  axios
    .get(url + `/fooding/restaurant/search?keyword=${searchWord}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken,
      },
    })
    .then((res) => {
      console.log(res.data.content);
      setSearchResult(res.data.content);
      searchResultLet=res.data.content;
     
    })
    .then((res)=>{
      console.log("searchResultsearchResultsearchResult",searchResult);
    })
    .catch((err) => {
     
    });
}
  return (
    <>    
   <Container>
     <HeaderContainer>
       <Link to={`/guest/restaurantList`}>
          <FontAwesomeIcon icon={faAngleLeft} className="icon" size="lg" />
        </Link>  
        <InputContainer><form onSubmit={getSearch} ><input onChange={bringSearchWord} value={searchWord} type="text"></input></form></InputContainer>
       {post ? <div className="map">
          <FontAwesomeIcon icon={faMap} className="icon" size="lg"/>
        </div> : null}
    </HeaderContainer>
    <ListContainer>
      {/* 여기서 get해와서 배열 꺼내서  component에 prop보냄*/}
     
      {searchResult?.map((content,index)=>{
        console.log("content",content);
       return <Link  
       to={`/guest/${content.id}`}
          state={{
            avgScore:content.avgScore,
            reviewCount:content.reviewCount,
            viewCount:content.viewCount,
          }}        
       style={{ textDecoration: "none", color: "inherit" }}
      ><Restaurant content={content} /></Link>
     //focus가 되기 전에는 걍 지도 아이콘 없는 input 창인데
     //focus가 되면 input창이 생기고 검색하면 
     //검색한 결과와 지도 아이콘이 오른쪽에 뜸 
         
    })}
    </ListContainer> 
 
    
    </Container></>
  );
};
export default RestaurantSearch;
