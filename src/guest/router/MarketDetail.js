import React, { useEffect, useState, Component } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../component/Header";
import { url } from "../../Api";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MultipleSlider from "../component/MultipleSlider";
import "@fortawesome/fontawesome-free/js/all.js";
import {
  faCaretRight,
  faCaretDown,
  faEye,
  faPencil,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
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
  height: 150px;
  //background-color: orange;
  margin-top: 16px;
`;

const MarketTitleBox = styled.div`
  width: 100%;
  height: 110px;
  border-bottom: 1px solid ${(props) => props.theme.borderGrayColor};
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  align-items: center;

  span {
    margin: 10px 5px;
    font-size: 13px;
  }
  .leftInfos {
    display: flex;
    flex-direction: column;
    .marketName {
      font-size: 23px;
      margin-bottom: 20px;
    }
  }
  .avgScore {
    font-size: 25px;
    font-weight: bold;
    color: ${(props) => props.theme.mainColor};
  }
`;

const MarketMenuBox = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.borderGrayColor};
`;

const MenuBtnBox = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  list-style: none;
  a {
    text-decoration: none;
  }
  svg {
    font-size: 30px;
    color: ${(props) => props.theme.mainColor};
  }
  span {
    font-size: 13px;
    margin: 0 auto;
    color: ${(props) => props.theme.mainColor};
  }
`;

const MarketDetailInfo = styled.div`
  width: 100%;
  /* height: 300px; */
  height: auto;
  /* margin: 20px 0px; */
  //background-color: skyblue;
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-size: 14px;
  border-bottom: 1px solid ${(props) => props.theme.borderGrayColor};
  .InfosBox {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    /* padding: 10px; */
    //background-color: teal;
    padding: 14px 0px;
  }

  .marketDesc {
    font-size: 17px;
    font-weight: bold;
    margin: 15px 0px;
  }

  p {
    /* letter-spacing: 0.1em; */
    line-height: 1.5;
  }
  .marketIntro {
  }
`;

const EachInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0px;
`;

const MarketMenuInfo = styled.div`
  width: 100%;
  height: 700px;
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
      border-radius: 12px;
    }
  }
`;

const MoreMenu = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  p {
    margin-left: 20px;
  }
  .iconContainer {
    margin-left: 5px;
    font-size: 20px;
  }
`;
const MarketDetail = () => {
  const [market, setMarket] = useState();
  const [marketMenu, setMarketMenu] = useState();
  const [representativeNNormal, setRepresentativeNNormal] = useState();
  const [toggle, setToggle] = useState(false);
  const { marketId } = useParams();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    console.log("marketId", marketId);
    localStorage.setItem("marketId", marketId);
    var config = {
      method: "get",
      url: url + `/fooding/restaurant/${marketId}`,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setMarket(response.data);
        const korCategory = response.data.category.map((category) => {
          if (category === "KOREAN") return "한식";
          else if (category === "JAPANESE") return "일식";
          else if (category === "CHINESE") return "중식";
          else if (category === "WESTERN") return "양식";
          else if (category === "VIETNAM") return "베트남";
          else if (category === "TAIWAN") return "태국";
          else if (category === "SNACK") return "분식";
          else if (category === "NOODLE") return "면요리";
          else if (category === "BBQ") return "바베큐";
          else if (category === "PORK") return "돼지고기";
          else if (category === "BEEF") return "소고기";
          else if (category === "CHICKEN") return "닭고기";
          else if (category === "LAMB") return "양고기";
          else if (category === "CAFE") return "카페";
          else if (category === "DESSERT") return "디저트";
          else if (category === "BAR") return "바";
          else if (category === "PUB") return "술집";
        });

        console.log(korCategory);
        setCategory(korCategory);

        localStorage.setItem(
          "weekdaysWorkHour",
          JSON.stringify(response.data.weekdaysWorkHour)
        );
        localStorage.setItem(
          "weekendsWorkHour",
          JSON.stringify(response.data.weekendsWorkHour)
        );
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
      .then(function () {})
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const bringRepresentativeMenu = (menuss) => {
    let representativeMenu = [];
    let normalMenu = [];
    menuss?.map((menu) => {
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
  const seeMoreMenu = () => {
    setToggle((toggle) => !toggle);
  };
  return (
    <Container>
      <Header back="/guest/restaurantList" title={""} />

      <MarketImgsBox>
        <MultipleSlider images={market?.images} />
      </MarketImgsBox>
      <MarketTitleBox>
        <div className="leftInfos">
          <span className="marketName">{market?.name}</span>
          <div>
            <span style={{ color: "gray" }}>
              {" "}
              <FontAwesomeIcon icon={faEye} /> {market?.viewCount}
            </span>
            <span style={{ color: "gray" }}>
              {" "}
              <FontAwesomeIcon icon={faPencil} style={{ marginRight: "6px" }} />
              {market?.reviewCount}
            </span>
          </div>
        </div>
        <div className="avgScore">{market?.avgScore}</div>
      </MarketTitleBox>
      <MarketMenuBox>
        <MenuBtnBox>
          <i class="fa-solid fa-star"></i>
          <span>즐겨찾기</span>
        </MenuBtnBox>
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to="/guest/reservation1"
          state={{
            maximumUsageTime: market?.maximumUsageTime,
            weekdaysWorkHour: market?.weekdaysWorkHour,
            weekendsWorkHour: market?.weekendsWorkHour,
            marketId: marketId,
          }}
        >
          <MenuBtnBox>
            <i className="fa-solid fa-calendar-days reservation"></i>

            <span>예약하기</span>
          </MenuBtnBox>
        </Link>
        <MenuBtnBox>
          <i class="fa-solid fa-pen"></i>
          <span>리뷰쓰기</span>
        </MenuBtnBox>
      </MarketMenuBox>
      <MarketDetailInfo>
        {/* 매장소개, 운영시간,주소,전화번호(매장,개인),주차공간,최대이용가능시간,카테고리, */}
        <span className="marketDesc">매장 소개</span>
        <p clasName="marketIntro">{market?.intro}</p>
        <div className="InfosBox">
          <span className="marketDesc">편의정보</span>
          <EachInfo>
            <span>카테고리</span>
            <div>
              {category?.map((c, index) =>
                category.length == index + 1 ? (
                  <span style={{ marginLeft: "4px" }}>{c} </span>
                ) : (
                  <span style={{ marginLeft: "4px" }}>{c} /</span>
                )
              )}
            </div>
          </EachInfo>
          <EachInfo>
            <span>영업시간</span>
            <span>
              주중 {market?.weekdaysWorkHour.open.substring(0, 5)}-
              {market?.weekdaysWorkHour.close.substring(0, 5)} 주말{" "}
              {market?.weekendsWorkHour.open.substring(0, 5)}-
              {market?.weekendsWorkHour.close.substring(0, 5)}
            </span>
          </EachInfo>
          <EachInfo>
            <span>주소</span>
            <span>{market?.location.addressName}</span>
          </EachInfo>
          <EachInfo>
            <span>주차정보</span>
            <span>{market?.parkingInfo}</span>
          </EachInfo>
          <EachInfo>
            <span>개인번호</span>
            <span>{market?.tel[0]}</span>
          </EachInfo>
          <EachInfo>
            <span>사업자번호</span>
            <span>{market?.tel[1]}</span>
          </EachInfo>
        </div>
      </MarketDetailInfo>
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
        <MoreMenu onClick={seeMoreMenu}>
          <p>메뉴 더보기</p>
          <div className="iconContainer">
            {toggle ? (
              <FontAwesomeIcon icon={faCaretDown} />
            ) : (
              <FontAwesomeIcon icon={faCaretRight} />
            )}
          </div>
        </MoreMenu>
        {/* 메뉴 더보기 div 전체를 누르면  펼쳐진 상태가 되고 그옆에 아이콘도 아래로 바뀜*/}
        {toggle
          ? representativeNNormal?.map((menu, index) => {
              if (index >= 3) {
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
          : null}
      </MarketMenuInfo>
    </Container>
  );
};

export default MarketDetail;
