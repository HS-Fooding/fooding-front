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
  width: 100%;
  height: 500px;
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

  return (
    <Container>
      <Header back="/guest/reservation1" title={""} />
      <MapContainer>
        <Stage
          style={{ marginTop: "90px" }}
          width={1000}
          height={400}
          //   fill={"yellow"}
          //   onMouseDown={checkDeselect}
          //   onTouchStart={checkDeselect}
        >
          <Layer>
            {tables.map((table, i) => {
              return (
                <Rect
                  x={table.x}
                  y={table.y}
                  width={table.width / 2}
                  height={table.height / 2}
                  fill="red"
                />
              );
            })}
            {walls.map((wall, i) => {
              return (
                <Rect
                  x={wall.x}
                  y={wall.y}
                  width={wall.width / 2}
                  height={wall.height / 2}
                  fill="red"
                />
              );
            })}
            {seats.map((seat, i) => {
              return <Circle x={seat.x} y={seat.y} radius={10} fill="red" />;
            })}
            {windows.map((window, i) => {
              return (
                <Rect
                  x={window.x}
                  y={window.y}
                  width={window.width / 2}
                  height={window.height / 2}
                  fill="red"
                />
              );
            })}
            {doors.map((door, i) => {
              return (
                <Rect
                  x={door.x}
                  y={door.y}
                  width={door.width / 2}
                  height={door.height / 2}
                  fill="red"
                />
              );
            })}
          </Layer>
        </Stage>
      </MapContainer>
    </Container>
  );
};

export default Reservation2;
