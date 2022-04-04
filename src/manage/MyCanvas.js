import React from "react";
import { Stage, Layer, Rect, Circle, Transformer } from "react-konva";
import styled from "styled-components";
import axios from "axios";

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

const Table = ({ shapeProps, isSelected, onSelect, onChange }) => {
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

const Seat = ({ shapeProps, isSelected, onChange }) => {
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
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
      />
    </React.Fragment>
  );
};

const Wall = ({ shapeProps, isSelected, onSelect, onChange }) => {
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

const Window_Door = ({ shapeProps, isSelected, onSelect, onChange }) => {
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

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const createTable = () => {
    const table = {
      x: 100 + tableCnt * 20,
      y: 100 + tableCnt * 20,
      width: 100,
      height: 100,
      fill: "brown",
      rotation: 0,
      id: "table" + tableCnt,
    };
    setTableCnt(tableCnt + 1);
    tables.push(table);
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
    seats.push(seat);
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
    walls.push(wall);
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
    windows.push(window);
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
    doors.push(door);
  };

  const postData = () => {
    // const data = JSON.stringify({
    //     tables: tables.filter(colorFilter),
    //     seats: seats,
    //     walls: walls.filter(widthFilter),
    //     windows: windows.filter(widthFilter),
    //     doors: doors.filter(widthFilter),
    // });
    const data = JSON.stringify({
      tables: tables.map((m) => {
        return {
          id: m.id,
          x: m.x,
          y: m.y,
          width: m.width,
          height: m.height,
          rotation: m.rotation,
        };
      }),
      seats: seats.map((m) => {
        return {
          id: m.id,
          x: m.x,
          y: m.y,
        };
      }),
      walls: walls.map((m) => {
        return {
          id: m.id,
          x: m.x,
          y: m.y,
          width: m.width,
          rotation: m.rotation,
        };
      }),
      windows: windows.map((m) => {
        return {
          id: m.id,
          x: m.x,
          y: m.y,
          width: m.width,
          rotation: m.rotation,
        };
      }),
      doors: doors.map((m) => {
        return {
          id: m.id,
          x: m.x,
          y: m.y,
          width: m.width,
          rotation: m.rotation,
        };
      }),
    });

    console.log(data);

    // const config = {
    //     method: "post",
    //     url: url + "/fooding/admin/restaurant/{id}/structure",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     data: data,
    // };

    // axios(config)
    //     .then(function (response) {
    //         console.log(response.data);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
  };

  return (
    <Container>
      <Button1 onClick={createTable}>테이블 생성</Button1>
      <Button2 onClick={createSeat}>좌석 생성</Button2>
      <Button3 onClick={createWall}>벽 생성</Button3>
      <Button4 onClick={createWindow}>창문 생성</Button4>
      <Button5 onClick={createDoor}>출입구 생성</Button5>
      <Button6 onClick={postData}>Submit</Button6>
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
                shapeProps={table}
                isSelected={table.id === selectedId}
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
                shapeProps={seat}
                isSelected={seat.id === selectedId}
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
                shapeProps={wall}
                isSelected={wall.id === selectedId}
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
              <Window_Door
                key={i}
                shapeProps={window}
                isSelected={window.id === selectedId}
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
              <Window_Door
                key={i}
                shapeProps={door}
                isSelected={door.id === selectedId}
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
    </Container>
  );
};

export default MyCanvas;
