import React, { memo, useEffect, useState, useParams } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Header from "../component/Header";
import { useNavigate, Link } from "react-router-dom";
import Restaurant from "../component/Restaurant";
import RestaurantHeader from "../component/RestaurantHeader";
import Loader from "../component/Loader";
import { url } from "../../Api";
import axios from "axios";

// src\Api.js
//src\guest\component\Login.js
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMap,
  faMagnifyingGlass,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
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
  .map {
  }
`;
const ListContainer = styled.div`
  width: 390px;
  /* 410,770 */
  height: 700px;
  /* background-color:red; */
  margin-top: 65px;
  /* display:flex; */

  overflow: auto;
  /* display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, minmax(120px, 1fr));
  grid-template-rows: masonry; */
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  .Target-Element {
    width: 100vw;
    height: 140px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
  }
`;
const Footer = styled.div`
  width: 410px;
  height: 60px;
  background-color: white;
  position: absolute;
  bottom: 0;
`;
const AreaContainer = styled.div`
  width: 50px;
  height: 30px;
  font-size: 11px;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin-bottom: 5px;
  }
  .map {
    font-size: 24px;
  }
`;
const InputContainer = styled.div`
  width: 322px;
  height: 30px;
  margin-left: 15px;
  input {
    width: 322px;
    height: 30px;
    border: 0;
    outline: 0;
    font-size: 15px;
    color: transparent;
    text-shadow: 0 0 0 #000000;
    &:focus {
      outline: none;
    }
  }
`;
const RestaurantSearch = () => {
  const [restaurantArr, setRestaurantArr] = useState([]);
  const [target, setTarget] = useState(null);
  const [numOfElements, setNumOfElements] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [presentPage, setPresentPage] = useState(0);
  const [bring, setBring] = useState(false);
  const [post, setPost] = useState(false);
  const [searchWord, setSearchWord] = useState();
  const [result, setResult] = useState([]);
  const [firstInput, setfirstInput] = useState(false);
  const [researchCount, setResearchCount] = useState(0);
  //const [last,setLast] = useState(false);
  let last = false;
  let currentPage = 0;
  const setIsIsLoaded = () => {
    setIsLoaded(true);
  };
  const bringSearchWord = (e) => {
    e.preventDefault();
    setSearchWord(e.target.value);
    setfirstInput(true);
    console.log(e.target.value);
  };
  const bringMarketInfo = async () => {
    if (last == false && firstInput) {
      setIsLoaded(true);

      var axios = require("axios");
      //마지막이 아니어야 get을 할 수 있음 마지막이라면 last가 true일것 false여야 할 수 있음
      const data = new FormData();
      const getToken = localStorage.getItem("token");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("searchWordsearchWordsearchWordsearchWord", searchWord);
      setPost(true);
      await axios //${searchWord}
        .get(
          url +
            `/fooding/restaurant/search?keyword=${searchWord}&page=${currentPage}&size=6`,
          {
            headers: {
              //"Content-Type": "multipart/form-data",
              "Content-Type": "application/json",
              Authorization: "Bearer " + getToken,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setPresentPage(presentPage + 1);
          console.log("last true / false ::", res.data.last);
          const lastresult = res.data.last;
          if (lastresult) {
            last = true;
          }
          console.log("last가 true로 바뀜!!?", last);
          console.log("  isLoaded", isLoaded);
          console.log("currentPage", currentPage);
          console.log("researchCount", researchCount);
          if (researchCount >= 1) {
            setRestaurantArr(res.data.content);
          } else {
            setRestaurantArr((restaurantArr) =>
              restaurantArr.concat(res.data.content)
            );
          }
        })
        .then(() => {
          currentPage += 1;
          setIsLoaded(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const getSearch = (e) => {
    e.preventDefault();
    // setSearchWord("");
    setResult([]);
    setBring(true);
    setResearchCount(researchCount + 1);
    bringMarketInfo();
  };
  const onIntersect = async ([entry], observer) => {
    console.log(" onInterect !isLoaded", !isLoaded);
    console.log(" onInterect !last", !last);
    console.log(" isIntersecting", entry.isIntersecting);

    if (entry.isIntersecting && !isLoaded && !last) {
      console.log("onIntersect last ????", last);
      observer.unobserve(entry.target);
      await bringMarketInfo();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    console.log("change isLoaded", isLoaded);
  }, [last, isLoaded]);
  useEffect(() => {
    console.log("TargetTargetTargetTargetTarget");
  }, [target]);
  useEffect(() => {}, [restaurantArr]);
  useEffect(() => {
    let observer;
    if (target && !last && firstInput) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);
  return (
    <Container>
      {/* 헤더 따로 만들기 */}
      <HeaderContainer>
        <Link to={`/guest/restaurantList`}>
          <FontAwesomeIcon icon={faAngleLeft} className="icon" size="lg" />
        </Link>
        <InputContainer>
          <form onSubmit={getSearch}>
            <input
              onChange={bringSearchWord}
              value={searchWord}
              type="text"
            ></input>
          </form>
        </InputContainer>
        {post ? (
          <div className="map">
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/guest/location`}
              state={{ searchWord: searchWord }}
            >
              <FontAwesomeIcon icon={faMap} className="icon" size="1x" />
            </Link>
          </div>
        ) : null}
      </HeaderContainer>
      {searchWord ? (
        <ListContainer>
          {/* 여기서 get해와서 배열 꺼내서  component에 prop보냄*/}
          {restaurantArr?.map((content, index) => {
            return (
              <Link
                to={`/guest/${content.id}`}
                state={{
                  avgScore: content.avgScore,
                  reviewCount: content.reviewCount,
                  viewCount: content.viewCount,
                }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Restaurant content={content} />
              </Link>
            );
          })}
          <div ref={setTarget} className="Target-Element">
            {isLoaded && !last && <Loader />}
          </div>
        </ListContainer>
      ) : null}
    </Container>
  );
};
export default memo(RestaurantSearch);
