import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Stage, Layer, Rect, Circle, Transformer } from "react-konva";
import { url } from "../../Api";
import axios from "axios";

const getToken = localStorage.getItem("guestToken");
const marketId = localStorage.getItem("marketId");

const CurrentTable = ({ currentMarketId }) => {
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

  useEffect(() => {
    console.log("current market id", currentMarketId);

    getAvailableTable();
    getShape();
  }, []);

  const getAvailableTable = () => {
    var config = {
      method: "get",
      url:
        url +
        `/fooding/restaurant/${currentMarketId}/reservation?date=2022-05-19&num=2&time=11:30`,
      headers: {
        Authorization: "Bearer " + getToken,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data.tables);
        setAvailableTable(response.data.tables);
        const availableTable = response.data.tables;
        return availableTable;
      })
      .then((availableTable) => {
        const availableTableNumArr = availableTable.map((table) => {
          return table.tableNum;
        });

        setAvailableTableNumArr(availableTableNumArr);
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
      });
  };
  return (
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
              //   fill={
              //     selectedTable?.id === table.id
              //       ? "#764225"
              //       : availableTableNumArr.includes(table.tableNum)
              //       ? "brown"
              //       : "black"
              //   }

              fill={
                availableTableNumArr.includes(table.tableNum)
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
  );
};

export default CurrentTable;
