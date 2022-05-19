import React, { memo, useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Header from "../component/Header";
import { useNavigate, Link } from "react-router-dom";
import Restaurant from "../component/Restaurant";
import RestaurantHeader from "../component/RestaurantHeader";
import Loader from "../component/Loader";
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
  width: 390px;
  /* 410,770 */
  height: 670px;
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
    height: 120px;
    display: flex;
    justify-content: center;
    text-align: center;
   
  }
`;
const Footer = styled.div`
  width: 410px;
  height: 60px;
  background-color: white;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${(props) => props.theme.borderGrayColor};
  padding: 0px 10px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
`;

const FooterButton = styled.div`
  width: 80px;
  height: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: ${(props) => props.theme.fontGrayColor};
  cursor: pointer;

  svg {
    font-size: 23px;
    margin-bottom: 8px;
    color: ${(props) => props.theme.fontGrayColor};
  }
`;

const RestaurantList = () => {
  const [restaurantArr, setRestaurantArr] = useState([]);
  const [target, setTarget] = useState(null);
  const [numOfElements, setNumOfElements] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [presentPage, setPresentPage] = useState(0);
  //const [last,setLast] = useState(false);

  let navigate = useNavigate();

  let last = false;
  let currentPage = 0;
  const setIsIsLoaded = () => {
    setIsLoaded(true);
  };
  const bringMarketInfo = async () => {
    if (last == false) {
      setIsLoaded(true);
      var axios = require("axios");
      //마지막이 아니어야 get을 할 수 있음 마지막이라면 last가 true일것 false여야 할 수 있음
      const data = new FormData();
      const getToken = localStorage.getItem("token");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await axios
        .get(url + "/fooding/restaurant?page=" + currentPage + "&size=6", {
          headers: {
            //"Content-Type": "multipart/form-data",
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken,
          },
        })
        .then((res) => {
          setPresentPage(presentPage + 1);
          console.log("last true / false ::", res.data.last);
          const lastresult = res.data.last;
          if (lastresult) {
            last = true;
          }
          console.log("  isLoaded", isLoaded);
          console.log("currentPage", currentPage);
          setRestaurantArr((restaurantArr) =>
            restaurantArr.concat(res.data.content)
          );
        })
        .catch((err) => {
          console.log(err);
        });
      currentPage += 1;
      setIsLoaded(false);
    }
  };
  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded && !last) {
      console.log("onIntersect last ????", last);
      observer.unobserve(entry.target);
      await bringMarketInfo();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {}, [last]);
  useEffect(() => {}, [restaurantArr]);
  useEffect(() => {
    let observer;
    if (target && !last) {
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
      <RestaurantHeader></RestaurantHeader>
      <ListContainer>
        {/* 여기서 get해와서 배열 꺼내서  component에 prop보냄*/}
        {restaurantArr?.map((content, index) => {
          return (
            <Link
              to={`/guest/${content.id}`}
              state={
                {
                  // avgScore: content.avgScore,
                  // reviewCount: content.reviewCount,
                  // viewCount: content.viewCount,
                }
              }
              style={{ textDecoration: "none", color: "inherit" }}
              key={index}
            >
              <Restaurant content={content} />
            </Link>
          );
        })}
        <div ref={setTarget} className="Target-Element">
          {isLoaded && !last && <Loader />}
        </div>
      </ListContainer>
      <Footer>
        <FooterButton>
          <i className="fa-solid fa-house"></i>
          <span>맛집찾기</span>
        </FooterButton>

        <FooterButton
          onClick={() => {
            navigate("/guest/myPage");
          }}
        >
          <i className="fa-regular fa-user"></i>
          <span>마이페이지</span>
        </FooterButton>
      </Footer>
    </Container>
  );
};
export default memo(RestaurantList);
