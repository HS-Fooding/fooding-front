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
import { useLocation } from "react-router-dom";
import { BiCurrentLocation } from "react-icons/bi";
import { FaSearchLocation } from "react-icons/fa";

const Container = styled.div`
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

const MyLocationBtn = styled.button`
  position: absolute;
  top: 80px;
  right: 8px;
  width: 50px;
  height: 50px;
  z-index: 10;
  background-color: white;
  border-radius: 50%;
  border: none;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.05) 0px 8px 32px;
  font-size: 29px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${(props) => props.theme.mainColor};
`;

const SearchBtn = styled.button`
  position: absolute;
  top: 85px;
  left: 50%;
  transform: translate(-50%, 0%);
  z-index: 10;
  border: none;
  background-color: white;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 18px;
  color: ${(props) => props.theme.mainColor};
  span {
    margin-left: 4px;
  }
  cursor: pointer;
`;

const Location = () => {
  const [searchedWord, setSearchedWord] = useState();
  const [clickedMarket, setClickedMarket] = useState();
  const [click, setClick] = useState(false);
  // const [center, setCenter] = useState([]);

  const [isSearch, setIsSearch] = useState(false);
  const [markerData, setMarkerData] = useState([]);
  const getToken = localStorage.getItem("guestToken");
  const [latLng, setLatLng] = useState([
    [37.58265617070882, 127.01017798663574],
  ]);

  let markerdata = [];
  //   let myLocation = [37.58265617070882, 127.0101779866357]; // 한성대

  let searching = false;
  let map, latlng;

  const makeMarker = (markderdata) => {
    const latLS = localStorage.getItem("lat");
    const lngLS = localStorage.getItem("lng");

    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(latLS, lngLS),
      level: 5,
    };

    map = new kakao.maps.Map(container, options);

    kakao.maps.event.addListener(map, "dragend", function () {
      // 지도의  레벨을 얻어옵니다
      var level = map.getLevel();

      // 지도의 중심좌표를 얻어옵니다
      latlng = map.getCenter();

      var message = "지도 레벨은 " + level + " 이고";
      message +=
        "중심 좌표는 위도 " +
        latlng.getLat() +
        ", 경도 " +
        latlng.getLng() +
        "입니다";

      setLatLng([latlng.getLat(), latlng.getLng()]);

      console.log(message);
    });

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

      kakao.maps.event.addListener(marker, "click", () => {
        getClickedMarket(el.id, el.lat, el.lng);
        var pos = marker.getPosition();
        console.log("pos:", pos);
        console.log(pos.La, pos.Ma);
        //setCenter(pos.Ma, pos.La);
        map.panTo(pos);
      });
    });
  };
  const location = useLocation();
  const { searchWord } = location.state;
  console.log("searchWord:", searchWord);

  //웹에서 호출하는 좌표구하기 함수
  function myLocate() {
    var lat, lng, v; //변수
    var isAndroid = /android/i.test(navigator.userAgent); //현재기기가 안드인지 체크

    if (isAndroid) {
      //안드가 맞다면
      //여기가 위쪽에서 작성된 안드로이드 코드를 사용하는 부분
      //window."안드야".함수;
      //하며 호출함
      lat = window.android.getGeocode("lat");
      lng = window.android.getGeocode("lng");

      v = [lat, lng];

      //   myLocation.push(lat);
      //   myLocation.push(lng);

      localStorage.setItem("lat", lat);
      localStorage.setItem("lng", lng);

      //setCenter([lat, lng]);
    } else {
      //안드가 아니라면

      v = [37.58265617070882, 127.01017798663574];
      console.log(v); //콘솔에 찍자

      //   myLocation[0] = 37.676615072936; // 상계
      //   myLocation[1] = 127.05226074939;

      //   console.log("myLocation:", myLocation);

      // setCenter([37.676615072936, 127.05226074939]);

      // localStorage.setItem("lat", 37.582412965088);
      // localStorage.setItem("lng", 127.00378236901); // 혜화
    }
  }

  // useEffect(() => {
  //   if (latLng !== undefined) {
  //     console.log("latlng", latlng.getLat(), latlng.getLng());
  //   }
  // }, [latLng]);

  const getMyLocateRes = async () => {
    await localStorage.setItem("lat", 37.58265617070882); // 한성대
    await localStorage.setItem("lng", 127.0101779866357);

    await myLocate(); // 혜화로 세팅 테스트

    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다

    // var moveLatLon = new kakao.maps.LatLng(latLS, lngLS);
    // map.panTo(moveLatLon);

    if (searchWord !== "none") {
      setSearchedWord(searchWord);

      //await setIsSearch(true);
      searching = true;
      getSearchedResult(searchWord);
    }

    if (!searching) {
      console.log("!isSearch!!");

      //setCenter([myLocation[0], myLocation[1]]);

      const latLS = localStorage.getItem("lat");
      const lngLS = localStorage.getItem("lng");

      var config = {
        method: "get",
        url: url + `/fooding/restaurant/coord?x=${lngLS}&y=${latLS}`,
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

          setMarkerData(markerdata);
          return markerData;
        })
        .then((markerData) => {
          makeMarker(markerData);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    //let myLocation = [37.58265617070882, 127.0101779866357];

    getMyLocateRes();
    // marker.setMap(map);
  }, []);

  const getClickedMarket = (id, lat, lng) => {
    console.log("id:", id);
    setClick(true);

    //setCenter([lat, lng]);

    var config = {
      method: "get",
      url: url + `/fooding/restaurant/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken,
      },
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

  const getSearchedResult = (searchedWord) => {
    //searchedWord

    console.log("searchedWord:", searchedWord);

    console.log("getSearchedresult함수");
    var config = {
      method: "get",
      url: url + `/fooding/restaurant/search?keyword=${searchedWord}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data.content);

        localStorage.setItem(
          "lat",
          response.data.content[0].location.coordinate.y
        );
        localStorage.setItem(
          "lng",
          response.data.content[0].location.coordinate.x
        );

        markerdata = [];

        response.data.content.map((market) => {
          const obj = {
            id: market.id,
            lat: market.location.coordinate.y, // 위도
            lng: market.location.coordinate.x, // 경도
          };
          markerdata.push(obj);
        });

        console.log("markderdata:", markerdata);
        setMarkerData(markerdata);

        return markerData;
      })
      .then((markerdata) => {
        makeMarker(markerdata);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submit = (e) => {
    e.preventDefault();
    setIsSearch(true);

    getSearchedResult(searchedWord);

    console.log("submit!");
  };

  const getNewPosition = async () => {
    console.log("latlng:", latLng[0], latLng[1]);

    markerdata = [];

    await localStorage.setItem("lat", latLng[0]);
    await localStorage.setItem("lng", latLng[1]);

    var config = {
      method: "get",
      url: url + `/fooding/restaurant/coord?x=${latLng[1]}&y=${latLng[0]}`,
      headers: {
        Authorization: "Bearer " + getToken,
      },
    };

    await axios(config)
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

        setMarkerData(markerdata);
        return markerData;
      })
      .then((markerData) => {
        makeMarker(markerData);
      })
      .catch(function (error) {
        console.log(error);
      });
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
        <div id="map" style={{ width: "410px", height: "770px" }}></div>
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
      <MyLocationBtn onClick={getMyLocateRes}>
        <BiCurrentLocation></BiCurrentLocation>
      </MyLocationBtn>
      <SearchBtn onClick={getNewPosition}>
        <FaSearchLocation></FaSearchLocation>
        <span>현지역으로 검색</span>
      </SearchBtn>
    </Container>
  );
};

export default Location;
