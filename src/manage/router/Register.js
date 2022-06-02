import Header from "../component/Header";
import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import { url } from "../../Api";
import Menu from "../component/Menu";
import axios from "axios";
import MyCanvas from "../component/MyCanvas";
import NumericInput from "react-numeric-input";
import ShowHow from "../component/ShowHow";
import { BsQuestionCircleFill, BsPlusSquare } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { AnimatePresence } from "framer-motion";
import "@fortawesome/fontawesome-free/js/all.js";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin: 200px 0px; */
  padding: 100px 0px;
`;
const InputFormDiv = styled.div`
  width: 900px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 200px;
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
  background-color: ${(props) => props.theme.mainColor};
  color: white;
  /* transition: transform 300ms ease;

  &:hover {
    transform: scale(1.05);
  } */
`;
const ButtonContainer = styled.div`
  width: 100%;
  height: 40px;

  .button {
    margin-top: 15px;
    float: right;
  }
`;
const InputContainer = styled.div`
  display: flex;
  /* justify-content: space-between; */
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
    width: 200px;
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
  .BorderBottom {
    border-bottom: ${(props) => props.theme.menuBorderColor};
  }
  .Time {
    height: 80px;
    margin-top: 10px;
  }
  .timeContainer {
    display: flex;
    align-items: center;
    width: 500px;
    margin-left: 20px;
  }
`;
const NameBox = styled.div`
  width: 160px;
  height: 100%;
  background-color: ${(props) => props.theme.menuOrangeColor};
  color: black;
  border: none;

  /* font-weight: bold; */
  //background-color: ${(props) => props.theme.fillGrayColor};
  display: flex;
  justify-content: center;
  align-items: center;
  //border-right: ${(props) => props.theme.menuBorderColor};
`;
const SubBox = styled.div`
  width: 20%;
  height: 100%;
  background-color: ${(props) => props.theme.menuOrangeColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InputBox = styled.div`
  width: 525px;
  height: 94%;
  margin-left: 13px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 0px;
  padding-bottom: 0px;
  .parkingInfo {
    width: 450px;
  }
  .TimeDiv {
    display: flex;
    align-items: center;
    height: 15px;
    width: 100px;

    margin-left: 8px;
    p {
      width: 130px;
    }
  }

  .TimeInputStyle {
    width: 100px;
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
    margin-left: 22px;
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
      background-color: ${(props) => props.theme.mainColor};
      color: white;
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
  border-top: 1px solid rgba(222, 222, 222, 0.93);

  .NumInputStyle {
    width: 80%;
    font-size: 15px;
    height: 25px;
    margin-left: 3px;
  }

  .InputNTitleContainer {
    width: 103%;
    height: 39px;
    &:nth-child(1),
    &:nth-child(3) {
      border-bottom: 1px ${(props) => props.theme.menuBorderColor};
    }
    display: flex;
    align-items: center;
  }
  .setTimeContainer {
    &:nth-child(2) {
      margin-left: 13px;
    }
  }
  .TimeInput {
    width: 120px;
    font-size: 15px;
    height: 25px;

    margin-top: 1px;
    margin-left: 3px;
  }
`;

const InfoSpan = styled.span`
  margin-left: 10px;
  line-height: normal;
`;
const InfoDiv = styled.div`
  margin-left: 23px;
  width: 500px;
  line-height: normal;
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
    width: 100%;
  }
`;
const AppendFloor = styled.div`
  width: 100px;
  height: 40px;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.veryLightMainColor};
  color: ${(props) => props.theme.mainColor};
  :hover {
    cursor: pointer;
  }
`;
const CanvasContainer = styled.div`
  position: relative;
  margin-top: 0px;
  width: 1000px;
  height: 700px;
  display: flex;
  flex-direction: column;
`;
const CanvasOptionContainer = styled.div`
  width: 1000px;
  height: 40px;
  display: flex;

  justify-content: space-between;
  // align-items: center;
  margin-bottom: 20px;
`;
const FloorContainer = styled.div`
  width: 800px;
  height: 40px;
  display: flex;
  .floorPlusBtn {
    font-size: 40px;
    background-color: ${(props) => props.theme.veryLightMainColor};
    color: ${(props) => props.theme.mainColor};
  }
  .floorPlusBtn:hover {
    cursor: pointer;
  }
  .floorCancelCss {
    color: #ffe2bc;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    margin-left: 5px;
  }
  .floorCancelCss:hover {
    cursor: pointer;
  }
`;
const StructureDesc = styled.div`
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Step = styled.div`
  margin-bottom: 40px;
  nav {
    top: 50%;
    right: 0;
    left: 0;
    width: 800x;
    display: table;
    margin: 0 auto;
    transform: translateY(-50%);
  }

  nav button {
    position: relative;
    width: auto;
    display: table-cell;
    text-align: center;
    color: #949494;
    text-decoration: none;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: bold;
    padding: 10px 10px;
    margin-right: 30px;
    transition: 0.2s ease color;
    outline: none;
    background: inherit;
    border: none;
    cursor: pointer;
    font-size: 18px;
  }

  nav button:before,
  nav button:after {
    content: "";
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    transition: 0.2s ease transform;
  }

  nav button:before {
    top: 0;
    left: 10px;
    width: 6px;
    height: 6px;
  }

  nav button:after {
    top: 5px;
    left: 18px;
    width: 4px;
    height: 4px;
  }

  nav button:nth-child(1):before {
    background-color: yellow;
  }

  nav button:nth-child(1):after {
    background-color: red;
  }

  nav button:nth-child(2):before {
    background-color: #00e2ff;
  }

  nav button:nth-child(2):after {
    background-color: #89ff00;
  }

  nav button:nth-child(3):before {
    background-color: purple;
  }

  nav button:nth-child(3):after {
    background-color: palevioletred;
  }

  #indicator {
    position: absolute;
    left: 13px;
    bottom: 0;
    width: 30px;
    height: 3px;
    background-color: #fff;
    border-radius: 5px;
    transition: 0.2s ease left;
    /* margin-right: 40px; */
  }

  nav button:nth-child(2) {
    color: ${(props) => (props.status == 2 ? "#FF7B54" : "rgba(0, 0, 0, 0.3)")};
  }
  nav button:nth-child(1) {
    color: ${(props) => (props.status == 1 ? "#FF7B54" : "rgba(0, 0, 0, 0.3)")};
  }
  nav button:nth-child(3) {
    color: ${(props) => (props.status == 3 ? "#FF7B54" : "rgba(0, 0, 0, 0.3)")};
  }

  nav button:hover {
    color: "#FF7B54";
  }

  nav button:hover:before,
  nav button:hover:after {
    transform: scale(1);
  }

  /* nav button:nth-child(1) ~ #indicator {
    background: ${(props) =>
    props.status == 1 ? "linear-gradient(130deg, yellow, red)" : "none"};
  }

  nav button:nth-child(2) ~ #indicator {
    left: 34%;

    background: ${(props) =>
    props.status == 2 ? " linear-gradient(130deg, #00e2ff, #89ff00)" : "none"};
  } */

  nav button:nth-child(1):hover ~ #indicator {
    background: linear-gradient(130deg, yellow, red);
  }

  nav button:nth-child(2):hover ~ #indicator {
    left: 34%;
    background: linear-gradient(130deg, #00e2ff, #89ff00);
  }

  nav button:nth-child(3):hover ~ #indicator {
    left: 70%;
    background: linear-gradient(130deg, purple, palevioletred);
  }
`;

const appearDisappear = keyframes`
    0%{
      opacity:0;
    }
    50%{
      opacity:1.0;
    }
    100%{
      opacity:0;
      
    }
`;

const Modal = styled.div`
  z-index: 1;
  position: absolute;
  width: 300px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50px;
  background-color: gray;
  color: white;
  border-radius: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  opacity: 0;
  animation: ${appearDisappear} 3s ease-in-out;
`;

const ArrowUp = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.mainColor};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  opacity: ${(props) => (props.BtnStatus ? "1" : "0")};

  svg {
    font-size: 26px;
  }

  cursor: pointer;
`;

const Register = () => {
  const [marketImgs, setMarketImgs] = useState([]);
  const [streetAddress, setStreetAddress] = useState({});
  const [categorySelected, setCategorySelected] = useState([]);
  const [categoryValueSelected, setCategoryValueSelected] = useState([]);
  const [file, setFile] = useState([]);
  const [marketId, setMarketId] = useState();
  const [availableHour, setAvailableHour] = useState(0);
  const [availableMinute, setAvailableMinute] = useState(30);

<<<<<<< HEAD
  const [weekdayTimeStartState, setWeekdayTimeStartState] = useState("11:00");
  const [weekdayTimeEndState, setWeekdayTimeEndState] = useState("21:00");
  const [weekendTimeStartState, setWeekendTimeStartState] = useState("11:00");
  const [weekendTimeEndState, setWeekendTimeEndState] = useState("21:00");
  const [getSuccess, setGetSuccess] = useState(false);
  const [marketInfo, setMarketInfo] = useState();
  const [floor, setFloor] = useState([true]);
  const [floorNum, setFloorNum] = useState(null);
  const [currentMaxFloor, setCurrentMaxFloor] = useState();
  const [selectedFloor, setSelectedFloor] = useState(0);
  const [clickShowHow, setClickShowHow] = useState(false);
=======
    const [weekdayTimeStartState, setWeekdayTimeStartState] = useState("11:00");
    const [weekdayTimeEndState, setWeekdayTimeEndState] = useState("21:00");
    const [weekendTimeStartState, setWeekendTimeStartState] = useState("11:00");
    const [weekendTimeEndState, setWeekendTimeEndState] = useState("21:00");
    const [getSuccess, setGetSuccess] = useState(false);
    const [marketInfo, setMarketInfo] = useState();
    const [floor, setFloor] = useState([true]);
    const [floorNum, setFloorNum] = useState(null);
    const [currentMaxFloor, setCurrentMaxFloor] = useState();
    const [selectedFloor, setSelectedFloor] = useState(0);
    const [clickShowHow, setClickShowHow] = useState(false);
>>>>>>> 2ca10ffbb639d73e824ac77596729ddae5bc8b67

  const [marketImages, setMarketImages] = useState([]);

  const [alertModal, setAlertModal] = useState(false);
  const [failModal, setFailModal] = useState(false);
  const [alertStructure, setAlertStructure] = useState(false);
  const [alertInfo, setAlertInfo] = useState(false);

  const [ScrollY, setScrollY] = useState(0); // 스크롤값을 저장하기 위한 상태
  const [BtnStatus, setBtnStatus] = useState(false); // 버튼 상태

  const [nav, setNav] = useState(1);

  const infoRef = useRef();
  const menuRef = useRef();
  const structRef = useRef();

  const initValue = {
    availableMinute: 0,
    availableHour: 1,
  };
  const { register, getValues } = useForm({
    defaultValues: initValue,
  });

  let floors = [];

  const getToken = localStorage.getItem("managerToken");
  const id = localStorage.getItem("marketId");

  const FloorButton = styled.div`
    width: 60px;
    height: 40px;
    border-radius: 10px;
    margin-left: 10px;
    background-color: ${(props) =>
      props.num == selectedFloor ? "#FF7B54" : "#ffe2bc"};
    /* #f4f4f5 */
    color: ${(props) => (props.num == selectedFloor ? "white" : "#FF7B54")};
    /* border: solid  2px #FF7B54 ; */
    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
      cursor: pointer;
    }
  `;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
  const handleFollow = () => {
    setScrollY(window.pageYOffset);

    if (ScrollY > 300) {
      // 100 이상이면 버튼이 보이게
      setBtnStatus(true);
    } else {
      setBtnStatus(false);
      setNav(1);
    }
  };

  const handleTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    // setScrollY(0); // ScrollY 의 값을 초기화
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setNav(1);
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch(); // addEventListener 함수를 실행
    return () => {
      window.removeEventListener("scroll", handleFollow); // addEventListener 함수를 삭제
    };
  });
  useEffect(() => {
    getMarketInfo();
  }, []);
  useEffect(() => {}, [floors]);

  const getMarketInfo = async () => {
    const id = localStorage.getItem("marketId");

    await axios
      .get(url + `/fooding/restaurant/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        setMarketImages(res.data.images);
        setMarketInfo(res.data);
      })
      .then(async () => {
        setGetSuccess(true);
        await axios
          .get(url + `/fooding/restaurant/${id}/structure`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getToken,
            },
          })
          .then((res) => {
            console.log("structure", res.data);
            setFloorNum(res.data.floors.length);
            //false로 채우기
            const savefloorNum = Array(res.data.floors.length);
            savefloorNum.fill(false);
            savefloorNum[0] = true;
            setFloor(savefloorNum);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        setGetSuccess(false);
        setMarketInfo(null);
      });
  };

  const weekdayTimeEndHandleForm = (e) => {
    let val = e.target.value;
    console.log("Val:", val);
    console.log(val.substring(0, 2));

    let hour = val.substring(0, 2);

    if (hour == "00") {
      hour = "24";
      const TotalVal = hour + ":" + val.substring(3, 5);

      console.log("totalVal:", TotalVal);

      setWeekdayTimeEndState(TotalVal);
    } else {
      setWeekdayTimeEndState(val);
    }
  };
  const weekdayTimeStartHandleForm = (e) => {
    const val = e.target.value;
    setWeekdayTimeStartState(val);
  };
  const weekendTimeEndHandleForm = (e) => {
    let val = e.target.value;
    console.log("Val:", val);
    console.log(val.substring(0, 2));

    let hour = val.substring(0, 2);

    if (hour == "00") {
      hour = "24";
      const TotalVal = hour + ":" + val.substring(3, 5);

      console.log("totalVal:", TotalVal);
      setWeekendTimeEndState(TotalVal);
    } else {
      setWeekendTimeEndState(val);
    }
  };
  const weekendTimeStartHandleForm = (e) => {
    const val = e.target.value;
    setWeekendTimeStartState(val);
  };

  const marketImgChange = (e) => {
    e.preventDefault();
    // setMarketImg(URL.createObjectURL(e.target.files[0]));
    const img = e.target.files[0];

    const tempArr = [...marketImgs, img];
    setMarketImgs(tempArr);
    const prevFile = URL.createObjectURL(e.target.files[0]);
    setFile([...file, prevFile]);
    e.target.value = "";
  };

  const handleSelect = (e) => {
    if (categorySelected.length < 5) {
      if (!categoryValueSelected.includes(e.target.value)) {
        setCategoryValueSelected((currentArray) => [
          ...currentArray,
          e.target.value,
        ]);
      }
      if (
        !categorySelected.includes(
          e.target.options[e.target.selectedIndex].text
        )
      ) {
        setCategorySelected((currentArray) => [
          ...currentArray,
          e.target.options[e.target.selectedIndex].text,
        ]);
      }
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
  };
  const appendFloor = () => {
    //원래 있는 층에서 추가. 버튼 생성되고 그 버튼 누르면 canvas창 나옴
    setFloor([...floor, false]);
  };
  const submitInfo = async (e) => {
    e.preventDefault();
    const values = getValues();
    let changeToMinutes =
      parseInt(availableHour * 60) + parseInt(availableMinute);
    let street;
    let data = new FormData();

    const address = values.address;
    await axios
      .post(url + "/fooding/geocode", address, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        setStreetAddress(res.data);
        street = res.data;
      })
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
          parkingInfo: values.parking + " " + values.parkingInfo,
          maximumUsageTime: changeToMinutes,
        };

        data.append(
          "restaurant",
          new Blob([JSON.stringify(content)], { type: "application/json" })
        );
        marketImgs.map((img) => {
          data.append("image", img);
        });

        axios
          .post(url + "/fooding/admin/restaurant", data, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + getToken,
            },
          })
          .then((res) => {
            setAlertModal(true);
            setAlertInfo(true);
            modalSet();
            console.log("마켓 아이디", res.data);
            setMarketId(res.data);
            localStorage.setItem("marketId", res.data);
            getMarketInfo();
          })
          .catch((err) => {
            setFailModal(true);
            setAlertInfo(true);
            modalSet();
            console.log("content 컨텐츠", content);
            console.log("img", marketImgs);
            console.log(err);
          });
      });
  };

  function delay() {
    return new Promise((resolve) => setTimeout(resolve, 3000));
  }
  async function modalSet() {
    await delay();
    setAlertModal(false);
    setFailModal(false);
    setAlertStructure(false);
    setAlertInfo(false);
  }

  const handleFloorCallback = (index, structureInfo) => {
    floors[index] = structureInfo;
  };

  const postData = async () => {
    const data = JSON.stringify({
      floors: floors,
    });

    const config = {
      method: "post",
      url: url + `/fooding/admin/restaurant/${marketId}/structure`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken,
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        setAlertModal(true);
        setAlertStructure(true);
        modalSet();
      })
      .catch(function (error) {
        setFailModal(true);
        setAlertStructure(true);
        modalSet();
        console.log(error);
      });
  };

  const bringCanvas = (index) => {
    setSelectedFloor(index);
    let temp = floor;
    let temptemp = temp.map(() => false);
    temptemp[index] = true;
    setFloor(temptemp);
  };

  const onChangeAvailableHour = (e) => setAvailableHour(e);
  const onChangeAvailableMinute = (e) => setAvailableMinute(e);

  const eraseFloor = () => {
    setSelectedFloor(0);
    let temp = floor.slice(0, -1);
    temp.fill(false);
    temp[0] = true;
    setFloor(temp);
    floors.splice(-1, 1);
    console.log("삭제 버튼 눌렀을때 floors", floors);
    postData();
  };

  return (
    <Container>
      <Header />
      <Step status={nav}>
        <nav>
          <button
            onClick={() => {
              // infoRef.current?.scrollIntoView({ behavior: "smooth" });
              setNav(1);
            }}
          >
            INFO
          </button>
          <button
            onClick={() => {
              structRef.current?.scrollIntoView({ behavior: "smooth" });
              setNav(2);
            }}
          >
            STRUCTURE
          </button>
          <button
            onClick={() => {
              menuRef.current?.scrollIntoView({ behavior: "smooth" });
              setNav(3);
            }}
          >
            MENU
          </button>

          {/* <div id="indicator"></div> */}
        </nav>
      </Step>
      <div ref={infoRef}>
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
              <div style={{ width: "900px" }}>
                <InputContainer className="BorderTop">
                  <NameBox>
                    <p>상호명</p>
                  </NameBox>
                  <InputBox>
                    {marketInfo === null ? (
                      <input
                        {...register("businessName")}
                        style={{ fontFamily: "Roboto", marginLeft: "20px" }}
                        placeholder="상호명을 입력하세요"
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
                  <InputBox
                    style={{
                      width: "72%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {marketInfo === null ? (
                      <textarea
                        {...register("detail")}
                        style={{
                          fontFamily: "Roboto",
                          width: "94%",
                          marginLeft: "20px",
                          height: "80%",
                          marginTop: "4px",
                        }}
                        placeholder="상세설명을 입력하세요"
                      />
                    ) : (
                      <InfoSpan>{marketInfo?.intro}</InfoSpan>
                    )}
                  </InputBox>
                </InputContainer>
              </div>

              <div style={{ width: "400px", height: "180px" }}>
                <InputContainer style={{ height: "100%" }}>
                  <MarketImgDiv>
                    <form className="MarketImgForm">
                      {marketInfo === null ? (
                        <input
                          id="market_img_input"
                          type="file"
                          accept="image/jpg,image/png,image/jpeg,image/gif"
                          name="market_img"
                          onChange={marketImgChange}
                        />
                      ) : null}
                      <label htmlFor="market_img_input">
                        <SliderDiv>
                          <StyledSlider {...settings}>
                            {marketInfo !== null ? (
                              marketInfo?.images.map((one, index) => (
                                <div>
                                  <MarketImg src={one} key={index} />
                                </div>
                              ))
                            ) : file?.length !== 0 ? (
                              file?.map((one, index) => (
                                <div>
                                  <MarketImg src={one} key={index} />
                                </div>
                              ))
                            ) : (
                              <FontAwesomeIcon
                                style={{
                                  color: "rgba(0, 0, 0, 0.1)",
                                }}
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
                    placeholder="주소를 입력하세요"
                    style={{ marginTop: "1px", marginLeft: "20px" }}
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
              {marketInfo === null ? (
                <InputBox style={{ width: "25%" }}>
                  <div style={{ width: "200px", display: "flex" }}>
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
                  </div>
                </InputBox>
              ) : (
                <InfoDiv>{marketInfo?.parkingInfo}</InfoDiv>
              )}
              {marketInfo == null ? (
                <div>
                  <input
                    {...register("parkingInfo")}
                    style={{ width: "490px" }}
                    type="text"
                    placeholder="추가 정보를 입력하세요"
                  ></input>
                </div>
              ) : null}
            </InputContainer>
            <InputContainer className="UseTimeContainer">
              <NameBox>
                <p>최대 이용 시간</p>
              </NameBox>
              <InputBox style={{ width: "80%", paddingLeft: "15px" }}>
                {marketInfo === null ? (
                  <>
                    <div className="TimeDiv">
                      <NumericInput
                        style={{
                          input: {
                            height: "23px",
                          },
                        }}
                        min={0}
                        max={4}
                        step={1}
                        value={availableHour}
                        onChange={onChangeAvailableHour}
                      />
                      <p>시간</p>
                    </div>
                    <div className="TimeDiv">
                      <NumericInput
                        style={{
                          input: {
                            height: "23px",
                          },
                        }}
                        min={0}
                        max={30}
                        step={30}
                        value={availableMinute}
                        onChange={onChangeAvailableMinute}
                      />

                      <p>분</p>
                    </div>
                  </>
                ) : (
                  <span>
                    {Math.floor(marketInfo?.maximumUsageTime / 60) == "00"
                      ? null
                      : `${Math.floor(marketInfo?.maximumUsageTime / 60)}시간`}
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
                              style={{
                                margin: "0px 5px",
                                padding: "0px 15px",
                              }}
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
            <InputContainer className="NumberContainer BorderTop BorderBottom">
              <NameBox>
                <p>번호</p>
              </NameBox>
              <NumContainer>
                <div className="InputNTitleContainer">
                  <SubBox>사업자 번호</SubBox>
                  <div style={{ marginLeft: "13px" }}>
                    {marketInfo === null ? (
                      <input
                        className="NumInputStyle"
                        {...register("businessNum")}
                        placeholder=" - 포함해 입력하세요"
                        style={{ marginTop: "1px" }}
                      />
                    ) : (
                      <InfoSpan>{marketInfo?.tel[0]}</InfoSpan>
                    )}
                  </div>
                </div>
                <div className="InputNTitleContainer">
                  <SubBox style={{ border: "none" }}>개인 번호</SubBox>
                  <div style={{ marginLeft: "13px" }}>
                    {" "}
                    {marketInfo === null ? (
                      <input
                        className="NumInputStyle"
                        {...register("personalNum")}
                        placeholder=" - 포함해 입력하세요"
                        style={{ alignItems: "center" }}
                      />
                    ) : (
                      <InfoSpan>{marketInfo?.tel[1]}</InfoSpan>
                    )}
                  </div>
                </div>
              </NumContainer>
            </InputContainer>
            <InputContainer className="Time BorderTop BorderBottom">
              <NameBox>
                <p>시간</p>
              </NameBox>
              <NumContainer>
                <div className="InputNTitleContainer">
                  <SubBox>평일 시간대</SubBox>

                  {marketInfo === null ? (
                    <div className="timeContainer">
                      <input
                        type="time"
                        value={weekdayTimeStartState}
                        className="TimeInput"
                        onChange={weekdayTimeStartHandleForm}
                      />
                      <p>부터</p>
                      <input
                        type="time"
                        value={weekdayTimeEndState}
                        onChange={weekdayTimeEndHandleForm}
                        className="TimeInput"
                      />
                      <p>까지</p>
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "400px",
                        height: "20px",
                        marginLeft: "20px",
                      }}
                    >
                      {marketInfo?.weekdaysWorkHour.open.slice(0, 5)} ~{" "}
                      {marketInfo?.weekdaysWorkHour.close.slice(0, 5)}{" "}
                    </div>
                  )}
                </div>

                <div className="InputNTitleContainer">
                  <SubBox>주말 시간대</SubBox>

                  {marketInfo === null ? (
                    <div className="Time timeContainer">
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
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "400px",
                        height: "20px",
                        marginLeft: "20px",
                      }}
                    >
                      {" "}
                      {marketInfo?.weekendsWorkHour.open.slice(0, 5)} ~{" "}
                      {marketInfo?.weekendsWorkHour.close.slice(0, 5)}{" "}
                    </div>
                  )}
                </div>
              </NumContainer>
            </InputContainer>
            {/* 주차정보 , 최대 이용 시간*/}
            {/* </div> */}

            {marketInfo === null ? (
              <Button onClick={submitInfo}>등록</Button>
            ) : null}
          </InfoForm>
        </InputFormDiv>
      </div>
      <CanvasContainer ref={structRef}>
        <CanvasOptionContainer className="canvasOptionContainer">
          <FloorContainer>
            <div className="floorPlusBtn" onClick={appendFloor}>
              <BsPlusSquare></BsPlusSquare>
            </div>

            {floor.map((bool, index) => {
              return (
                <FloorButton
                  num={index}
                  onClick={(e) => {
                    bringCanvas(index);
                  }}
                >
                  <p>{index + 1}층</p>
                </FloorButton>
              );
            })}

            {floor.length !== 1 ? (
              <div className="floorCancelCss" onClick={eraseFloor}>
                <MdOutlineCancel></MdOutlineCancel>
              </div>
            ) : null}
          </FloorContainer>
          <StructureDesc>
            <p>
              <BsQuestionCircleFill
                style={{
                  color: "#ffe2bc",
                  cursor: "pointer",
                  fontSize: "28px",
                }}
                className="workspace-infoIcon"
                onClick={() => setClickShowHow(true)}
              />
            </p>
            {clickShowHow && <ShowHow myClick={() => setClickShowHow()} />}
          </StructureDesc>
        </CanvasOptionContainer>
        {floor.map((bool, index) => {
          console.log("register index bool ", index, bool);
          console.log("층수", floorNum);
          console.log("플로어", floor);

          return (
            <MyCanvas
              floorCallback={handleFloorCallback}
              bool={bool}
              index={index}
            ></MyCanvas>
          );
        })}

        <ButtonContainer>
          <Button className="button" onClick={postData}>
            등록
          </Button>
        </ButtonContainer>
        <AnimatePresence>
          {alertModal && alertStructure ? (
            <Modal>등록이 완료되었습니다.</Modal>
          ) : null}
        </AnimatePresence>
        <AnimatePresence>
          {failModal && alertStructure ? (
            <Modal>등록에 실패하였습니다.</Modal>
          ) : null}
        </AnimatePresence>
      </CanvasContainer>
      <div ref={menuRef}>
        <Menu marketId={marketId} />
      </div>
      <AnimatePresence>
        {alertModal && alertInfo ? <Modal>등록이 완료되었습니다.</Modal> : null}
      </AnimatePresence>
      <AnimatePresence>
        {failModal && alertInfo ? <Modal>등록에 실패하였습니다.</Modal> : null}
      </AnimatePresence>

      <ArrowUp
        // 버튼 노출 여부
        onClick={handleTop} // 버튼 클릭시 함수 호출
        BtnStatus={BtnStatus}
      >
        <i class="fas fa-angle-up"></i>
      </ArrowUp>
    </Container>
  );
};

export default Register;
