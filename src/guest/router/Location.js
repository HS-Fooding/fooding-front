/*global kakao*/
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../component/Header";
import { url } from "../../Api";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free/js/all.js";
import { faEye, faPencil } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  border: 1px solid black;
  width: 410px;
  height: 770px;
  position: relative;
  box-sizing: border-box;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MarketBox = styled.div`
  width: 380px;
  height: 126px;
  background-color: white;
  position: absolute;
  bottom: 12px;
  z-index: 1;
  display: flex;
`;

const ImgBox = styled.div`
  width: 126px;
  height: 126px;
  background-color: orange;
`;

const InfosBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 18px;

  .title {
    font-weight: bold;
    font-size: 16px;
    margin: 4px 0px 9px 0px;
  }

  .location {
    margin: 8px 0px;
    font-size: 12px;
    color: gray;
  }

  .icons {
    margin-top: 10px;
    color: gray;
    font-size: 12px;
  }
`;

const HeaderSearch = styled.input`
  width: 300px;
  height: 50px;
  position: fixed;
  top: 5px;
  left: 45px;
  z-index: 3;
  border: none;
  color: transparent;
  text-shadow: 0 0 0 #000000;
  &:focus {
    outline: none;
  }
`;
const clickFunc = (title) => {
  console.log("title:", title);
};
const Location = () => {
  const [searchedWord, setSearchedWord] = useState();
  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
      level: 5,
    };

    const markerdata = [
      {
        title: "콜드스퀘어",
        lat: 37.62197524055062,
        lng: 127.16017523675508,
      },
      {
        title: "하남돼지집",
        lat: 37.620842424005616,
        lng: 127.1583774403176,
      },
      {
        title: "수유리우동",
        lat: 37.624915253753194,
        lng: 127.15122688059974,
      },
      {
        title: "맛닭꼬",
        lat: 37.62456273069659,
        lng: 127.15211256646381,
      },
    ];

    var map = new kakao.maps.Map(container, options);
    // var markerPosition = new kakao.maps.LatLng(
    //   37.365264512305174,
    //   127.10676860117488
    // );
    // var marker = new kakao.maps.Marker({
    //   position: markerPosition,
    // });

    markerdata?.forEach((el) => {
      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        //마커가 표시 될 지도
        map: map,
        //마커가 표시 될 위치
        position: new kakao.maps.LatLng(el.lat, el.lng),
        //마커에 hover시 나타날 title
        title: el.title,
      });

      kakao.maps.event.addListener(marker, "click", function () {
        console.log("title:", el.title);
      });
    });
    // marker.setMap(map);
  }, []);

  const bringSearchedWord = (e) => {
    setSearchedWord(e.target.value);
    console.log(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    console.log("submit!");
  };

  return (
    <Container>
      <Header back="/guest/restaurantList" title={""} />
      <form onSubmit={submit}>
        <HeaderSearch
          type="text"
          onChange={bringSearchedWord}
          value={searchedWord}
        ></HeaderSearch>
      </form>
      <div>
        <div id="map" style={{ width: "410px", height: "710px" }}></div>
        {/* <div id="map" style={{ width: "120px", height: "120px" }}></div> */}
      </div>
      <MarketBox>
        <ImgBox></ImgBox>
        <InfosBox>
          <span className="title">상계짜장</span>
          <span className="location">노원구</span>
          <span className="icons">
            <FontAwesomeIcon icon={faEye} /> 560{" "}
            <FontAwesomeIcon icon={faPencil} style={{ marginLeft: "5px" }} /> 12{" "}
          </span>
        </InfosBox>
      </MarketBox>
    </Container>
  );
};

export default Location;
