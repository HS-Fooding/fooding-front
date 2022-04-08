import Header from "./component/Header";
import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import { url } from "../Api";
import Menu from "./component/Menu";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 200px 0px;
`;
const InputFormDiv = styled.div`
  width: 700px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .NameForm {
    height: 500px;
    .BorderTop {
      border-top: ${(props) => props.theme.menuBorderColor};
    }
  }
  form {
    height: 400px;
    width: 100%;
    margin-bottom: 40px;
    position: relative;

    button {
      position: absolute;
      right: 0;
    }
    input {
      border: none;
      border-bottom: 1px solid white;
      width: 100%;
      height: 35px;
      font-size: 15px;
      /* padding-top: 10px;
      padding-bottom: 5px; */
      box-sizing: border-box;
    }
    textarea {
      width: 100%;
      height: 100%;
      border: none;
      font-size: 15px;
      box-sizing: border-box;
      resize: none;
    }

    input:focus,
    textarea:focus {
      outline: none;
    }
  }
`;
const Button = styled.button`
  border: none;
  margin-top: 5px;
  width: 100px;
  height: 35px;
  border-radius: 26px;
  cursor: pointer;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  border-bottom: ${(props) => props.theme.menuBorderColor};
`;
const MarketImgDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  position: relative;
  .MarketImgForm {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    & input[type="file"] {
      width: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
      border: none;
      display: none;
    }
    & label {
      width: 209px;
      height: 180px;
      position: absolute;
      background-color: white;
      left: 0;
      top: 0;
      /* z-index:2; */
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 45px;
      border: ${(props) => props.theme.menuBorderColor};
      cursor: pointer;
    }
  }
`;
const MarketImg = styled.img`
  width: 210px;
  height: 179px;

  /* position: absolute; */
  /* left: 0;
  top: 0; */
  object-fit: cover;
`;

const SliderDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoForm = styled.form`
  height: 500px;

  .AddressContainer,
  .ParkContainer,
  .UseTimeContainer {
    height: 40px;
  }
  .CategoryContainer {
    height: 70px;
  }
  .NumberContainer {
    height: 80px;
    margin-top: 10px;
  }
  .BorderTop {
    border-top: ${(props) => props.theme.menuBorderColor};
  }
  .Time {
    height: 80px;
    margin-top: 20px;
  }
`;
const NameBox = styled.div`
  width: 140px;
  height: 100%;
  background-color: ${(props) => props.theme.fillGrayColor};
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: ${(props) => props.theme.menuBorderColor};
`;
const SubBox = styled.div`
  width: 20%;
  height: 100%;
  background-color: ${(props) => props.theme.fillGrayColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InputBox = styled.div`
  width: 345px;
  height: 94%;
  margin-left: 3px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 0px;
  padding-bottom: 0px;
  .TimeDiv {
    display: flex;
    align-items: center;
    height: 35px;
    width: 100px;
    margin-left: 8px;
  }

  .TimeInputStyle {
    width: 35px;
  }
  .parkingLabel {
    display: flex;
  }
  input[type="radio"] {
    border: 0px;
    width: 50px;
    height: 3em;
    font-size: 5px;
    display: flex;
    align-items: center;
    background-color: blue;
  }
  .SelectCategoryContainer {
    margin-left: 30px;
    width: 100px;
  }
  .CategoryTags {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: 400px;
    height: 45px;

    .EachCategoryTag {
      display: flex;
      align-items: center;
      font-size: 12px;
      /* width:85px;         */
      height: 22px;
      color: gray;
      padding-right: 8px;
      border-radius: 5px;
      background-color: ${(props) => props.theme.fillGrayColor};
      margin-right: 6px;
      margin-bottom: 7px;
      .EachCategoryButton {
        display: flex;
        justify-content: center;
        align-items: center;
        /* border:0.5px solid gray; */
        border-radius: 3px;
        width: 15px;
        height: 14px;
        margin-left: 5px;
        margin-right: 7px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`;

const NumContainer = styled.div`
  width: 80%;
  height: 80px;

  .NumInputStyle {
    width: 80%;
    font-size: 15px;
    height: 25px;
    margin-left: 3px;
  }

  .InputNTitleContainer {
    width: 100%;
    height: 40px;
    &:nth-child(1),
    &:nth-child(3) {
      border-bottom: ${(props) => props.theme.menuBorderColor};
    }
    display: flex;
    align-items: center;
  }

  .TimeInput {
    width: 120px;
    font-size: 15px;
    height: 25px;

    margin-top: 1px;
    margin-left: 3px;
  }
`;

const SmallInput = styled.input``;
const InfoSpan = styled.span`
  margin-left: 10px;
`;
const StyledSlider = styled(Slider)`
  height: 100%; //슬라이드 컨테이너 영역

  svg:focus {
    outline: none;
  }

  .slick-list {
    //슬라이드 스크린
    width: 210px;
    height: 179px;
    //margin: 0 auto;
    overflow-x: hidden;
    background: transparent;
  }

  .slick-slide div {
    //슬라이더  컨텐츠
    /* cursor: pointer; */
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 179px;
    background-color: transparent;
    color: ${(props) => props.theme.fillGrayColor};
    &:active {
      outline: none;
    }
  }

  .slick-prev {
    /* position: absolute;
    left: 5px;
    width: 20px;
    height: 20px;
    z-index: 10px; */
    /* position: relative;
    left: 50px; */
    padding-left: 25px;
    z-index: 1;
  }

  .slick-dots {
    //슬라이드의 위치
    bottom: 1px;
    margin-top: 100px;
  }

  .slick-track {
    //이건 잘 모르겠음
    width: 100%;
  }
`;

function Register() {
  const { register, watch, getValues } = useForm();

  const [marketImgs, setMarketImgs] = useState([]);

  const [streetAddress, setStreetAddress] = useState({});
  const [categorySelected, setCategorySelected] = useState([]);
  const [categoryValueSelected, setCategoryValueSelected] = useState([]);
  const [file, setFile] = useState([]);
  const [marketId, setMarketId] = useState();

  const [weekdayTimeStartState, setWeekdayTimeStartState] =
    useState("11:00:00");
  const [weekdayTimeEndState, setWeekdayTimeEndState] = useState("21:00:00");
  const [weekendTimeStartState, setWeekendTimeStartState] =
    useState("11:00:00");
  const [weekendTimeEndState, setWeekendTimeEndState] = useState("21:00:00");
  const [getSuccess, setGetSuccess] = useState(false);
  const [marketInfo, setMarketInfo] = useState();

  const bringCategoryValue = (value) => {
    if (value === "KOREAN") return "한식";
    else if (value === "JAPANESE") return "일식";
    else if (value === "CHINESE") return "중식";
    else if (value === "WESTERN") return "양식";
    else if (value === "VIETNAM") return "베트남";
    else if (value === "TAIWAN") return "태국";
    else if (value === "SNACK") return "분식";
    else if (value === "NOODLE") return "면요리";
    else if (value === "BBQ") return "바베큐";
    else if (value === "PORK") return "돼지고기";
    else if (value === "BEEF") return "소고기";
    else if (value === "CHICKEN") return "닭고기";
    else if (value === "LAMB") return "양고기";
    else if (value === "CAFE") return "카페";
    else if (value === "DESSERT") return "디저트";
    else if (value === "BAR") return "바";
    else if (value === "PUB") return "술집";
  };
  let categoryList = [];
  // useEffect(()=>{
  //   let temp = categorySelected;
  //   categoryList.push(temp);
  //   console.log(categoryList);
  // },[categorySelected]);

  const getMarketInfo = () => {
    const getToken = localStorage.getItem("token");
    const id = localStorage.getItem("marketId");
    axios
      .get(url + `/fooding/restaurant/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken,
        },
      })
      .then((res) => {
        console.log("get 됨");
        console.log(res.data);
        setMarketInfo(res.data);
        setGetSuccess(true);
      })
      .catch((err) => {
        setGetSuccess(false);
        setMarketInfo(null);
      });
  };

  useEffect(() => {
    getMarketInfo();
  }, []);

  const weekdayTimeEndHandleForm = (e) => {
    const val = e.target.value;
    setWeekdayTimeEndState(val);
  };
  const weekdayTimeStartHandleForm = (e) => {
    const val = e.target.value;
    setWeekdayTimeStartState(val);
  };
  const weekendTimeEndHandleForm = (e) => {
    const val = e.target.value;
    setWeekendTimeEndState(val);
  };
  const weekendTimeStartHandleForm = (e) => {
    const val = e.target.value;
    setWeekendTimeStartState(val);
  };

  const marketImgChange = (e) => {
    e.preventDefault();
    // setMarketImg(URL.createObjectURL(e.target.files[0]));
    const img = (e.target.files[0]);

    const tempArr = [...marketImgs, img];
    setMarketImgs(tempArr);
    console.log("마켓이미지", tempArr);
    const prevFile = URL.createObjectURL(e.target.files[0]);
    setFile([...file, prevFile]);
    console.log("imgs: ", file);
    console.log("prevFile:", prevFile);
    e.target.value = "";
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const handleSelect = (e) => {
    if (!categoryValueSelected.includes(e.target.value)) {
      setCategoryValueSelected((currentArray) => [
        ...currentArray,
        e.target.value,
      ]);
      console.log("valueList", categoryValueSelected);
    }
    if (
      !categorySelected.includes(e.target.options[e.target.selectedIndex].text)
    ) {
      setCategorySelected((currentArray) => [
        ...currentArray,
        e.target.options[e.target.selectedIndex].text,
      ]);
      console.log("list", categorySelected);
    }
  };
  const categoryButtonClick = (index) => {
    setCategorySelected(
      categorySelected.filter((item, categoryIndex) => index !== categoryIndex)
    );
    setCategoryValueSelected(
      categoryValueSelected.filter(
        (item, categoryIndex) => index !== categoryIndex
      )
    );
    console.log("list", categorySelected);
    console.log("value list", categoryValueSelected);
  };

  const submitInfo = (e) => {
    var axios = require("axios");
    e.preventDefault();
    const values = getValues();
    let changeToMinutes =
      parseInt(values.availableHour * 60) + parseInt(values.availableMinute);
    console.log("values", values);
    const getToken = localStorage.getItem("token");
    let data = new FormData();
    const address = values.address;
    let street;
    axios
      .post(url + "/fooding/geocode", address, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken,
        },
      })
      .then((res) => {
        console.log("post 됨");
        console.log(res.data);
        setStreetAddress(res.data);
        street = res.data;
      })
      .then((res) => {})
      .then(() => {
        const content = {
          name: values.businessName,
          tel: [values.businessNum, values.personalNum],
          weekdaysWorkHour: {
            open: weekdayTimeStartState,
            close: weekdayTimeEndState,
          },
          weekendsWorkHour: {
            open: weekendTimeStartState,
            close: weekendTimeEndState,
          },
          intro: values.detail,
          location: street,
          category: categoryValueSelected,
          parkingInfo: values.parking,
          maximumUsageTime: changeToMinutes,
        };
        console.log("content이전", content);
        data.append(
          "restaurant",
          new Blob([JSON.stringify(content)], { type: "application/json" })
        );
        marketImgs.map((img) => {
          data.append("image", img);
        });
        console.log(data);
        axios
          .post(url + "/fooding/admin/restaurant", data, {
            headers: {
              "Content-Type": "multipart/form-data",
              //  "Content-Type": "application/json",
              Authorization: "Bearer " + getToken,
            },
          })
          .then((res) => {
            console.log("마켓 아이디", res.data);
            setMarketId(res.data);
            localStorage.setItem("marketId", res.data);
            getMarketInfo();
          })
          .catch((err) => {
         
            console.log("content 컨텐츠", content);
            console.log("img", marketImgs);
            console.log(err);
          });
      });
  };

  return (
    <Container>
      <Header />

      <InputFormDiv>
        <form className="NameForm">
          <div
            style={{
              width: "100%",
              height: "150px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "70%" }}>
              <InputContainer className="BorderTop">
                <NameBox>
                  <p>상호명</p>
                </NameBox>
                <InputBox>
                  {marketInfo === null ? (
                    <input
                      {...register("businessName")}
                      placeholder="상호명을 입력하시오."
                    />
                  ) : (
                    <InfoSpan>{marketInfo?.name}</InfoSpan>
                  )}
                </InputBox>
              </InputContainer>
              <InputContainer style={{ height: "120px" }}>
                <NameBox>
                  <p>상세설명</p>
                </NameBox>
                <InputBox>
                  {marketInfo === null ? (
                    <textarea
                      {...register("detail")}
                      style={{ fontFamily: "Roboto" }}
                      placeholder="상세설명을 입력하시오"
                    />
                  ) : (
                    <InfoSpan>{marketInfo?.intro}</InfoSpan>
                  )}
                </InputBox>
              </InputContainer>
            </div>

            <div style={{ width: "30%", height: "180px" }}>
              <InputContainer style={{ height: "100%" }}>
                <MarketImgDiv>
                  <form className="MarketImgForm">
                    <input
                      id="market_img_input"
                      type="image"
                      type="file"
                      accept="image/jpg,image/png,image/jpeg,image/gif"
                      name="market_img"
                      onChange={marketImgChange}
                    />
                    <label htmlFor="market_img_input">
                      <SliderDiv>
                        <StyledSlider {...settings}>
                          {file?.length !== 0 ? (
                            file?.map((one, index) => (
                              <div>
                                <MarketImg src={one} key={index} />
                              </div>
                            ))
                          ) : (
                            <FontAwesomeIcon
                              style={{ color: "rgba(0, 0, 0, 0.1)" }}
                              icon={faCamera}
                            />
                          )}{" "}
                        </StyledSlider>
                      </SliderDiv>
                    </label>
                  </form>
                </MarketImgDiv>
              </InputContainer>
            </div>
          </div>
        </form>
        <InfoForm>
          <InputContainer className="AddressContainer BorderTop">
            <NameBox>
              <p>주소</p>
            </NameBox>
            <InputBox style={{ width: "80%" }}>
              {marketInfo === null ? (
                <input
                  className="NumInputStyle"
                  {...register("address")}
                  placeholder="주소를 입력하시오"
                  style={{ marginTop: "1px" }}
                />
              ) : (
                <InfoSpan>{marketInfo?.location.addressName}</InfoSpan>
              )}
            </InputBox>
          </InputContainer>
          <InputContainer className="ParkContainer">
            <NameBox>
              <p>주차 정보</p>
            </NameBox>
            <InputBox style={{ width: "80%" }}>
              {marketInfo === null ? (
                <>
                  <label className="parkingLabel" htmlFor="can">
                    <input
                      {...register("parking", { required: true })}
                      type="radio"
                      name="parking"
                      value="주차 공간 있음"
                      className="form-check-input"
                      id="can"
                    />
                    <p>가능</p>
                  </label>
                  <label className="parkingLabel" htmlFor="cant">
                    <input
                      {...register("parking", { required: true })}
                      type="radio"
                      name="parking"
                      value="주차 공간 없음"
                      className="form-check-input"
                      id="cant"
                    />
                    <p>불가능</p>
                  </label>
                </>
              ) : (
                <InfoSpan>{marketInfo?.parkingInfo}</InfoSpan>
              )}
            </InputBox>
          </InputContainer>
          <InputContainer className="UseTimeContainer">
            <NameBox>
              <p>최대 이용 시간</p>
            </NameBox>
            <InputBox style={{ width: "80%", paddingLeft: "15px" }}>
              {marketInfo === null ? (
                <>
                  <div className="TimeDiv">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      className="TimeInputStyle"
                      {...register("availableHour")}
                      style={{ marginTop: "1px" }}
                    />
                    <p>시간</p>
                  </div>
                  <div className="TimeDiv">
                    <input
                      type="number"
                      step="10"
                      min="10"
                      max="50"
                      className="TimeInputStyle"
                      {...register("availableMinute")}
                      style={{ marginTop: "1px" }}
                    />
                    <p>분</p>
                  </div>
                </>
              ) : (
                <span>
                  {Math.floor(marketInfo?.maximumUsageTime / 60)}시간{" "}
                  {marketInfo?.maximumUsageTime % 60}분
                </span>
              )}
            </InputBox>
          </InputContainer>
          <InputContainer className="CategoryContainer">
            <NameBox>
              <p>카테고리</p>
            </NameBox>
            <InputBox
              style={{
                width: "80%",
                display: "flex",
                justifyContent: "flexStart",
              }}
            >
              {marketInfo === null ? (
                <div className="SelectCategoryContainer">
                  <select onChange={handleSelect} value={categorySelected}>
                    <option></option>
                    <option value="KOREAN" selected>
                      한식
                    </option>
                    <option value="JAPANESE">일식</option>
                    <option value="CHINESE">중식</option>
                    <option value="WESTERN">양식</option>
                    <option value="TAIWAN">태국</option>
                    <option value="VIETNAM">베트남</option>
                    <option value="SNACK">분식</option>
                    <option value="NOODLE">면요리</option>
                    <option value="BBQ">바베큐</option>
                    <option value="PORK">돼지고기</option>
                    <option value="BEEF">소고기</option>
                    <option value="CHICKEN">닭고기</option>
                    <option value="LAMB">양고기</option>
                    <option value="BAR">바</option>
                    <option value="PUB">술집</option>
                    <option value="CAFE">카페</option>
                    <option value="DESSERT">디저트</option>
                  </select>
                </div>
              ) : (
                <div
                  style={{ width: "500px", height: "55px", display: "flex" }}
                >
                  <ul className="CategoryTags">
                    {marketInfo?.category.map((one, index) => {
                      return (
                        <div style={{ display: "inlineBlock" }}>
                          <li
                            key={index}
                            className="EachCategoryTag"
                            style={{ margin: "0px 5px", padding: "0px 15px" }}
                          >
                            {bringCategoryValue(one)}
                          </li>
                        </div>
                      );
                    })}
                  </ul>
                </div>
              )}
              {marketInfo === null ? (
                <ul className="CategoryTags">
                  {categorySelected.map((value, index) => {
                    return (
                      <div style={{ display: "inlineBlock" }}>
                        <li key={index} className="EachCategoryTag">
                          <div
                            className="EachCategoryButton"
                            onClick={() => categoryButtonClick(index)}
                          >
                            X
                          </div>
                          <p>{value}</p>
                        </li>
                      </div>
                    );
                  })}
                </ul>
              ) : null}
            </InputBox>
          </InputContainer>
          <InputContainer className="NumberContainer BorderTop">
            <NameBox>
              <p>번호</p>
            </NameBox>
            <NumContainer>
              <div className="InputNTitleContainer">
                <SubBox>사업자 번호</SubBox>
                {marketInfo === null ? (
                  <input
                    className="NumInputStyle"
                    {...register("businessNum")}
                    placeholder="번호를 입력하시오"
                    style={{ marginTop: "1px" }}
                  />
                ) : (
                  <InfoSpan>{marketInfo?.tel[0]}</InfoSpan>
                )}
              </div>
              <div className="InputNTitleContainer">
                <SubBox>개인 번호</SubBox>
                {marketInfo === null ? (
                  <input
                    className="NumInputStyle"
                    {...register("personalNum")}
                    placeholder="번호를 입력하시오"
                    style={{ alignItems: "center" }}
                  />
                ) : (
                  <InfoSpan>{marketInfo?.tel[1]}</InfoSpan>
                )}
              </div>
            </NumContainer>
          </InputContainer>
          {/* </div> */}
          {/* <div style={{ width: "100%", height: "400px", marginTop:"10px" }}> */}
          <InputContainer className="Time BorderTop">
            <NameBox>
              <p>시간</p>
            </NameBox>
            <NumContainer>
              <div className="InputNTitleContainer">
                <SubBox>평일 시간대</SubBox>
                {marketInfo === null ? (
                  <>
                    <input
                      type="time"
                      value={weekdayTimeStartState}
                      className="TimeInput"
                      onChange={weekdayTimeStartHandleForm}
                      //  {...register("weekdayTimeStart")}
                    />
                    <p>부터</p>
                    <input
                      type="time"
                      value={weekdayTimeEndState}
                      onChange={weekdayTimeEndHandleForm}
                      className="TimeInput"
                    />
                    <p>까지</p>
                  </>
                ) : (
                  <InfoSpan>
                    {marketInfo?.weekdaysWorkHour.open}~
                    {marketInfo?.weekdaysWorkHour.close}{" "}
                  </InfoSpan>
                )}
              </div>
              <div className="InputNTitleContainer">
                <SubBox>주말 시간대</SubBox>
                {marketInfo === null ? (
                  <>
                    <input
                      type="time"
                      className="TimeInput"
                      onChange={weekendTimeStartHandleForm}
                      value={weekendTimeStartState}
                    />
                    <p>부터</p>
                    <input
                      type="time"
                      className="TimeInput"
                      onChange={weekendTimeEndHandleForm}
                      value={weekendTimeEndState}
                    />
                    <p>까지</p>
                  </>
                ) : (
                  <InfoSpan>
                    {" "}
                    {marketInfo?.weekendsWorkHour.open}~
                    {marketInfo?.weekendsWorkHour.close}{" "}
                  </InfoSpan>
                )}
              </div>
            </NumContainer>
          </InputContainer>
          {/* 주차정보 , 최대 이용 시간*/}
          {/* </div> */}

          <Button onClick={submitInfo}>등록</Button>
        </InfoForm>
      </InputFormDiv>
      <Menu marketId={marketId} />
    </Container>
    // </div>
  );
}
export default Register;