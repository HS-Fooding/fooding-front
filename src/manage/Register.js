import Header from "./component/Header";
import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import SimpleSlider from "./SimpleSlider";
import Slider from "react-slick";
import { url } from "../Api";
import Menu from "./component/Menu";

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
  height: 400px;
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
  height: 300px;

  .AddressContainer {
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
  const [price, setPrice] = useState("");
  const { register, watch, getValues } = useForm();

  const [marketImgs, setMarketImgs] = useState([]);

  const [streetAddress, setStreetAddress] = useState({});
  const [categorySelected, setCategorySelected] = useState([]);
  const [categoryValueSelected, setCategoryValueSelected] = useState([]);
  const [file,setFile]=useState([]);
  let categoryList = [];
  // useEffect(()=>{
  //   let temp = categorySelected;
  //   categoryList.push(temp);
  //   console.log(categoryList);
  // },[categorySelected]);

  const marketImgChange = (e) => {
    e.preventDefault();
    // setMarketImg(URL.createObjectURL(e.target.files[0]));
    const img = URL.createObjectURL(e.target.files[0]);

    const tempArr = [...marketImgs, img];
    setMarketImgs(tempArr);
    console.log("마켓이미지",tempArr);
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
    console.log("list", categorySelected);
  };
 
  const submitInfo = (e) => {
    var axios = require("axios");
    e.preventDefault();
    const values = getValues();
    console.log("values", values);
    const getToken = localStorage.getItem("token");
    const data = new FormData();
    const address = values.address;
    let street;
    // axios
    //   .post(url + "/fooding/geocode", address, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + getToken,
    //     },
    //   })
    //   .then((res) => {
    //     console.log("post 됨");
    //     console.log(res.data);
    //     setStreetAddress(res.data);
    //     street=res.data;
    
    //   }).then((res) => {
       
    //   });
      const content = {
        name : values.businessName,
        tel : [values.businessNum, values.personalNum],
        weekdaysWorkHour : {
            open : values.weekdayTimeStart,
            close :values.weekdayTimeEnd,
        },
        weekendsWorkHour : {
            open : values.weekendTimeStart,
            close :values.weekendTimeEnd ,
        },
        intro : values.detail,
        location : {"addressName":"서울 송파구 삼학사로13길 16","region1Depth":"서울","region2Depth":"송파구","region3Depth":"삼전동","roadName":"삼학사로13길","buildingNo":"16","coordinate":{"x":127.09524,"y":37.50346}},
        category : ["CHINESE"], //categoryValueSelected,
      };
      console.log("content이전",content);
      data.append("restaurant",  new Blob([JSON.stringify(content)], { type: "application/json" }));
      marketImgs.map((img) => {
        data.append("image", img);
      });
      axios
      .post(url + "/fooding/admin/restaurant", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + getToken,
        },

      }).then((res)=>{
        console.log("마켓 아이디",res);

      })
      .catch((err) => {
        console.log("content 컨텐츠",content);
        console.log("img",marketImgs);
        console.log(err);
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
                  <input
                    {...register("businessName")}
                    placeholder="상호명을 입력하시오."
                  />
                </InputBox>
              </InputContainer>
              <InputContainer style={{ height: "120px" }}>
                <NameBox>
                  <p>상세설명</p>
                </NameBox>
                <InputBox>
                  <textarea
                    {...register("detail")}
                    style={{ fontFamily: "Roboto" }}
                    placeholder="상세설명을 입력하시오"
                  />
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
                          {marketImgs?.length !== 0 ? (
                            marketImgs?.map((one, index) => (
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
          {/* 주소 입력  */}
          {/* <div style={{ width: "100%", height: "100px",}}> */}
          <InputContainer className="AddressContainer BorderTop">
            <NameBox>
              <p>주소</p>
            </NameBox>
            <InputBox style={{ width: "80%" }}>
              {/* <div className="InputAddressContainer"> */}
              <input
                className="NumInputStyle"
                {...register("address")}
                placeholder="주소를 입력하시오"
                style={{ marginTop: "1px" }}
              />
              {/* </div> */}
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
              {/* <div style={{color:"white"}}></div> */}
              {/* <div>수정된 카테고리 {categorySelected}</div> */}
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
            </InputBox>
          </InputContainer>
          <InputContainer className="NumberContainer BorderTop">
            <NameBox>
              <p>번호</p>
            </NameBox>
            <NumContainer>
              <div className="InputNTitleContainer">
                <SubBox>사업자 번호</SubBox>
                <input
                  className="NumInputStyle"
                  {...register("businessNum")}
                  placeholder="번호를 입력하시오"
                  style={{ marginTop: "1px" }}
                />
              </div>
              <div className="InputNTitleContainer">
                <SubBox>개인 번호</SubBox>
                <input
                  className="NumInputStyle"
                  {...register("personalNum")}
                  placeholder="번호를 입력하시오"
                  style={{ alignItems: "center" }}
                />
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
                <input
                  type="time"
                  value="11:00:00"
                  className="TimeInput"
                  {...register("weekdayTimeStart")}
                />
                <p>부터</p>
                <input
                  type="time"
                  value="21:00:00"
                  className="TimeInput"
                  {...register("weekdayTimeEnd")}
                />
                <p>까지</p>
              </div>
              <div className="InputNTitleContainer">
                <SubBox>주말 시간대</SubBox>
                <input
                  value="11:00:00"
                  type="time"
                  className="TimeInput"
                  {...register("weekendTimeStart")}
                />
                <p>부터</p>
                <input
                  value="21:00:00"
                  type="time"
                  className="TimeInput"
                  {...register("weekendTimeEnd")}
                />
                <p>까지</p>
              </div>
            </NumContainer>
          </InputContainer>

          {/* </div> */}
          <Button onClick={submitInfo}>등록</Button>
        </InfoForm>
      </InputFormDiv>
      <Menu />
    </Container>
    // </div>
  );
}
export default Register;
