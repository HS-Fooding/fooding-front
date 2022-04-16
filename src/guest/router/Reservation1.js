import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../component/Header";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import moment from "moment";

const Container = styled.div`
  border: 1px solid black;
  width: 410px;
  height: 770px;
  position: relative;
  box-sizing: border-box;
`;

const MainBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  //justify-content: center;
  align-items: center;
  margin-top: 90px;
  flex-direction: column;
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
    color: #6f48eb;
    min-width: 44px;
    background: none;
    font-size: 16px;
    margin-top: 8px;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #f8f8fa;
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
    background: #f8f8fa;
    color: #6f48eb;
    border-radius: 6px;
  }
  .react-calendar__tile--now {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #6f48eb;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #6f48eb;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #f8f8fa;
  }
  .react-calendar__tile--active {
    background: #6f48eb;
    border-radius: 6px;
    font-weight: bold;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #6f48eb;
    color: white;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #f8f8fa;
  }
  .react-calendar__tile--range {
    background: #f8f8fa;
    color: #6f48eb;
    border-radius: 0;
  }
  .react-calendar__tile--rangeStart {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    background: #6f48eb;
    color: white;
  }
  .react-calendar__tile--rangeEnd {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    background: #6f48eb;
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
  height: 100px;
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
  margin-top: 50px;
`;

const PeopleInnerCon = styled(InnerContainer)``;

const TimeContainer = styled(ScollContainer)`
  margin: 20px;
`;

const TimeInnerCon = styled(InnerContainer)``;

const TimeBtn = styled.button`
  height: 40px;
  width: 80px;
  border: none;
  margin: 4px;
  font-size: 12px;
  border-radius: 3px;
  color: white;
  background: ${(props) => props.theme.purpleColor};
  &:active {
    background: white;
    color: ${(props) => props.theme.purpleColor};
  }
`;

const NextBtn = styled.button`
  width: 95%;
  height: 50px;
  background: white;
  margin: 10px;
  border: 1px solid ${(props) => props.theme.borderGrayColor};
  border-radius: 3px;
  font-weight: bold;
  cursor: pointer;
`;

const Reservation1 = () => {
  const [peopleNum, setPeopleNum] = useState(2);
  const [time, setTime] = useState();

  //   const [value, onChange] = useState([
  //     new Date(2022, 4, 10),
  //     new Date(2022, 4, 20),
  //   ]);

  const [value, onChange] = useState();

  console.log(value);

  const peopleArr = Array(30)
    .fill()
    .map((V, i) => i + 1);

  const peopleClick = (num) => {
    setPeopleNum(num);
  };

  const PeopleBtn = styled.button`
    background-color: ${(props) =>
      props.num == peopleNum ? "#6f48eb" : "white"};
    color: ${(props) => (props.num == peopleNum ? "white" : "black")};
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 3px;
    border: none;
    border: ${(props) =>
      props.num == peopleNum ? "none" : "1px solid rgba(0,0,0,0.3)"};

    cursor: pointer;
  `;

  const timeClick = () => {};
  return (
    <Container>
      <Header back="/" title={""} />
      <MainBox>
        <CalendarContainer>
          <Calendar
            minDate={new Date()}
            onChange={onChange}
            value={value}
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
            <TimeBtn>오후 12:00</TimeBtn>
            <TimeBtn>오후 12:00</TimeBtn>
            <TimeBtn>오후 12:00</TimeBtn>
            <TimeBtn>오후 12:00</TimeBtn>
            <TimeBtn>오후 12:00</TimeBtn>
            <TimeBtn>오후 12:00</TimeBtn>
            <TimeBtn>오후 12:00</TimeBtn>
            <TimeBtn>오후 12:00</TimeBtn>
            <TimeBtn>오후 12:00</TimeBtn>
            <TimeBtn>오후 12:00</TimeBtn>
          </TimeInnerCon>
        </TimeContainer>
        <NextBtn>다음</NextBtn>
      </MainBox>
    </Container>
  );
};

export default Reservation1;
