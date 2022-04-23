import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../component/Header";
import { url } from "../../Api";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencil, faStar } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  border: 1px solid black;
  width: 410px;
  height: 770px;
  position: relative;
  box-sizing: border-box;
  overflow: auto;
  /* flex-wrap:wrap; */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
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
const MarketDetailInfo = styled.div`
  width: 100%;
  height: 300px;
  background-color: purple;
`;
const MarketMenuInfo = styled.div`
  width: 100%;
  height: 300px;
`;
const EachMenu = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px black solid;
`;
const MenuContainer = styled.div`
  width: 90%;
  height: 130px;
  /* background-color:green; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
const MenuInfo = styled.div`
  width: 63%;
  height: 80%;
  .MenuName {
    width: 80%;
    height: 20px;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .MenuDescription {
    width: 80%;
    height: 20px;
    font-size: 12px;
    margin-bottom: 15px;
  }
  .MenuPrice {
    width: 80%;
    height: 20px;
    display: flex;
    font-size: 15px;
  }
`;
const MenuImg = styled.div`
  width: 33%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  .imgContainer {
    width: 100%;
    height: 90%;
    img {
      width: 100%;
      height: 100%;
      border: 1px gray solid;
      border-radius: 12px;
    }
  }
`;
const MarketDetail = () => {
  const [market, setMarket] = useState();
  const [marketMenu, setMarketMenu] = useState();
  const [representativeNNormal, setRepresentativeNNormal] = useState();

  const { marketId } = useParams();
  let location = useLocation();
  //const { avgScore, viewCount, reviewCount } = location.state;

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

    var config2 = {
      method: "get",
      url: url + `/fooding/restaurant/${marketId}/menu`,
    };

    axios(config2)
      .then(function (response) {
        console.log(response.data);
        setMarketMenu(response.data);
        bringRepresentativeMenu(response.data);
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const bringRepresentativeMenu = (menuss) => {
    let representativeMenu = [];
    let normalMenu = [];
    menuss?.map((menu, index) => {
      if (menu.representative === true) {
        representativeMenu.push(menu);
      } else {
        normalMenu.push(menu);
      }
    });
    let representNnormal = representativeMenu.concat(normalMenu);
    console.log("representNnormal", representNnormal);
    setRepresentativeNNormal(representNnormal);
  };
  // useEffect(()=>{

  // },[representativeNNormal,market,marketMenu]);
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
            marketId: marketId,
          }}
        >
          <button>예약</button>
        </Link>
      </MarketMenuBox>
      <MarketDetailInfo>representativeNNormal</MarketDetailInfo>
      <MarketMenuInfo>
        {/* 대표메뉴 3,4개 나오고 슬라이드 버튼 누르면 나머지 메뉴 나오게
  만약에 대표메뉴가 있다면 그 메뉴를 우선 띄어줌 그리고 나머지 메뉴를 띄워줌.
  만약 대표메뉴가 없다면 문자열 순서대로 일반메뉴들 띄워줌.

*/}

        {
          //세개만 만들어놓음.
          representativeNNormal?.map((menu, index) => {
            if (index < 3) {
              return (
                <EachMenu>
                  <MenuContainer>
                    <MenuInfo>
                      <div className="MenuName">
                        {menu.representative == true ? (
                          <FontAwesomeIcon icon={faStar} />
                        ) : null}
                        {menu.name}
                      </div>
                      <div className="MenuDescription">
                        {menu.description.length > 32
                          ? menu.description.slice(0, 32) + "..."
                          : menu.description}
                      </div>
                      <div className="MenuPrice">
                        {menu.price}
                        <p>원</p>
                      </div>
                    </MenuInfo>
                    <MenuImg>
                      <div className="imgContainer">
                        <img src={menu.image}></img>
                      </div>
                    </MenuImg>
                  </MenuContainer>
                </EachMenu>
              );
            }
          })
        }
        {/* 메뉴 더보기 */}
      </MarketMenuInfo>
    </Container>
  );
};

export default MarketDetail;
