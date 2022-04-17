import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../component/Header";
import MyCanvas from "../../../src/manage/MyCanvas";
import { Stage, Layer, Rect, Circle, Transformer } from "react-konva";
import { url } from "../../Api";
import axios from "axios";

const getToken = localStorage.getItem("token");
const marketIdLS = localStorage.getItem("marketId");

const Container = styled.div`
  border: 1px solid black;
  width: 410px;
  height: 770px;
  position: relative;
  box-sizing: border-box;
`;
const MapContainer = styled.div`
  width: 400px;
  height: 300px;
`;

const SelectedTable = styled.div`
  width: 400px;
  height: 200px;
  background-color: teal;
`;

const Reservation2 = () => {
  const [tables, setTables] = useState([]);
  const [seats, setSeats] = useState([]);
  const [walls, setWalls] = useState([]);
  const [windows, setWindows] = useState([]);
  const [doors, setDoors] = useState([]);

  const [selectedId, selectShape] = useState(null);
  const [tableCnt, setTableCnt] = useState(1);
  const [seatCnt, setSeatCnt] = useState(1);
  const [wallCnt, setWallCnt] = useState(1);
  const [windowCnt, setWindowCnt] = useState(1);
  const [doorCnt, setDoorCnt] = useState(1);
  const [id, setId] = useState();

  const [selectedTable, setSelectedTable] = useState();

  const getShape = () => {
    var config = {
      method: "get",
      url: url + `/fooding/restaurant/2/structure`,
      Authorization: "Bearer " + getToken,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        const floor1 = response.data.floors[0];
        console.log(floor1);

        const tempTable = [];
        const tempSeat = [];
        const tempWall = [];
        const tempWindow = [];
        const tempDoor = [];

        floor1.tables.forEach((t, id) => {
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
          setTableCnt(tableCnt + 1);
        });

        floor1.seats.map((s, id) => {
          const seat = {
            x: s.x,
            y: s.y,
            radius: 20,
            fill: "gray",
            id: "seat" + id,
          };
          tempSeat.push(seat);
          setSeatCnt(seatCnt + 1);
        });

        floor1.walls.map((w, id) => {
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
          setWallCnt(wallCnt + 1);
        });

        floor1.windows.map((w, id) => {
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
          setWindowCnt(windowCnt + 1);
        });

        floor1.doors.map((d, id) => {
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
          setDoorCnt(doorCnt + 1);
        });

        setTables([...tempTable]);
        setSeats([...tempSeat]);
        setWalls([...tempWall]);
        setWindows([...tempWindow]);
        setDoors([...tempDoor]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getShape();
  }, []);

  const onClickTable = (id, maxPeople, minPeople) => {
    console.log(id, maxPeople, minPeople);
    const obj = { id, maxPeople, minPeople };

    setSelectedTable(obj);
  };

  return (
    <Container>
      <Header back="/guest/reservation1" title={""} />
      <MapContainer>
        <Stage
          style={{ marginTop: "90px" }}
          width={380}
          height={250}
          //   fill={"yellow"}
          //   onMouseDown={checkDeselect}
          //   onTouchStart={checkDeselect}
        >
          <Layer>
            {tables.map((table, i) => {
              return (
                <Rect
                  x={table.x / 2}
                  y={table.y / 2}
                  width={table.width / 2}
                  height={table.height / 2}
                  fill="#764225"
                  rotation={table.rotation}
                  onClick={() => {
                    onClickTable(table.id, table.maxPeople, table.minPeople);
                  }}
                />
              );
            })}
            {walls.map((wall, i) => {
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
            {seats.map((seat, i) => {
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
            {windows.map((window, i) => {
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
            {doors.map((door, i) => {
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
      <SelectedTable>
        <span>{selectedTable?.minPeople}</span>
        <span>{selectedTable?.maxPeople}</span>
      </SelectedTable>
    </Container>
  );
};

export default Reservation2;
