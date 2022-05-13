import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../component/Header";
import MyCanvas from "../../../src/manage/MyCanvas";
import { Stage, Layer, Rect, Circle, Transformer } from "react-konva";
import { url } from "../../Api";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/js/all.js";

const getToken = localStorage.getItem("token");
const marketIdLS = localStorage.getItem("marketId");

const Container = styled.div`
  border: 1px solid black;
  width: 410px;
  height: 770px;
  position: relative;
  box-sizing: border-box;
  margin-bottom: 30px;
  display:flex;
  flex-direction: column;
  align-items: center;
`;
const ButtonContainer = styled.div`
  width: 400px;
  height: 30px;
  display: flex;
  margin-top: 70px;
`;
const FloorButton = styled.div`
  margin-left: 10px;
  width: 40px;
  height: 25px;
  font-size: 15px;
  border-radius: 10px;
  border: solid black 1px;
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
  background-color: orange;
  padding-top: 100px;
  padding-right: 14px;
  padding-left: 14px;
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

  let location = useLocation();
  const { isCar, peopleNum, time, calendarValue, availableTable } =
    location.state;

  const getShape = () => {
    const marketId = localStorage.getItem("marketId");

    var config = {
      method: "get",
      url: url + `/fooding/restaurant/${marketId}/structure`,
      Authorization: "Bearer " + getToken,
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
              fill: "brown",
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
              radius: 20,
              fill: "gray",
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
              fill: "black",
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
              fill: "skyblue",
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
              fill: "green",
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
    getShape();

    // setPossibleTableArr(...availableTable.tableNum);
    console.log("받아옴:", isCar, peopleNum, time, calendarValue);
    const availableTableNumArr = availableTable.map((table) => {
      return table.tableNum;
    });

    setAvailableTableNumArr(availableTableNumArr);

    // console.log(availableTableNumArr);
  }, []);

  const onClickTable = (id, maxPeople, minPeople, tableNum) => {
    console.log(id, maxPeople, minPeople, tableNum);
    const obj = { id, maxPeople, minPeople, tableNum };

    console.log("availableTable", availableTableNumArr);
    if (availableTableNumArr.includes(obj.tableNum)) {
      setSelectedTable(obj);
    }
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

    const getToken = localStorage.getItem("token");
    const marketId = localStorage.getItem("marketId");

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
        Authorization: "Bearer " + getToken,
        "Content-Type": "application/json",
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
          style={{ marginTop: "10px",display:"flex",justifyContent:"center" }}
          width={380}
          height={250}
          //   fill={"yellow"}
          //   onMouseDown={checkDeselect}
          //   onTouchStart={checkDeselect}
        >
          <Layer>
            {tables[currentIndex]?.map((table, i) => {
              return (
                <Rect
                  id={table?.id}
                  x={table.x / 2}
                  y={table.y / 2}
                  width={table.width / 2}
                  height={table.height / 2}
                  rotation={table.rotation}
                  onClick={() => {
                    onClickTable(
                      table.id,
                      table.maxPeople,
                      table.minPeople,
                      table.tableNum
                    );
                  }}
                  fill={
                    selectedTable?.id === table.id
                      ? "#764225"
                      : availableTableNumArr.includes(table.tableNum)
                      ? "brown"
                      : "black"
                  }
                />
              );
            })}
            {walls[currentIndex]?.map((wall, i) => {
              return (
                <Rect
                  x={wall.x / 2}
                  y={wall.y / 2}
                  width={wall.width / 2}
                  height={wall.height / 2}
                  fill="#2C323E"
                  rotation={wall.rotation}
                  onClick={() => {
                    onClickTable(wall.id, wall.maxPeople, wall.minPeople);
                  }}
                />
              );
            })}
            {seats[currentIndex]?.map((seat, i) => {
              return (
                <Circle
                  x={seat.x / 2}
                  y={seat.y / 2}
                  radius={10}
                  fill="#FF4B00"
                  rotation={seat.rotation}
                />
              );
            })}
            {windows[currentIndex]?.map((window, i) => {
              return (
                <Rect
                  x={window.x / 2}
                  y={window.y / 2}
                  width={window.width / 2}
                  height={window.height / 2}
                  fill="#93D5FF"
                  rotation={window.rotation}
                />
              );
            })}
            {doors[currentIndex]?.map((door, i) => {
              return (
                <Rect
                  x={door.x / 2}
                  y={door.y / 2}
                  width={door.width / 2}
                  height={door.height / 2}
                  fill="#433320"
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
            <span>최소 인원 {selectedTable?.minPeople}명</span>
          </div>
          <div>
            <span>최대 인원 {selectedTable?.maxPeople}명</span>
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
