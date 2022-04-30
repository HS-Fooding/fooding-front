/*global kakao*/
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../component/Header";
import { url } from "../../Api";
import axios from "axios";

const Container = styled.div`
  border: 1px solid black;
  width: 410px;
  height: 770px;
  position: relative;
  box-sizing: border-box;
  margin-bottom: 30px;
`;

const clickFunc = (title) => {
  console.log("title:", title);
};
const Location = () => {
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

  return (
    <Container>
      <Header back="/guest/restaurantList" title={""} />
      <div>
        <div id="map" style={{ width: "410px", height: "710px" }}></div>
      </div>
    </Container>
  );
};

export default Location;
