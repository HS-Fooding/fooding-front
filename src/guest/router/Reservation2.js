import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../component/Header";
import MyCanvas from "../../../src/manage/MyCanvas";
import { Stage, Layer, Rect, Circle, Transformer } from "react-konva";
import { url } from "../../Api";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/js/all.js";

const Container = styled.div`
  width: 410px;
  height: 770px;
  position: relative;
  box-sizing: border-box;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ButtonContainer = styled.div`
  width: 400px;
  height: 30px;
  display: flex;
  margin-top: 90px;
`;
const FloorButton = styled.div`
  margin-left: 10px;
  width: 40px;
  height: 25px;
  font-size: 15px;
  border-radius: 8px;
  background: ${(props) => props.theme.mainColor};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`;
const MapContainer = styled.div`
  width: 400px;
  height: 300px;
`;

const SelectedTableBox = styled.div`
  padding: 20px;
  width: 100%;
  height: 50px;
  /* background-color: teal; */
`;
const InnerTableBox = styled.div`
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;

  div {
    height: 80%;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    &:first-child {
      border-right: 1px solid ${(props) => props.theme.borderGrayColor};
    }
  }

  width: 370px;
  height: 80px;
  border: 1px solid ${(props) => props.theme.borderGrayColor};
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 20px;
`;

const NextBtn = styled.button`
  width: 95%;
  height: 50px;
  background: white;
  border: 1px solid ${(props) => props.theme.borderGrayColor};
  border-radius: 3px;
  font-weight: bold;
  cursor: pointer;
  margin: 190px 10px 0px 10px;
`;

const FinishModal = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.mainColor};
  padding-top: 100px;
  padding-right: 26px;
  padding-left: 26px;
  color: white;
  z-index: 3;
  .bold {
    font-size: 28px;
    margin: 60px 0px 80px 0px;
    font-weight: bold;
    color: white;
  }

  svg {
    font-size: 78px;
    color: white;
  }

  background: linear-gradient(70deg, #ffbc80, #ff7b54);
`;

const Reservation2 = () => {
  const [tables, setTables] = useState([]);
  const [seats, setSeats] = useState([]);
  const [walls, setWalls] = useState([]);
  const [windows, setWindows] = useState([]);
  const [doors, setDoors] = useState([]);
  const [wholeFloorsLength, setWholeFloorsLength] = useState();
  const [wholeFloor, setWholeFloor] = useState();
  const [selectedId, selectShape] = useState(null);
  const [tableCnt, setTableCnt] = useState([]);
  const [seatCnt, setSeatCnt] = useState([]);
  const [wallCnt, setWallCnt] = useState([]);
  const [windowCnt, setWindowCnt] = useState([]);
  const [doorCnt, setDoorCnt] = useState([]);
  const [id, setId] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTable, setSelectedTable] = useState();
  const [availableTableNumArr, setAvailableTableNumArr] = useState([]);
  const [reservationDone, setReservationDone] = useState(false);
  const [availableTable, setAvailableTable] = useState([]);

  const getToken = localStorage.getItem("guestToken");
  const marketId = localStorage.getItem("marketId");

  let location = useLocation();
  const { isCar, peopleNum, time, calendarValue, availableTableLink } =
    location.state;

  const getAvailableTable = () => {
    const getToken = localStorage.getItem("managerToken");
    const marketId = localStorage.getItem("marketId");

    var config = {
      method: "get",
      url: url + `/fooding/restaurant/${marketId}/table`,
      headers: {
        Authorization: "Bearer " + getToken,
      },
    };

    axios(config)
      .then(function (response) {
        console.log("tables:", response.data.tables);

        const tableAvailableArr = response.data.tables.map((table) => {
          return table.available;
        });
        console.log("tableAvailableArr:", tableAvailableArr);
        setAvailableTable(tableAvailableArr);
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  const getShape = () => {
    const marketId = localStorage.getItem("marketId");

    var config = {
      method: "get",
      url: url + `/fooding/restaurant/${marketId}/structure`,
      headers: {
        Authorization: "Bearer " + getToken,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        const floors = response.data.floors;
        setWholeFloorsLength(floors.length);
        setWholeFloor(floors);
        console.log("floors length", wholeFloorsLength);
        let tempTableCntArr = [];
        let tempSeatCntArr = [];
        let tempWallCntArr = [];
        let tempWindowCntArr = [];
        let tempDoorCntArr = [];

        let tempTablesArr = [];
        let tempSeatsArr = [];
        let tempWallsArr = [];
        let tempWindowsArr = [];
        let tempDoorsArr = [];

        for (var i = 0; i < response.data.floors.length; i++) {
          const tempTable = [];
          const tempSeat = [];
          const tempWall = [];
          const tempWindow = [];
          const tempDoor = [];

          floors[i].tables.forEach((t, id) => {
            const table = {
              x: t.x,
              y: t.y,
              width: t.width,
              height: t.height,
              fill: "#DED7B1",
              rotation: t.rotation,
              id: "table" + id,
              tableNum: t.tableNum,
              minPeople: t.minPeople,
              maxPeople: t.maxPeople,
            };
            tempTable.push(table);
            setId(id);
          });
          tempTableCntArr.push(floors[i].tables.length);
          console.log("tempTableCntArr", tempTableCntArr);

          floors[i].seats.map((s, id) => {
            const seat = {
              x: s.x,
              y: s.y,
              radius: 10,
              fill: "#FFD07F",
              id: "seat" + id,
            };
            tempSeat.push(seat);
          });
          tempSeatCntArr.push(floors[i].seats.length);

          floors[i].walls.map((w, id) => {
            const wall = {
              x: w.x,
              y: w.y,
              width: w.width,
              height: 5,
              fill: "#DED7B1",
              rotation: w.rotation,
              id: "wall" + id,
            };
            tempWall.push(wall);
          });
          tempWallCntArr.push(floors[i].walls.length);

          floors[i].windows.map((w, id) => {
            const window = {
              x: w.x,
              y: w.y,
              width: w.width,
              height: 5,
              fill: "#93D5FF",
              rotation: w.rotation,
              id: "window" + id,
            };
            tempWindow.push(window);
          });
          tempWindowCntArr.push(floors[i].windows.length);

          floors[i].doors.map((d, id) => {
            const door = {
              x: d.x,
              y: d.y,
              width: d.width,
              height: 15,
              fill: "#CC7351",
              rotation: d.rotation,
              id: "door" + id,
            };
            tempDoor.push(door);
          });
          tempDoorCntArr.push(floors[i].doors.length);

          tempTablesArr.push(tempTable);
          tempSeatsArr.push(tempSeat);
          tempWallsArr.push(tempWall);
          tempWindowsArr.push(tempWindow);
          tempDoorsArr.push(tempDoor);
        } //for문을 돌면서 floor에 있는 요소를 다 저장을 해줘야함

        setTableCnt(tempTableCntArr);
        setSeatCnt(tempSeatCntArr);
        setWallCnt(tempWallCntArr);
        setWindowCnt(tempWindowCntArr);
        setDoorCnt(tempDoorCntArr);

        setTables(tempTablesArr);
        setSeats(tempSeatsArr);
        setWalls(tempWallsArr);
        setWindows(tempWindowsArr);
        setDoors(tempDoorsArr);

        // console.log("real tableCnts",tableCnt);
        // console.log("real setSeatCnt",seatCnt);
        // console.log("real setWallCnt",wallCnt);
        // console.log("real setWindowCnt",windowCnt);
        // console.log("real setDoorCnt",doorCnt);

        // console.log("tablestables",tempTablesArr);
        console.log("wholeFloor", wholeFloor);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getAvailableTable();
    getShape();

    // setPossibleTableArr(...availableTable.tableNum);
    console.log("받아옴:", isCar, peopleNum, time, calendarValue);
    const availableTableNumArr = availableTableLink.map((table) => {
      return table.tableNum;
    });

    setAvailableTableNumArr(availableTableNumArr);

    // console.log(availableTableNumArr);
  }, []);

  const onClickTable = (id, maxPeople, minPeople, tableNum) => {
    console.log(id, maxPeople, minPeople, tableNum);
    const obj = { id, maxPeople, minPeople, tableNum };

    // console.log("availableTable", availableTableNumArr);
    // if (availableTableNumArr.includes(obj.tableNum)) {
    //   setSelectedTable(obj);
    // }

    setSelectedTable(obj);
  };
  const changeFloor = (index) => {
    console.log("indexindexindex", index);
    setCurrentIndex(index);
  };
  const submit = () => {
    // {
    //   "car": true,
    //   "reserveDate": "string",
    //   "reserveNum": 0,
    //   "reserveTime": "string",
    //   "tableNum": "string"
    // }
    console.log(
      "받아옴:",
      isCar,
      peopleNum,
      time,
      calendarValue,
      selectedTable.tableNum,
      availableTable
    );

    var data = JSON.stringify({
      car: isCar,
      reserveDate: calendarValue,
      reserveNum: peopleNum,
      reserveTime: time,
      tableNum: selectedTable.tableNum,
    });

    var config = {
      method: "post",
      url: url + `/fooding/restaurant/${marketId}/reservation`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setReservationDone(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Container>
      <Header back="/guest/reservation1" title={""} />
      <ButtonContainer>
        {wholeFloor?.map((one, index) => {
          return (
            <FloorButton
              onClick={() => {
                changeFloor(index);
              }}
            >
              <p>{index + 1}층</p>
            </FloorButton>
          );
        })}
      </ButtonContainer>
      <MapContainer>
        <Stage
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
          }}
          width={300}
          height={200}
          //   fill={"yellow"}
          //   onMouseDown={checkDeselect}
          //   onTouchStart={checkDeselect}
        >
          <Layer>
            {tables[currentIndex]?.map((table, i) => {
              return (
                <Rect
                  id={table?.id}
                  x={table.x / 3}
                  y={table.y / 3}
                  width={table.width / 3}
                  height={table.height / 3}
                  rotation={table.rotation}
                  onClick={
                    availableTable[table.tableNum - 1]
                      ? () => {
                          onClickTable(
                            table.id,
                            table.maxPeople,
                            table.minPeople,
                            table.tableNum,
                            table.available
                          );
                        }
                      : null
                  }
                  // fill={
                  //     selectedTable?.id === table.id
                  //         ? "#ffe2bc"
                  //         : availableTableNumArr.includes(table.tableNum)
                  //         ? "#FF7B54"
                  //         : "rgba(0,0,0,0.2)"
                  // }
                  fill={
                    selectedTable?.tableNum === table.tableNum
                      ? "#ffe2bc"
                      : availableTable[table.tableNum - 1]
                      ? "#FF7B54"
                      : "rgba(0,0,0,0.2)"
                  }
                />
              );
            })}
            {walls[currentIndex]?.map((wall, i) => {
              return (
                <Rect
                  x={wall.x / 3}
                  y={wall.y / 3}
                  width={wall.width / 3}
                  height={wall.height / 3}
                  fill="#DED7B1"
                  rotation={wall.rotation}
                />
              );
            })}
            {seats[currentIndex]?.map((seat, i) => {
              return (
                <Circle
                  x={seat.x / 3}
                  y={seat.y / 3}
                  radius={4}
                  fill="#FFD07F"
                  rotation={seat.rotation}
                />
              );
            })}
            {windows[currentIndex]?.map((window, i) => {
              return (
                <Rect
                  x={window.x / 3}
                  y={window.y / 3}
                  width={window.width / 3}
                  height={window.height / 3}
                  fill="#93D5FF"
                  rotation={window.rotation}
                />
              );
            })}
            {doors[currentIndex]?.map((door, i) => {
              return (
                <Rect
                  x={door.x / 3}
                  y={door.y / 3}
                  width={door.width / 3}
                  height={door.height / 3}
                  fill="#CC7351"
                  rotation={door.rotation}
                />
              );
            })}
          </Layer>
        </Stage>
      </MapContainer>
      <SelectedTableBox>
        <InnerTableBox>
          <div>
            <span>최소 인원</span>{" "}
            <span style={{ color: "#FF7B54", marginLeft: "8px" }}>
              {selectedTable?.minPeople}
            </span>
          </div>
          <div>
            <span>최대 인원</span>{" "}
            <span style={{ color: "#FF7B54", marginLeft: "8px" }}>
              {" "}
              {selectedTable?.maxPeople}
            </span>
          </div>
        </InnerTableBox>
      </SelectedTableBox>
      <NextBtn onClick={submit}>완료</NextBtn>

      {reservationDone == true ? (
        <FinishModal>
          <i class="fa-solid fa-circle-check"></i>
          <div className="bold">예약 완료</div>
          <div className="light">예약이 성공적으로 완료되었습니다.</div>

          <Link to="/guest/restaurantList">
            <NextBtn
              style={{
                marginTop: "320px",
                border: "3px solid white",
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              닫기
            </NextBtn>
          </Link>
        </FinishModal>
      ) : null}
    </Container>
  );
};

export default Reservation2;
