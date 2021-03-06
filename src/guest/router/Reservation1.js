import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../component/Header";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import moment from "moment";
import { useLocation, Link } from "react-router-dom";
import { url } from "../../Api";
import axios from "axios";

const Container = styled.div`
  /* border: 1px solid black; */
  width: 410px;
  height: 770px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const MainBox = styled.div`
  display: flex;
  width: 390px;
  height: 100%;
  //justify-content: center;
  align-items: center;
  /* margin-top: 90px; */
  margin-top: 70px;
  flex-direction: column;
  position: relative;
`;

const CalendarContainer = styled.div`
  /* ~~~ container styles ~~~ */
  /* max-width: 590px;
  margin: auto;
  margin-top: 20px;
  /* background-color: #d4f7d4; */
  .react-calendar {
    width: 380px;
    height: 320px;
    max-width: 100%;
    background-color: #fff;
    color: #222;
    border-radius: 8px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
    border: none;
  }
  .react-calendar__navigation button {
    /* color: #6f48eb; */
    color: ${(props) => props.theme.mainColor};
    min-width: 44px;
    background: none;
    font-size: 16px;
    margin-top: 8px;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    //background-color: #f8f8fa;
    background-color: #ffe2bc; // 연한 색깔f
    //background-color: ${(props) => props.theme.veryLightMainColor};
  }
  .react-calendar__navigation button[disabled] {
    //background-color: #f0f0f0;
    color: #f0f0f0;
  }
  abbr[title] {
    text-decoration: none;
  }
  /* .react-calendar__month-view__days__day--weekend {
 color: #d10000;
} */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: ${(props) => props.theme.lightMainColor};
    //background-color: #ffe2bc;
    /* color: #6f48eb; */
    color: ${(props) => props.theme.mainColor};
    border-radius: 6px;
  }
  .react-calendar__tile--now {
    /* background: #6f48eb33; */
    background-color: ${(props) => props.theme.lightMainColor}; // 현재 날짜
    border-radius: 6px;
    font-weight: bold;
    //color: #6f48eb;
    color: ${(props) => props.theme.mainColor};
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    /* background: #6f48eb33; */
    background-color: ${(props) => props.theme.veryLightMainColor};
    border-radius: 6px;
    font-weight: bold;
    color: ${(props) => props.theme.mainColor};
    /* color: #6f48eb; */
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    //background: #f8f8fa;
    background-color: ${(props) => props.theme.veryLightMainColor};
    /* background-color: black; */
  }
  .react-calendar__tile--active {
    /* background: #6f48eb; */
    background: ${(props) => props.theme.mainColor};
    border-radius: 6px;
    font-weight: bold;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    /* background: #6f48eb; */
    background: ${(props) => props.theme.mainColor};
    color: white;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    /* background-color: #f8f8fa; */
    background-color: ${(props) => props.theme.veryLightMainColor};
  }
  .react-calendar__tile--range {
    /* background: #f8f8fa; */
    background-color: ${(props) => props.theme.lightMainColor};
    /* color: #6f48eb; */
    color: ${(props) => props.theme.mainColor};
    border-radius: 0;
  }
  .react-calendar__tile--rangeStart {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    /* background: #6f48eb; */
    background: ${(props) => props.theme.mainColor};
    color: white;
  }
  .react-calendar__tile--rangeEnd {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    //background: #6f48eb;
    background: ${(props) => props.theme.mainColor};
    color: white;
  }
  /* .react-calendar:disabled {
    background-color: white;
  } */
  .react-calendar__month-view__days__day:disabled {
    background-color: white;
    color: #f0f0f0;
    //color: #6f48eb;
  }
`;

const ScollContainer = styled.div`
  width: 100%;
  height: 80px;
  //background-color: teal;
  display: flex;
  overflow-y: hidden;
  overflow-x: hidden;
  white-space: nowrap;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const InnerContainer = styled.div`
  overflow: auto;
  width: 500px;
  height: 100%;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const PeopleContainer = styled(ScollContainer)`
  margin-top: 20px;
`;

const PeopleInnerCon = styled(InnerContainer)``;

const TimeContainer = styled(ScollContainer)`
  /* margin: 20px; */
`;

const TimeInnerCon = styled(InnerContainer)``;

const NextBtn = styled.button`
  position: fixed;
  left: 15px;
  bottom: 15px;
  width: 380px;
  height: 50px;
  background: white;
  /* margin-top: 50px; */
  border: 1px solid ${(props) => props.theme.borderGrayColor};
  border-radius: 3px;
  font-weight: bold;
  cursor: pointer;
  //margin: 190px 10px 0px 10px;
`;

const CheckBox = styled.div`
  width: 100%;
  span {
    margin-right: 20px;
    font-size: 14px;
    /* font-weight: bold; */
    color: gray;
  }
  .wrap_box {
    width: 100%;
    height: 30px;
    margin: 20px;
    display: flex;
    align-items: center;
  }
  input {
    position: absolute;
    left: -1000%;
  }
  label {
    position: relative;
    display: block;
    width: 60px;
    height: 30px;
    background: ${(props) => props.theme.borderGrayColor};
    border-radius: 30px;
    transition: background 0.4s;
    cursor: pointer;
  }
  label:after {
    content: "";
    position: absolute;
    left: 8.5px;
    top: 50%;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background: #fff;
    transform: translateY(-50%);
    box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.2);
  }
  input:checked + label {
    background: ${(props) => props.theme.lightMainColor};
    transition: all 0.4s;
  }
  /* input:checked + label:after {left:inherit; right:7.5px; } */
  input:checked + label:after {
    left: calc(100% - 27.5px);
  }
  label span {
    display: none;
  }
  /* body,
  html {
    background: #efefef;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    z-index: -1;
  } */
`;

const NoticeBox = styled.div`
  width: 384px;
  height: 37px;
  background-color: rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 10px;
`;

const Reservation1 = () => {
  const [peopleNum, setPeopleNum] = useState(2);
  const [time, setTime] = useState([]);
  const [isCar, setIsCar] = useState(false);
  const [clickedTime, setClickedTime] = useState();

  let timesArr = [];

  //   const [value, onChange] = useState([
  //     new Date(2022, 4, 10),
  //     new Date(2022, 4, 20),
  //   ]);
  // let location = useLocation();
  // localStorage.setItem("maximumUsageTime", location.state.maximumUsageTime);
  // const maximumUsageTime = localStorage.getItem("maximumUsageTime");
  // const maximumUsageTime = location.state.maximumUsageTime;

  const maximumUsageTime = localStorage.getItem("maximumUsageTime");

  const [calendarValue, onChange] = useState(new Date());
  const [isWeek, setIsWeek] = useState();
  const [open, setOpen] = useState();
  const [close, setClose] = useState();
  const [availableTable, setAvailableTable] = useState([]);
  const [totalTime, setTotalTime] = useState();
  const [totalDate, setTotalDate] = useState();

  const marketId = localStorage.getItem("marketId");

  const calcTime = () => {
    const weekdaysWorkHour = JSON.parse(
      localStorage.getItem("weekdaysWorkHour")
    );
    const weekendsWorkHour = JSON.parse(
      localStorage.getItem("weekendsWorkHour")
    );

    if (
      // 주말일 경우
      calendarValue.toString().includes("Sat") ||
      calendarValue.toString().includes("Sun")
    ) {
      setIsWeek(false);
      setOpen(weekendsWorkHour.open);
      setClose(weekendsWorkHour.close);
    } else {
      // 주말 아닐 경우
      setIsWeek(true);
      setOpen(weekdaysWorkHour.open);
      setClose(weekdaysWorkHour.close);
    }

    let openHours = open?.slice(0, 2);
    let openMin = open?.slice(3, 5);
    // 오전 8:30

    //24:00
    // 25:00
    //1:00 ~ 24:00
    //

    let totalMin = Number(openHours) * 60 + Number(openMin); // 24:00 -> 24*60 =
    let resultTime;

    console.log("openhours, openMin, totalMin:", openHours, openMin, totalMin);

    for (let i = 0; i < 50; i++) {
      let resultHour = Math.floor(totalMin / 60); // 24
      let resultMinute = totalMin % 60; // 30

      if (resultMinute === 0) resultMinute = "00";
      else resultMinute = resultMinute;

      if (resultHour < 12) {
        // 12이하면 오전 ~
        resultTime = "오전 " + resultHour + ":" + resultMinute;
      } else if (resultHour == 12) {
        //딱 12면 오후 12:30분 이런식
        resultTime = "오후 " + resultHour + ":" + resultMinute;
      } else if (resultHour == 24) {
        // 딱 24시
        resultTime = "오전 " + 12 + ":" + resultMinute;
      } else if (resultHour > 12 && resultHour < 24) {
        // 12~ 24시 전이면 오후
        resultTime = "오후 " + Number(resultHour - 12) + ":" + resultMinute;
      }

      //   console.log("resultTime:", resultTime);

      timesArr.push(resultTime);
      setTime(timesArr);

      totalMin += 30;

      if (close?.substring(0, 2) == 24) {
        if (
          close?.substring(0, 2) - 12 + close?.substring(2, 5) ==
            resultTime?.substring(3, resultTime?.length) &&
          resultTime?.substring(0, 2) == "오전"
        ) {
          for (let i = 0; i < maximumUsageTime / 30; i++) {
            timesArr.pop();
          }
          break;
        }
      } else {
        if (
          close?.substring(0, 2) - 12 + close?.substring(2, 5) ==
            resultTime?.substring(3, resultTime?.length) &&
          resultTime?.substring(0, 2) == "오후"
        ) {
          for (let i = 0; i < maximumUsageTime / 30; i++) {
            timesArr.pop();
          }
          break;
        }
      }
    }
  };

  useEffect(() => {
    calcTime();

    console.log("maximumUsageTime", maximumUsageTime);
  }, []);

  useEffect(() => {
    calcTime();
  }, [calendarValue, open, close]);

  const peopleArr = Array(30)
    .fill()
    .map((V, i) => i + 1);

  let sendHour;
  let sendMin;
  let sendTotalTime;
  let dateString;
  const makeSendingTime = async () => {
    let month = calendarValue.getMonth() + 1;

    if (month.toString().length == 1) {
      console.log("month lenght 하나");
      month = "0" + month;
      console.log(month);
    }

    let date = calendarValue.getDate();

    if (date.toString().length == 1) {
      date = "0" + date;
    }

    dateString = calendarValue.getFullYear() + "-" + month + "-" + date;

    setTotalDate(dateString);

    if (clickedTime !== undefined) {
      let splited = clickedTime?.split(" ");

      console.log("splited 있나?:", splited);

      let splitedTime = splited[1]?.split(":"); // 1:30

      if (splited[0] === "오후") {
        if (splitedTime[0] !== "12") {
          sendHour = Number(splitedTime[0]) + 12;
        } else {
          sendHour = 12;
        }
        sendMin = splitedTime[1];

        sendTotalTime = sendHour + ":" + sendMin;
      } else {
        sendTotalTime = clickedTime.substring(3, 8);
      }
    }

    console.log("sendTotalTime:", sendTotalTime);
    console.log("dateString:", dateString);
    setTotalTime(sendTotalTime);
  };

  useEffect(() => {
    console.log(isCar, peopleNum, calendarValue, clickedTime);

    makeSendingTime();
    //setAvailableTable(undefined);

    const getToken = localStorage.getItem("guestToken");
    const marketId = localStorage.getItem("marketId");

    var config = {
      method: "get",
      url:
        url +
        `/fooding/restaurant/${marketId}/reservation?date=${dateString}&num=${peopleNum}&time=${sendTotalTime}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data.tables);
        setAvailableTable(response.data.tables);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [isCar, peopleNum, calendarValue, clickedTime]);

  const peopleClick = (num) => {
    setPeopleNum(num);
  };

  const PeopleBtn = styled.button`
    background-color: ${(props) =>
      props.num == peopleNum ? "#FF7B54" : "white"};
    color: ${(props) => (props.num == peopleNum ? "white" : "black")};
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 2.5px;
    border: none;
    border: ${(props) =>
      props.num == peopleNum ? "none" : "1px solid rgba(0,0,0,0.3)"};
    cursor: pointer;
  `;

  const timeClick = (time) => {
    console.log("timeClick");
    setClickedTime(time);
  };

  const TimeBtn = styled.button`
    height: 40px;
    width: 80px;

    margin: 4px;
    font-size: 12px;
    border-radius: 3px;
    color: white;
    background: ${(props) => (props.time == clickedTime ? "white" : "#FF7B54")};
    // background: ${(props) => props.theme.purpleColor};

    color: ${(props) => (props.time == clickedTime ? "#FF7B54" : "white")};
    &:active {
      background: white;
      color: ${(props) => props.theme.mainColor};
    }

    border: 1px solid #ff7b54;
  `;

  const nextBtnClick = () => {};

  return (
    <Container>
      <Header back={`/guest/${marketId}`} title={""} />
      <MainBox>
        <CalendarContainer>
          <Calendar
            minDate={new Date()}
            onChange={onChange}
            value={calendarValue}
            formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
            //minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
            //maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
            //showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
          />
        </CalendarContainer>
        <PeopleContainer>
          <PeopleInnerCon>
            {peopleArr.map((num, index) => (
              <PeopleBtn
                num={index + 1}
                key={index}
                onClick={() => peopleClick(num)}
              >
                {num}명
              </PeopleBtn>
            ))}
          </PeopleInnerCon>
        </PeopleContainer>
        <TimeContainer>
          <TimeInnerCon>
            {time?.map((time, index) => (
              <TimeBtn time={time} key={index} onClick={() => timeClick(time)}>
                {time}
              </TimeBtn>
            ))}
          </TimeInnerCon>
        </TimeContainer>
        <CheckBox>
          <div className="wrap_box">
            <span>차를 가져오셨습니까?</span>
            <input
              type="checkbox"
              id="chk1"
              onChange={() => {
                setIsCar((current) => !current);
                console.log(isCar);
              }}
            />
            <label htmlFor="chk1">
              <span>선택</span>
            </label>
          </div>
        </CheckBox>

        {clickedTime === undefined ? (
          <NoticeBox>
            <span>시간을 선택하세요.</span>
          </NoticeBox>
        ) : availableTable?.length === 0 ? (
          <NoticeBox>
            <span>예약 가능한 좌석이 없습니다.</span>
          </NoticeBox>
        ) : null}

        {/* // {availableTable.length === 0 ? (
        //   <NoticeBox>
        //     <span>예약 가능한 좌석이 없습니다.</span>
        //   </NoticeBox>
        // ) : null} */}

        {availableTable?.length !== 0 && clickedTime !== undefined ? (
          <Link
            to="/guest/reservation2"
            state={{
              isCar: isCar,
              peopleNum: peopleNum,
              // time: clickedTime,
              time: totalTime,
              // calendarValue: calendarValue,
              calendarValue: totalDate,
              availableTableLink: availableTable,
            }}
          >
            <NextBtn onClick={nextBtnClick}>다음</NextBtn>
          </Link>
        ) : null}
      </MainBox>
    </Container>
  );
};

export default Reservation1;
