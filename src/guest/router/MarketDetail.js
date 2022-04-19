import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../component/Header";
import { url } from "../../Api";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil } from "@fortawesome/free-solid-svg-icons";

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
  border-bottom: 1px solid ${(props) => props.theme.borderGrayColor};
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;

  span {
    margin: 10px 5px;
  }
  .leftInfos {
    display: flex;
    flex-direction: column;
    .marketName {
      font-size: 20px;
    }
  }
  .avgScore {
    font-size: 25px;
    font-weight: bold;
  }
`;

const MarketMenuBox = styled.div`
  width: 100%;
  height: 80px;
  background-color: skyblue;
`;

const MarketDetail = () => {
  const [market, setMarket] = useState();

  const { marketId } = useParams();
  let location = useLocation();
  const { avgScore, viewCount, reviewCount } = location.state;
  console.log(
    "avgScore,viewCount,reviewCount",
    avgScore,
    viewCount,
    reviewCount
  );
  useEffect(() => {
    var config = {
      method: "get",
      url: url + `/fooding/restaurant/${marketId}`,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setMarket(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <Header back="/guest/restaurantList" title={""} />

      <MarketImgsBox></MarketImgsBox>
      <MarketTitleBox>
        <div className="leftInfos">
          <span className="marketName">{market?.name}</span>
          <div>
            <span>
              {" "}
              <FontAwesomeIcon icon={faEye} /> 343
            </span>
            <span>
              {" "}
              <FontAwesomeIcon icon={faPencil} style={{ marginRight: "6px" }} />
              23
            </span>
          </div>
        </div>
        <div className="avgScore">4.1</div>
      </MarketTitleBox>
      <MarketMenuBox>
        <Link
          to="/guest/reservation1"
          state={{
            maximumUsageTime: market?.maximumUsageTime,
            weekdaysWorkHour: market?.weekdaysWorkHour,
            weekendsWorkHour: market?.weekendsWorkHour,
          }}
        >
          <button>예약</button>
        </Link>
      </MarketMenuBox>
    </Container>
  );
};

export default MarketDetail;
