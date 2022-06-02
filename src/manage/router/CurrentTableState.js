import Header from "../component/Header";
import React, { useEffect, useState, useRef } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import {
  Stage,
  Layer,
  Rect,
  Circle,
  Transformer,
  Group,
  Text,
} from "react-konva";
import { url } from "../../Api";
import axios from "axios";

const getToken = localStorage.getItem("managerToken");
const marketId = localStorage.getItem("marketId");

const CurrentTables = () => {
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
  const [availableTable, setAvailableTable] = useState([]);
  const [availableTableNumArr, setAvailableTableNumArr] = useState([]);
  const [floor, setFloor] = useState([true]);
  const [selectedFloor, setSelectedFloor] = useState(0);

  const [noResult, setNoResult] = useState(false);

  const FloorButton = styled.div`
    width: 80px;
    height: 40px;
    border-radius: 10px;
    margin-left: 10px;
    background-color: ${(props) =>
      props.num == selectedFloor ? "#FF7B54" : "#f4f4f5"};
    color: ${(props) => (props.num == selectedFloor ? "white" : "black")};

    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
      cursor: pointer;
    }
  `;
  const FloorButtonContainer = styled.div`
    width: 100%;
    background-color: white;

    height: 60px;
    display: flex;
  `;

  const Notice = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 60px;
    color: gray;
  `;

  useEffect(() => {
    //console.log("current market id", currentMarketId);

    getAvailableTable();
    getShape();
  }, []);

  const getAvailableTable = () => {
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
    var config = {
      method: "get",
      url: url + `/fooding/restaurant/${marketId}/structure`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        const floors = response.data.floors;

        if (floors.length === 0) {
          setNoResult(true);
        }
        setWholeFloorsLength(floors.length);
        setWholeFloor(floors);
        console.log("floors length", wholeFloorsLength);
        const savefloorNum = Array(response.data.floors.length);
        savefloorNum.fill(false);
        savefloorNum[0] = true;
        console.log("saveFloorNum", savefloorNum);
        setFloor(savefloorNum);
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
              radius: 10,
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
        console.log("등록된 테이블이 없습니다.");
        setNoResult(true);
      });
  };

  const clickTable = (id) => {
    console.log("tableId", id);
    const getToken = localStorage.getItem("managerToken");
    const marketId = localStorage.getItem("marketId");

    var config = {
      method: "put",
      url: url + `/fooding/admin/restaurant/${marketId}/toggle/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        getAvailableTable();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <FloorButtonContainer>
        {floor.map((bool, index) => {
          return (
            <FloorButton
              classname="floorbutton"
              num={index}
              onClick={(e) => {
                setCurrentIndex(index);
                setSelectedFloor(index);
              }}
            >
              <p>{index + 1}층</p>
            </FloorButton>
          );
        })}
      </FloorButtonContainer>
      {noResult ? <Notice>등록된 테이블이 없습니다.</Notice> : null}
      <Stage
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
        }}
        width={900}
        height={600}
      >
        <Layer>
          {tables[currentIndex]?.map((table, i) => {
            return (
              <Group
                onClick={() => {
                  clickTable(table.tableNum);
                }}
              >
                <Rect
                  id={table?.id}
                  x={table.x}
                  y={table.y}
                  width={table.width}
                  height={table.height}
                  rotation={table.rotation}
                  fill={
                    availableTable[table.tableNum - 1]
                      ? "#FF7B54"
                      : "rgba(0,0,0,0.2)"
                  }
                />
                <Text
                  text={table.tableNum}
                  rotation={table.rotation}
                  x={table.x}
                  y={table.y}
                  width={table.width}
                  height={table.height}
                  align="center"
                  verticalAlign="middle"
                  fontSize="15"
                />
              </Group>
            );
          })}
          {walls[currentIndex]?.map((wall, i) => {
            return (
              <Rect
                x={wall.x}
                y={wall.y}
                width={wall.width}
                height={wall.height}
                fill="#DED7B1"
                rotation={wall.rotation}
              />
            );
          })}
          {seats[currentIndex]?.map((seat, i) => {
            return (
              <Circle
                x={seat.x}
                y={seat.y}
                radius={10}
                fill="#FFD07F"
                rotation={seat.rotation}
              />
            );
          })}
          {windows[currentIndex]?.map((window, i) => {
            return (
              <Rect
                x={window.x}
                y={window.y}
                width={window.width}
                height={window.height}
                fill="#93D5FF"
                rotation={window.rotation}
              />
            );
          })}
          {doors[currentIndex]?.map((door, i) => {
            return (
              <Rect
                x={door.x}
                y={door.y}
                width={door.width}
                height={door.height}
                fill="#CC7351"
                rotation={door.rotation}
              />
            );
          })}
        </Layer>
      </Stage>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 70px 0px;
`;
const TableContainer = styled.div`
  width: auto;
  height: 900px;
  background-color: ${(props) => props.theme.menuOrangeColor};
`;
const CurrentTableState = () => {
  return (
    <Container>
      <Header />
      <TableContainer>
        <CurrentTables></CurrentTables>
      </TableContainer>
    </Container>
  );
};
export default CurrentTableState;
