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
  margin-left:20px;
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
  width: 200px;
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
  width:100px;
  height:30px;
  input{
    height:30px;

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
  //const [last,setLast] = useState(false);
  let searchResultLet;
  let last = false
  let currentPage=0;

  const bringSearchWord=(e)=>{
    setSearchWord(e.target.value);
    console.log(e.target.value);
  }
const getSearch = (e) =>{
  e.preventDefault();
  setSearchWord("");
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
     <ResearchContainer>
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
        </ResearchContainer>
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
     
         
    })}
    </ListContainer> 
 
    
    </Container></>
  );
};
export default RestaurantSearch;
