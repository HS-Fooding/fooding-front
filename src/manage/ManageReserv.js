import React, { useEffect, useState } from "react";
import _ from "lodash";
import axios from "axios";
import { url } from "../Api";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import RGL, { WidthProvider, Responsive } from "react-grid-layout";
import { m } from "framer-motion";
import DatePicker from "react-datepicker"; // DatePicker 라는 컴포넌트도 가져오깅
import "react-datepicker/dist/react-datepicker.css"; // 스타일 맥이기
import Header from "./component/Header";
import ManageReserveModal from "./component/ManageReserveModal";

const Container = styled.div`
  margin-top: 100px;
  /* display: flex;
  justify-content: center; */

  /* width: 100%; */
  height: auto;
  padding: 0px 50px;
  .react-datepicker__input-container {
    margin-bottom: 30px;
    input {
      height: 30px;
      border-radius: 3px;
      /* border: 1px solid black; */
      display: flex;
      justify-content: center;
    }

    .react-datepicker__triangle {
      right: 0px;
    }
  }
`;

const MyDatePicker = styled(DatePicker)`
  height: 3rem;
  font-size: 1.6rem;
  font-weight: bold;
  /* background-color: transparent; */
  /* color: white; */
  border: none;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  border: none;
  width: 100px;
  height: 35px;
  border-radius: 26px;
  cursor: pointer;
  background-color: ${(props) => props.theme.blackColor};
  color: white;
  margin-right: 8px;
`;

const TimeTable = styled.div`
  width: 60px;
  height: auto;
  /* background: teal; */
  border: 1px solid #808080;
  margin-top: 10px;
  background: white;
  border-left: 3px solid #808080;

  .eachTime {
    padding: 10.7px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #808080;

    &:last-child {
      border-bottom: none;
    }
  }
`;

const LayoutWrapper = styled.div`
  display: inline-block;
  width: 100%;

  /* overflow-x: auto;
  white-space: nowrap; */

  .react-grid-layout {
    background-color: inherit;
    margin: 0px;
    width: 100%;
  }

  .react-grid-item {
    background: white;
    border: none;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    padding: 5px 0px;
    /* box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; */
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    color: #495057;
    div {
      margin: 3px;
    }

    div:first-child {
      font-weight: bold;
      margin-bottom: 5px;
      font-size: 13px;
    }
  }
`;

const BLOCK_OF_TIME = 30;

const parseDate = (date, time) => {
  const _date = date?.split("-");
  var _time;
  if (typeof time === "object") {
    _time = [time.getHours(), time.getMinutes()];
  } else {
    _time = time?.split(":");
  }

  // const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

  const result = new Date(_date[0], _date[1] - 1, _date[2]);

  result.setHours(_time[0]);
  result.setMinutes(_time[1]);
  return result;
};

// const getWorkingHour = (tableLength, open, close) => {
//     return tableLength * ((close - open) / (18 * 100000));
// };

const transformData = (dummy) => {
  console.log("original : ", dummy);
  return {
    date: dummy.tableInfo.date,
    open: parseDate(dummy.tableInfo.date, dummy.tableInfo.open),
    close: parseDate(dummy.tableInfo.date, dummy.tableInfo.close),
    maxUsageTime: dummy.tableInfo.maxUsageTime,
    tableNums: Object.assign({}, dummy.tableInfo.tableNums),
    reservations: dummy.reservations.map((m) => {
      const diff =
        (parseDate(dummy.tableInfo.date, m.reservAt) -
          parseDate(dummy.tableInfo.date, dummy.tableInfo.open)) /
        (60 * 1000 * BLOCK_OF_TIME);
      return {
        reservId: m.reservId,
        nickname: m.nickname,
        tableNum: m.tableNum,
        reservCount: m.reservCount,
        isCar: m.car,
        // reservAt: parseDate(dummy.tableInfo.date, m.reservAt),
        reservAt: m.reservAt,
        x: dummy.tableInfo.tableNums.findIndex((t) => t === m.tableNum), // 테이블 번호
        y: diff,
        w: 1,
        h: dummy.tableInfo.maxUsageTime / 30,
        status: "NONE",
      };
    }),
  };
};

const ResponsiveReactGridLayout = WidthProvider(Responsive);
var data = "hello";
const ManageReserv = () => {
  const [transformed, setTransformed] = React.useState({});
  const [reservations, setReservations] = React.useState([]);
  const [layout, setLayout] = React.useState([]);
  const [removedLayout, setRemovedLayout] = React.useState([]);
  const [breakpoint, setBreakpoint] = React.useState([]);
  const [cols, setCols] = React.useState([]);
  const [restInfo, setRestInfo] = React.useState({});
  const [newCounter, setNewCounter] = React.useState(0);
  const [dateDetail, setDateDetail] = React.useState(new Date());
  const [date, setDate] = React.useState(dateDetail.getDate());
  const [startDate, setStartDate] = useState(new Date());

  const [manageModal, setManageModal] = useState(false);

  const [openTime, setOpenTime] = useState();
  const [closeTime, setCloseTime] = useState();

  const [timeTable, setTimeTable] = useState([]);
  const [tableNums, setTableNums] = useState();

  let tomorrow = new Date();

  useEffect(() => {
    console.log("startDate:", startDate);
    console.log(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );
  }, [startDate]);
  const handleDate = () => {
    // // console.log("dateDetail:", dateDetail.getDate().length);
    // console.log("date:", date);
    // //setDate(date.getDate() + 1);
    // //const getDate = dateDetail.getDate();
    // setDate(date + 1);
    // // // 어제
    // // const yesterday = new Date();
    // // yesterday.setDate(yesterday.getDate() - 1);
    // // console.log(yesterday.toLocaleString());
    // // 내일
    // //const tomorrow = new Date();
    // tomorrow.setDate(tomorrow.getDate() + 1);
    // console.log(tomorrow.toLocaleString());
  };

  useEffect(async () => {
    const getToken = localStorage.getItem("token");

    let year = startDate.getFullYear();
    let month = startDate.getMonth() + 1;
    let date = startDate.getDate();

    if (month.toString().length == 1) {
      month = "0" + month;
    }
    if (date.toString().length == 1) {
      date = "0" + date;
    }

    console.log("month, date:", month, date);

    const config = {
      method: "get",
      // url: url + `/fooding/admin/restaurant/${restId}/reservation`,
      url: url + `/fooding/admin/restaurant/${1}/reservation`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken,
      },
      params: {
        // date: "2022-05-01",
        date: `${year}-${month}-${date}`,

        // 5,6,7일 데이터 있음
      },
    };

    await axios(config)
      .then((response) => {
        console.log("response.data:", response.data);
        const tableInfo = response.data.tableInfo;
        setTableNums(response.data.tableInfo.tableNums);
        setOpenTime(tableInfo.open);
        setCloseTime(tableInfo.close);

        const openHour = tableInfo.open.substring(0, 2);
        const openMinute = tableInfo.open.substring(3, 5);
        const closeHour = tableInfo.close.substring(0, 2);
        const closeMinute = tableInfo.close.substring(3, 5);
        let totalOpenMinute = Number(openHour) * 60 + Number(openMinute);
        const totalCloseMinute = Number(closeHour) * 60 + Number(closeMinute);

        console.log("totalOpenMinute:", totalOpenMinute);
        console.log("totalCloseMinute", totalCloseMinute);

        let timeArr = [];

        while (totalOpenMinute <= totalCloseMinute) {
          const eachHour = Math.floor(totalOpenMinute / 60);
          let eachMin = totalOpenMinute % 60;

          if (eachMin == 0) {
            eachMin = "00";
          }
          const eachHourMin = eachHour + ":" + eachMin;

          timeArr.push(eachHourMin);

          totalOpenMinute += 30;
        }
        console.log("timeArr:", timeArr);
        setTimeTable(timeArr);

        console.log("finalMin", totalOpenMinute);

        setTransformed(transformData(response.data));
        // console.log(transformData(response.data));
        setReservations(transformed.reservations);

        data = transformData(response.data);

        return transformData(response.data).reservations;
      })
      .then((response) => {
        // generate layout
        console.log("response", response);
        const layout = response.map((item, i, list) => {
          // console.log("res!!", item);
          return {
            i: i.toString(),
            x: response[i].x,
            y: response[i].y,
            w: response[i].w,
            h: parseInt(response[i].h),
            reservId: response[i].reservId,
            nickname: response[i].nickname,
            tableNum: response[i].tableNum,
            reservCount: response[i].reservCount,
            isCar: response[i].isCar,
            reservAt: response[i].reservAt,
            status: response[i].status,
          };
        });
        setLayout(layout);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [startDate]);

  ManageReserv.defaultProps = {
    className: "layout",
    // cols: transformed.tableNums,
    cols: data.tablenums, // TODO : Need to check
    rowHeight: 30,
    onLayoutChange: function () {},
    // This turns off compaction so you can place items wherever.
    compactType: null,
    // This turns off rearrangement so items will not be pushed arround.
    preventCollision: true,
  };
  const handleCallback = (
    nickname,
    name,
    reservAt,
    tableNum,
    reservCount,
    isCar,
    phoneNum,
    modal,
    submit
  ) => {
    modal ? setManageModal(true) : setManageModal(false);
    //  if(nickname&&
    //   name&&
    //   reservAt&&
    //   tableNum&&
    //   reservCount&&
    //   isCar&&
    //   phoneNum&&

    if (submit) {
      const diff =
        (parseDate(transformed.date, reservAt) -
          parseDate(transformed.date, transformed.open)) /
        (60 * 1000 * BLOCK_OF_TIME);
      const tmp = {
        i: "n" + newCounter,
        // x: transformed.tableNums.findIndex((t) => t === tableNum), // 테이블 번호
        x: parseInt(tableNum - 1),
        y: diff,
        w: 1,
        h: transformed.maxUsageTime / 30,
        //
        nickname,
        name,
        reservAt,
        tableNum,
        reservCount,
        isCar: isCar === "true" ? true : false,
        phoneNum,
        // reservId: uuidv4(),
        reservId: null,
        status: "NEW",
      };
      setNewCounter(newCounter + 1);

      setLayout([...layout, tmp]);
    }
  };
  const onLayoutChange = (data, from, to, index) => {
    const tmp = layout;
    const open = transformed.open;

    for (var i = 0; i < tmp.length; i++) {
      if (tmp[i].i === to.i) tmp[i].status = "EDIT";
      tmp[i].reservId = tmp[i].reservId;
      tmp[i].x = parseInt(data[i].x);
      tmp[i].y = parseInt(data[i].y);
      tmp[i].w = parseInt(data[i].w);
      tmp[i].h = parseInt(data[i].h);
      tmp[i].tableNum = parseInt(data[i].x) + 1;
      const open_hours = open.getHours();
      const open_minutes = open.getMinutes();
      const reserv_hour = data[i].y / 2 + open_hours + open_minutes / 30;
      const reserv_minute =
        (((data[i].y / 2 + open_hours + open_minutes) % 30) % 1) * 60;
      tmp[i].reservAt = `${
        parseInt(reserv_hour) / 10 >= 1
          ? parseInt(reserv_hour)
          : "0".concat(parseInt(reserv_hour))
      }:${reserv_minute === 30 ? reserv_minute : "00"}`;
    }

    const result = layout.map((m, i) => tmp[i]);
    setLayout([...result]);
  };

  const onAddItem = () => {
    setManageModal(true);
  };

  // We're using the cols coming back from this to calculate where to add new items.
  const onBreakpointChange = (breakpoint, cols) => {
    setBreakpoint(breakpoint);
    setCols(cols);
  };

  const onRemoveItem = (i) => {
    console.log("removing", i);

    layout.forEach((m) => {
      if (m.i === i) {
        m.status = "DELETE";
        // setRemovedLayout(removedLayout.push(m));
        setRemovedLayout([...removedLayout, m]);
      }
    });
    const result = layout.filter((m) => {
      return m.i !== i;
    });

    setLayout([...result]);
  };

  const generateDOM = () => {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer",
    };
    return _.map(layout, (el, i) => {
      const t = el.i;
      return (
        <div key={t} data-grid={el}>
          {/* <div className="text">{i + 1}</div> */}
          <div>{el.tableNum}번 테이블</div>
          <div>{el.nickname}</div>
          {/* <div>reservAt : {el.reservAt.toLocaleString("en-US", { timeZone: "UTC" })}</div> */}
          <div>{el.reservAt}</div>
          <div>{el.reservCount}명</div>
          <div>{el.isCar ? "차 있음" : "차 없음"}</div>
          <div>예약 번호 {el.reservId} </div>
          <span
            className="remove"
            style={removeStyle}
            onClick={onRemoveItem.bind(this, t)}
          >
            x
          </span>
        </div>

        // <div key={t} data-grid={el}>
        // {/* <div className="text">{i + 1}</div> */}
        // <div>nickname : {el.nickname}</div>
        // <div>tableNum : {el.tableNum}</div>
        // {/* <div>reservAt : {el.reservAt.toLocaleString("en-US", { timeZone: "UTC" })}</div> */}
        // <div>reservAt : {el.reservAt}</div>
        // <div>reservCount : {el.reservCount}</div>
        // <div>isCar : {el.isCar ? "yes" : "no"}</div>
        // <div>status : {el.status}</div>
        // <div>reservId : {el.reservId} </div>
        // <span
        //   className="remove"
        //   style={removeStyle}
        //   onClick={onRemoveItem.bind(this, t)}
        // >
        //   x
        // </span>
        // </div>
      );
    });
  };

  const stringifyLayout = () => {
    return layout.map((l) => {
      const name = l.i === "__dropping-elem__" ? "drop" : l.i;
      return (
        <div className="layoutItem" key={l.i}>
          <b>{name}</b>
          {`: [${l.x}, ${l.y}, ${l.w}, ${l.h}]`}
        </div>
      );
    });
  };

  const handleSubmit = () => {
    const data = JSON.stringify(
      [...layout, ...removedLayout]
        .filter((m) => m.status !== "NONE")
        .map((m) => {
          return {
            flag: m.status,
            adminReservPostDTO: {
              booker: {
                member_id: 0,
                phoneNum: m.status === "NEW" ? m.phoneNum : "",
                name: "",
                nickName: m.nickname,
              },
              reservId: m.reservId,
              tableNum: m.tableNum.toString(),
              reserveDate: "2022-05-06",
              reserveTime: m.reservAt,
              reserveNum: m.reservCount,

              car: m.isCar,
            },
          };
        })
    );

    console.log("data!!!", data);
    const getToken = localStorage.getItem("token");
    const config = {
      method: "post",
      url: url + `/fooding/admin/restaurant/1/reservation`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  return (
    <Container>
      <Header />
      <MyDatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />

      {/* <button onClick={handleDate}>plusDate</button> */}
      <Button onClick={onAddItem}>예약 추가</Button>
      <Button onClick={handleSubmit}>등록</Button>
      <div
        style={{
          width: "100%",
          height: "20px",
          background: "black",
          marginTop: "30px",
        }}
      ></div>
      <div
        style={{
          display: "flex",

          backgroundColor: "#f1f3f5",
        }}
      >
        <TimeTable>
          {timeTable.map((time) => {
            return <div class="eachTime">{time}</div>;
          })}
        </TimeTable>

        <LayoutWrapper>
          <ResponsiveReactGridLayout
            layout={layout}
            onDragStop={onLayoutChange}
            onResize={onLayoutChange}
            onBreakpointChange={onBreakpointChange}
            onRemoveItem={onRemoveItem}
            {...ManageReserv.defaultProps}
            // style={{ width: "100%" }}
          >
            {generateDOM()}
          </ResponsiveReactGridLayout>
        </LayoutWrapper>
      </div>
      <div>
        <div className="layoutJSON">
          Displayed as <code>[x, y, w, h]</code>
          <br />
          <br />
          <div className="columns">{stringifyLayout()}</div>
        </div>
      </div>
      {manageModal ? (
        <ManageReserveModal parentCallback={handleCallback} />
      ) : null}
    </Container>
  );
};

export default ManageReserv;
