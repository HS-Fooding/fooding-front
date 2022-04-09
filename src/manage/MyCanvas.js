import React, { isValidElement, useEffect, useState } from "react";
import { Stage, Layer, Rect, Circle, Transformer } from "react-konva";
import styled from "styled-components";
import Modal from "./component/Modal";
import axios from "axios";

import { tab } from "@testing-library/user-event/dist/tab";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { url } from "../Api";

const Container = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 80%;
  display: flex;
  align-items: center;
  margin: 5em;
`;

const Button1 = styled.button`
  position: absolute;
  padding: 0;
  margin: 0;
  top: 10%;
  right: 5%;
  border: none;
  width: 100px;
  height: 35px;
  border-radius: 26px;
  cursor: pointer;
  z-index: 2;
`;

const Button2 = styled.button`
  position: absolute;
  padding: 0;
  margin: 0;
  top: 20%;
  right: 5%;
  border: none;
  width: 100px;
  height: 35px;
  border-radius: 26px;
  cursor: pointer;
  z-index: 2;
`;

const Button3 = styled.button`
  position: absolute;
  padding: 0;
  margin: 0;
  top: 30%;
  right: 5%;
  border: none;
  width: 100px;
  height: 35px;
  border-radius: 26px;
  cursor: pointer;
  z-index: 2;
`;

const Button4 = styled.button`
  position: absolute;
  padding: 0;
  margin: 0;
  top: 40%;
  right: 5%;
  border: none;
  width: 100px;
  height: 35px;
  border-radius: 26px;
  cursor: pointer;
  z-index: 2;
`;

const Button5 = styled.button`
  position: absolute;
  padding: 0;
  margin: 0;
  top: 50%;
  right: 5%;
  border: none;
  width: 100px;
  height: 35px;
  border-radius: 26px;
  cursor: pointer;
  z-index: 2;
`;

const Button6 = styled.button`
  position: absolute;
  padding: 0;
  margin: 0;
  top: 60%;
  right: 5%;
  border: none;
  width: 100px;
  height: 35px;
  border-radius: 26px;
  cursor: pointer;
  z-index: 2;
`;
const Button7 = styled.button`
  position: absolute;
  padding: 0;
  margin: 0;
  top: 70%;
  right: 5%;
  border: none;
  width: 100px;
  height: 35px;
  border-radius: 26px;
  cursor: pointer;
  z-index: 2;
`;
const Garbage = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 80%;
  right: 8%;
  border: 1px solid rgba(0, 0, 0, 0.5);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: tomato;
  z-index: 2;
`;

const Table = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onDblClick,
  isDelete,
  tables,
  setTables,
  setIsDelete,
}) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        onDblClick={onDblClick}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });

          if (isDelete === true) {
            const tmp = tables.filter(
              (table) => table.id !== e.target.attrs.id
            );
            setTables([...tmp]);
            setIsDelete(false);
          }
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
            rotation: node.rotation(),
          });
        }}
      />

      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

const Seat = ({
  shapeProps,
  isSelected,
  onChange,
  onDblClick,
  isDelete,
  seats,
  setSeats,
  setIsDelete,
}) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Circle
        ref={shapeRef}
        onDblClick={onDblClick}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
          if (isDelete === true) {
            const tmp = seats.filter((seat) => seat.id !== e.target.attrs.id);
            setSeats([...tmp]);
            setIsDelete(false);
          }
        }}
      />
    </React.Fragment>
  );
};

const Wall = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onDblClick,
  isDelete,
  walls,
  setWalls,
  setIsDelete,
}) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        onDblClick={onDblClick}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
          if (isDelete === true) {
            const tmp = walls.filter((wall) => wall.id !== e.target.attrs.id);
            setWalls([...tmp]);
            setIsDelete(false);
          }
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5),
            rotation: node.rotation(),
          });
          console.log("Rotation!!!! : " + e.target.rotation());
        }}
      />

      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

const Window = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onDblClick,
  isDelete,
  windows,
  setWindows,
  setIsDelete,
}) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        onDblClick={onDblClick}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
          if (isDelete === true) {
            const tmp = windows.filter(
              (window) => window.id !== e.target.attrs.id
            );
            setWindows([...tmp]);
            setIsDelete(false);
          }
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(8),
            rotation: node.rotation(),
          });
        }}
      />

      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

const Door = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onDblClick,
  isDelete,
  doors,
  setDoors,
  setIsDelete,
}) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        onDblClick={onDblClick}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
          if (isDelete === true) {
            const tmp = doors.filter((door) => door.id !== e.target.attrs.id);
            setDoors([...tmp]);
            setIsDelete(false);
          }
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(8),
            rotation: node.rotation(),
          });
        }}
      />

      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

const MyCanvas = () => {
  const [tables, setTables] = React.useState([]);
  const [seats, setSeats] = React.useState([]);
  const [walls, setWalls] = React.useState([]);
  const [windows, setWindows] = React.useState([]);
  const [doors, setDoors] = React.useState([]);

  const [selectedId, selectShape] = React.useState(null);
  const [tableCnt, setTableCnt] = React.useState(1);
  const [seatCnt, setSeatCnt] = React.useState(1);
  const [wallCnt, setWallCnt] = React.useState(1);
  const [windowCnt, setWindowCnt] = React.useState(1);
  const [doorCnt, setDoorCnt] = React.useState(1);
  let obj = {};
  const [modal, setModal] = useState(false);
  const [editTableObj, setEditTableObj] = useState();
  const [editModal, setEditModal] = useState(false);
  const [tableNum, setTableNum] = useState();
  const [id, setId] = useState();
  const [maxPeople, setMaxPeople] = useState();
  const [minPeople, setMinPeople] = useState();

  const [tableWidth, setTableWidth] = useState();
  const [tableHeight, setTableHeight] = useState();

  const [isDelete, setIsDelete] = React.useState(false);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const openModal = () => {
    setModal(true);
    setEditModal(false);
  };

  const handleCallback = (
    id,
    tableNum,
    maxPeopleNum,
    minPeopleNum,
    tableWidth,
    tableHeight,
    modal,
    submit,
    edit
  ) => {
    console.log(
      "부모:",
      id,
      tableNum,
      maxPeopleNum,
      minPeopleNum,
      tableWidth,
      tableHeight,
      modal
    );
    setTableNum(tableNum);
    setMinPeople(minPeopleNum);
    setMaxPeople(maxPeopleNum);
    setTableHeight(tableHeight);
    setTableWidth(tableWidth);

    modal ? setModal(true) : setModal(false);

    if (submit) {
      createTable(
        tableNum,
        tableWidth,
        tableHeight,
        minPeopleNum,
        maxPeopleNum
      );
    }
    if (edit) {
      editTable(
        id,
        tableNum,
        tableWidth,
        tableHeight,
        minPeopleNum,
        maxPeopleNum
      );
    }
  };
  const editTable = (
    id,
    tableNum,
    tableWidth,
    tableHeight,
    minPeopleNum,
    maxPeopleNum
  ) => {
    console.log("idid", id);
    tables.map((table, index) => {
      if (id === table.id) {
        table.tableNum = tableNum;
        table.width = tableWidth;
        table.height = tableHeight;
        table.minPeople = minPeopleNum;
        table.maxPeopl = maxPeopleNum;
      }
    });
    console.log(tables);
  };
  // 개체 생성
  const createTable = (
    tableNum,
    tableWidth,
    tableHeight,
    minPeopleNum,
    maxPeopleNum
  ) => {
    //openModal();

    const table = {
      x: 100 + tableCnt * 20,
      y: 100 + tableCnt * 20,
      width: tableWidth,
      height: tableHeight,
      fill: "brown",
      rotation: 0,
      id: "table" + tableCnt,
      tableNum: tableNum,
      minPeople: minPeopleNum,
      maxPeople: maxPeopleNum,
    };
    setId(id);
    setTableCnt(tableCnt + 1);
    setTables([...tables, table]);
  };

  const createSeat = () => {
    const seat = {
      x: 200 + seatCnt * 20,
      y: 200 + seatCnt * 20,
      radius: 20,
      fill: "gray",
      id: "seat" + seatCnt,
    };
    setSeatCnt(seatCnt + 1);
    setSeats([...seats, seat]);
  };

  const createWall = () => {
    const wall = {
      x: 100 + wallCnt * 20,
      y: 100 + wallCnt * 20,
      width: 250,
      height: 5,
      fill: "black",
      rotation: 0,
      id: "wall" + wallCnt,
    };
    setWallCnt(wallCnt + 1);
    setWalls([...walls, wall]);
  };

  const createWindow = () => {
    const window = {
      x: 100 + windowCnt * 20,
      y: 100 + windowCnt * 20,
      width: 250,
      height: 8,
      fill: "skyblue",
      rotation: 0,
      id: "window" + windowCnt,
    };
    setWindowCnt(windowCnt + 1);
    setWindows([...windows, window]);
  };

  const createDoor = () => {
    const door = {
      x: 100 + doorCnt * 20,
      y: 100 + doorCnt * 20,
      width: 50,
      height: 15,
      fill: "green",
      rotation: 0,
      id: "door" + doorCnt,
    };
    setDoorCnt(doorCnt + 1);
    setDoors([...doors, door]);
  };

  // submit
  const postData = () => {
    // const data = JSON.stringify({
    //     tables: tables.filter(colorFilter),
    //     seats: seats,
    //     walls: walls.filter(widthFilter),
    //     windows: windows.filter(widthFilter),
    //     doors: doors.filter(widthFilter),
    // });

    const marketId = localStorage.getItem("marketId");

    const data = JSON.stringify({
      tables: tables.map((m) => {
        return {
          x: m.x,
          y: m.y,
          width: m.width,
          height: m.height,
          rotation: m.rotation,
          tableNum: m.tableNum,
          minPeople: m.minPeople,
          maxPeople: m.maxPeople,
        };
      }),
      seats: seats.map((m) => {
        return {
          x: m.x,
          y: m.y,
        };
      }),
      walls: walls.map((m) => {
        return {
          x: m.x,
          y: m.y,
          width: m.width,
          rotation: m.rotation,
        };
      }),
      windows: windows.map((m) => {
        return {
          x: m.x,
          y: m.y,
          width: m.width,
          rotation: m.rotation,
        };
      }),
      doors: doors.map((m) => {
        return {
          x: m.x,
          y: m.y,
          width: m.width,
          rotation: m.rotation,
        };
      }),
    });

    console.log(data);

    const config = {
      method: "post",
      url: url + `/fooding/admin/restaurant/${marketId}/structure`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // handlDblClick
  const handleTableDblClick = (e) => {
    //prettier-ignore
    const {x, y, width, height, fill, rotation, minPeople, maxPeople} = e.target.attrs;
    setTableCnt(tableCnt + 1);
    const table = {
      x: x + 10,
      y: y + 10,
      width,
      height,
      fill,
      rotation,
      tableNum: tableCnt,
      minPeople,
      maxPeople,
      id: "table" + tableCnt, // id는 다른 개체들과 구분만 가능하면 됨. 고유하면 됨
    };
    setTables([...tables, table]);
  };

  const handleSeatDblClick = (e) => {
    //prettier-ignore
    const {x, y, radius, fill, id} = e.target.attrs;
    setSeatCnt(seatCnt + 1);
    const seat = {
      x: x + 10,
      y: y + 10,
      radius,
      fill,
      id: id + 100, // id는 다른 개체들과 구분만 가능하면 됨. 고유하면 됨
    };
    setSeats([...seats, seat]);
  };

  const handleWallDblClick = (e) => {
    //prettier-ignore
    const {x, y, width, height, fill, rotation, id} = e.target.attrs;
    setWallCnt(wallCnt + 1);
    const wall = {
      x: x + 10,
      y: y + 10,
      width,
      height,
      rotation,
      fill,
      id: id + 100, // id는 다른 개체들과 구분만 가능하면 됨. 고유하면 됨
    };
    setWalls([...walls, wall]);
  };

  const handleWindowDblClick = (e) => {
    //prettier-ignore
    const {x, y, width, height, fill, rotation, id} = e.target.attrs;
    setWindowCnt(windowCnt + 1);
    const window = {
      x: x + 10,
      y: y + 10,
      width,
      height,
      rotation,
      fill,
      id: id + 100, // id는 다른 개체들과 구분만 가능하면 됨. 고유하면 됨
    };
    setWindows([...windows, window]);
  };

  const handleDoorDblClick = (e) => {
    //prettier-ignore
    const {x, y, width, height, fill, rotation, id} = e.target.attrs;
    setDoorCnt(doorCnt + 1);
    const door = {
      x: x + 10,
      y: y + 10,
      width,
      height,
      rotation,
      fill,
      id: id + 100, // id는 다른 개체들과 구분만 가능하면 됨. 고유하면 됨
    };
    setDoors([...doors, door]);
  };
  const setModalModal = () => {
    console.log("editTableObj", editTableObj);
    console.log("objobj", obj);
    setModal(true);
  };
  // 삭제
  const handleDelete = () => {
    setIsDelete(true);
  };
  const changeInfo = () => {
    console.log("selectedId", selectedId);
    if (selectedId?.includes("table")) {
      //수정이 가능하다.
      let temp;
      const bringTable = tables.map((table, index) => {
        if (selectedId === table.id) {
          temp = table;
          return table;
        }
      });

      obj = bringTable;
      if (editTableObj !== undefined) {
        setEditTableObj("");
        setEditTableObj(temp);
      } else {
        setEditTableObj(temp);
      }
      setEditModal(true);
      setModalModal();
      //modal 생성자에 true 가 있으면 수정 중이라는거고 없으면 새로 생성하는거
    } else {
      return;
    }
    //테이블의 값을 가져와야함. 테이블의
    //테이블이라는걸 알아야함. =>
  };

  return (
    <Container>
      <Button1 onClick={openModal}>테이블 생성 </Button1>
      <Button2 onClick={createSeat}>좌석 생성</Button2>
      <Button3 onClick={createWall}>벽 생성</Button3>
      <Button4 onClick={createWindow}>창문 생성</Button4>
      <Button5 onClick={createDoor}>출입구 생성</Button5>
      <Button6 onClick={postData}>Submit</Button6>
      <Button7 onClick={changeInfo}>수정</Button7>

      <Garbage onMouseUp={handleDelete}></Garbage>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
          {tables.map((table, i) => {
            return (
              <Table
                key={i}
                onDblClick={handleTableDblClick}
                shapeProps={table}
                isSelected={table.id === selectedId}
                tables={tables}
                setTables={setTables}
                isDelete={isDelete}
                setIsDelete={setIsDelete}
                onSelect={() => {
                  selectShape(table.id);
                }}
                onChange={(newAttrs) => {
                  const tmp = tables.slice();
                  tmp[i] = newAttrs;
                  setTables(tmp);
                }}
              />
            );
          })}
          {seats.map((seat, i) => {
            return (
              <Seat
                key={i}
                onDblClick={handleSeatDblClick}
                shapeProps={seat}
                isSelected={seat.id === selectedId}
                seats={seats}
                setSeats={setSeats}
                isDelete={isDelete}
                setIsDelete={setIsDelete}
                onChange={(newAttrs) => {
                  const tmp = seats.slice();
                  tmp[i] = newAttrs;
                  setSeats(tmp);
                }}
              />
            );
          })}
          {walls.map((wall, i) => {
            return (
              <Wall
                key={i}
                onDblClick={handleWallDblClick}
                shapeProps={wall}
                isSelected={wall.id === selectedId}
                walls={walls}
                setWalls={setWalls}
                isDelete={isDelete}
                setIsDelete={setIsDelete}
                onSelect={() => {
                  selectShape(wall.id);
                }}
                onChange={(newAttrs) => {
                  const tmp = walls.slice();
                  tmp[i] = newAttrs;
                  setWalls(tmp);
                }}
              />
            );
          })}
          {windows.map((window, i) => {
            return (
              <Window
                key={i}
                onDblClick={handleWindowDblClick}
                shapeProps={window}
                isSelected={window.id === selectedId}
                windows={windows}
                setWindows={setWindows}
                isDelete={isDelete}
                setIsDelete={setIsDelete}
                onSelect={() => {
                  selectShape(window.id);
                }}
                onChange={(newAttrs) => {
                  const tmp = windows.slice();
                  tmp[i] = newAttrs;
                  setWindows(tmp);
                }}
              />
            );
          })}
          {doors.map((door, i) => {
            return (
              <Door
                key={i}
                onDblClick={handleDoorDblClick}
                shapeProps={door}
                isSelected={door.id === selectedId}
                doors={doors}
                setDoors={setDoors}
                isDelete={isDelete}
                setIsDelete={setIsDelete}
                onSelect={() => {
                  selectShape(door.id);
                }}
                onChange={(newAttrs) => {
                  const tmp = doors.slice();
                  tmp[i] = newAttrs;
                  setDoors(tmp);
                }}
              />
            );
          })}
        </Layer>
      </Stage>
      {modal ? (
        <Modal
          parentCallback={handleCallback}
          editModal={editModal}
          editTableObj={editTableObj}
        />
      ) : null}
    </Container>
  );
};

export default MyCanvas;
