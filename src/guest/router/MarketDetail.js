import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../component/Header";
import { url } from "../../Api";
import axios from "axios";
import { Link } from "react-router-dom";

const Container = styled.div`
  border: 1px solid black;
  width: 410px;
  height: 770px;
  position: relative;
  box-sizing: border-box;
`;

const MarketImgsBox = styled.div`
  width: 100%;
  height: 160px;
  background-color: orange;
  margin-top: 60px;
`;

const MarketTitleBox = styled.div`
  width: 100%;
  height: 100px;
  background-color: teal;
`;

const MaketMenuBox = styled.div`
  width: 100%;
  height: 80px;
  background-color: skyblue;
`;

const MarketDetail = () => {
   const { marketId } = useParams();
   let location = useLocation();
   const {avgScore,viewCount,reviewCount} = location.state;
   console.log("avgScore,viewCount,reviewCount",avgScore,viewCount,reviewCount);
  useEffect(() => {
    var config = {
      method: "get",
      url: url + `/fooding/restaurant/${marketId}`,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <Header back="/guest/restaurantList" title={""} />
      {/* <Link to="/guest/reservation1">
        <button style={{ marginTop: " 100px" }}>예약</button>
      </Link> */}

      <MarketImgsBox></MarketImgsBox>
      <MarketTitleBox></MarketTitleBox>
      <MaketMenuBox></MaketMenuBox>
    </Container>
  );
};

export default MarketDetail;
