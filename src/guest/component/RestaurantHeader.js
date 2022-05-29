import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Header from "../component/Header";
import { useNavigate, Link } from "react-router-dom";
import { BiMapAlt } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";

// border: 1px solid black;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const Container = styled.div`
  width: 410px;
  height: 60px;

  z-index: 2;
  position: absolute;
  top: 0;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
`;
const AreaContainer = styled.div`
  width: 290px;
  height: 30px;
  margin-left: 15px;
  font-size: 11px;
  p {
    margin-bottom: 5px;
  }
  .Area {
    font-size: 18px;
    font-weight: bold;
  }
`;
const MapSearchContainer = styled.div`
  width: 85px;
  margin-right: 10px;
  margin-top: 17px;
  height: 30px;
  font-size: 23px;
  color: gray;
  display: flex;
  justify-content: space-between;
`;
const RestaurantHeader = () => {
  return (
    <Container>
      <AreaContainer>
        <p>지금 보고 있는 지역은</p> <div className="Area">성북구</div>
      </AreaContainer>
      <MapSearchContainer>
        {" "}
        {/* <div onClick={}>돋보기 아이콘 클릭하면 검색결과를 보여주는 페이지로 이동함 이동할 때 검색한 키워드도 전달 해야함? */}
        <div>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/guest/restaurantSearch`}
          >
            <FiSearch></FiSearch>
          </Link>
        </div>{" "}
        <p style={{ color: "rgba(0,0,0,0.2)" }}> | </p>{" "}
        <div>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to="/guest/location"
            state={{ searchWord: "none" }}
          >
            <BiMapAlt></BiMapAlt>
          </Link>
        </div>{" "}
      </MapSearchContainer>
    </Container>
  );
};
export default RestaurantHeader;
