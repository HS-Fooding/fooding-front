import React, { memo, useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Header from "../component/Header";
import { useNavigate, Link } from "react-router-dom";
import Restaurant from "../component/Restaurant";
import RestaurantHeader from "../component/RestaurantHeader";
import Loader from "../component/Loader";
import { url } from "../../Api";
import axios from "axios";
import Footer from "../component/Footer";
// src\Api.js
//src\guest\component\Login.js
import { motion, AnimatePresence } from "framer-motion";
// border: 1px solid black;

const Container = styled.div`
  width: 410px;
  height: 100vh;
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
const ListContainer = styled.div`
  width: 390px;
  /* 410,770 */
  height:85vh;
  /* background-color:red; */
  margin-top: 65px;
  /* display:flex; */

  
`;
const Listlistcontainer = styled.div`
  /* 85vh */
  width: 390px;
 height:85vh;
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
const getToken = localStorage.getItem("guestToken");

const RestaurantList = () => {
  const [restaurantArr, setRestaurantArr] = useState([]);
  const [target, setTarget] = useState(null);
  const [numOfElements, setNumOfElements] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [presentPage, setPresentPage] = useState(0);
  //const [currentLocation, setCurrentLocation] = useState();
  //const [currentLocationBool, setCurrentLocationBool] = useState(false);

  let currentLocationBool = false;

  let navigate = useNavigate();

  useEffect(() => {
    const getToken = localStorage.getItem("guestToken");

    var lat, lng, v, data;
    var isAndroid = /android/i.test(navigator.userAgent); //현재기기가 안드인지 체크

    if (isAndroid) {
      //안드가 맞다면
      //여기가 위쪽에서 작성된 안드로이드 코드를 사용하는 부분
      //window."안드야".함수;
      //하며 호출함
      lat = window.android.getGeocode("lat");
      lng = window.android.getGeocode("lng");

      v = [lng, lat];

      //   myLocation.push(lat);
      //   myLocation.push(lng);

      localStorage.setItem("lat", lat);
      localStorage.setItem("lng", lng);

      //setCenter([lat, lng]);
    } else {
      //안드가 아니라면

      v = [127.01017798663574, 37.58265617070882];
      console.log(v); //콘솔에 찍자

      localStorage.setItem("lat", 37.58265617070882);
      localStorage.setItem("lng", 127.01017798663574);
    }
  }, []);

  let last = false;
  let currentPage = 0;
  const setIsIsLoaded = () => {
    setIsLoaded(true);
  };
  const bringMarketInfo = async () => {
    const getToken = localStorage.getItem("guestToken");
    const latLS = localStorage.getItem("lat");
    const lngLS = localStorage.getItem("lng");

    if (last == false) {
      setIsLoaded(true);
      //마지막이 아니어야 get을 할 수 있음 마지막이라면 last가 true일것 false여야 할 수 있음
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await axios
        .get(
          url +
            `/fooding/restaurant/coord?x=${lngLS}&y=${latLS}&page=` +
            currentPage +
            "&size=10",
          {
            headers: {
              //"Content-Type": "multipart/form-data",
              Authorization: "Bearer " + getToken,
            },
          }
        )
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
        <Listlistcontainer>
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
              <Restaurant content={content} bookmark={false} />
            </Link>
          );
        })}
        <div ref={setTarget} className="Target-Element">
          {isLoaded && !last && <Loader />}
        </div>
      </Listlistcontainer>
      </ListContainer>
      
      <Footer></Footer>
    </Container>
  );
};
export default memo(RestaurantList);
