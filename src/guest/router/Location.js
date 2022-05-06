/*global kakao*/
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../component/Header";
import { url } from "../../Api";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free/js/all.js";
import { faEye, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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
  width: 390px;
  height: 126px;
  background-color: white;
  position: absolute;
  bottom: 12px;
  z-index: 1;
  display: flex;
  left: 0px;
  margin: 0px 10px;
`;

const ImgBox = styled.div`
  width: 126px;
  height: 126px;
  background-color: inherit;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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

const Location = () => {
  const [searchedWord, setSearchedWord] = useState();
  const [clickedMarket, setClickedMarket] = useState();
  const [click, setClick] = useState(false);
  const [center, setCenter] = useState([37.58265617070882, 127.01017798663574]);

  const getToken = localStorage.getItem("token");

  useEffect(() => {
    let markerdata = [];

    var config = {
      method: "get",
      url: url + `/fooding/restaurant?coord=true`,
      headers: {
        Authorization: "Bearer " + getToken,
      },
    };

    axios(config)
      .then(function (response) {
        //console.log(response.data.content);

        response.data.content.map((market) => {
          const obj = {
            id: market.id,
            lat: market.location.coordinate.y, // 위도
            lng: market.location.coordinate.x, // 경도
          };
          markerdata.push(obj);
        });

        console.log("markderdata:", markerdata);

        return markerdata;
      })
      .then((markerdata) => {
        let container = document.getElementById("map");
        let options = {
          center: new kakao.maps.LatLng(center[0], center[1]),
          level: 5,
        };

        var map = new kakao.maps.Map(container, options);
        // var markerPosition = new kakao.maps.LatLng(
        //   37.365264512305174,
        //   127.10676860117488
        // );
        // var marker = new kakao.maps.Marker({
        //   position: markerPosition,
        // });

        markerdata.forEach((el) => {
          // 마커를 생성합니다

          const marker = new kakao.maps.Marker({
            //마커가 표시 될 지도
            map: map,
            //마커가 표시 될 위치
            position: new kakao.maps.LatLng(el.lat, el.lng),
            //마커에 hover시 나타날 title
            id: el.id,
          });

          kakao.maps.event.addListener(marker, "click", () =>
            getClickedMarket(el.id, el.lat, el.lng)
          );
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    // marker.setMap(map);
  }, [center]);

  const getClickedMarket = (id, lat, lng) => {
    console.log("id:", id);
    setClick(true);

    setCenter([lat, lng]);

    var config = {
      method: "get",
      url: url + `/fooding/restaurant/${id}`,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setClickedMarket(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
      {click ? (
        <Link
          to={`/guest/${clickedMarket?.id}`}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <MarketBox>
            <ImgBox>
              <img src={clickedMarket?.images[0]} />
            </ImgBox>
            <InfosBox>
              <span className="title">{clickedMarket?.name}</span>
              <span className="location">
                {clickedMarket?.location.region2Depth}
              </span>
              <span className="icons">
                <FontAwesomeIcon icon={faEye} /> {clickedMarket?.viewCount}{" "}
                <FontAwesomeIcon
                  icon={faPencil}
                  style={{ marginLeft: "5px" }}
                />{" "}
                {clickedMarket?.reviewCount}{" "}
              </span>
            </InfosBox>
          </MarketBox>
        </Link>
      ) : null}
    </Container>
  );
};

export default Location;
