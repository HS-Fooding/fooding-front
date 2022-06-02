import React, { isValidElement, useEffect, useState } from "react";
import { Stage, Layer, Rect, Circle, Transformer, Text, Group } from "react-konva";
import styled, { keyframes } from "styled-components";
import Modal2 from "./Modal2";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { url } from "../../Api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChair,
    faDoorOpen,
    faTrashCan,
    faPenToSquare,
    faBorderAll,
    faSquare,
    faGripLines,
} from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;

    position: relative;
    border-radius: 10px;
`;
const ButtonContainer = styled.div`
    width: 150px;
    height: 500px;
    /* border: 1px solid rgba(0, 0, 0, 0.1); */
    border-top-left-radius: 8px;
    border-bottom-left-radius: 10px;
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    background-color: ${(props) => props.theme.menuOrangeColor};

    & button {
        padding: 0;
        margin: 0;
        top: 10%;
        right: 5%;
        border: none;
        width: 135px;
        height: 40px;
        background-color: rgba(0, 0, 0, 0);
        cursor: pointer;
        display: flex;
        align-items: center;
        /* z-index: 1; */
        transition: background-color, 0.3s;

        svg {
            color: ${(props) => props.theme.mainColor};
        }

        p {
            margin-left: 14px;
            font-size: 20px;
            margin-right: 10px;
        }
        span {
            font-size: 13px;
        }
        :hover {
            /* display:flex;
      align-items: center; */

            background-color: #ffd59e;
            color: white;
            border-radius: 8px;

            svg {
                color: ${(props) => props.theme.lightMainColor};
            }

            /* cursor: pointer;
  
    padding-left:10px;
    height: 35px; */
        }
    }
`;
const CanvasContainer = styled.div`
    width: 845px;
    height: 500px;
`;
const Garbage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 15px;
    bottom: 15px;
    width: 50px;
    height: 50px;
    font-size: 35px;
    z-index: 2;

    svg {
        color: ${(props) => props.theme.fontGrayColor};
    }
`;

const appearDisappear = keyframes`
    0%{
      opacity:0;
    }
    50%{
      opacity:1.0;
    }
    100%{
      opacity:0;
      
    }
`;
const AlertModal = styled.div`
    z-index: 10;
    position: absolute;
    width: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 50px;
    background-color: gray;
    color: white;
    border-radius: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    opacity: 0;
    animation: ${appearDisappear} 3s ease-in-out;
`;

const MyGroup = ({ shapeProps, onChange, isDelete, tables, setTables, setIsDelete }) => {
    return (
        <React.Fragment>
            <Group
                draggable
                onDragEnd={(e) => {
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y(),
                    });

                    if (isDelete === true) {
                        const tmp = tables.filter((table) => table.id !== e.target.attrs.id);
                        setTables([...tmp]);
                        setIsDelete(false);
                    }
                }}
            />
        </React.Fragment>
    );
};

const Table = ({
    shapeProps,
    isSelected,
    onSelect,
    onChange,
    isDelete,
    tables,
    setTables,
    setIsDelete,
    validateRotation,
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
                        const tmp = tables.filter((table) => table.id !== e.target.attrs.id);
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
                    const rotation = node.rotation();

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
                        rotation: validateRotation(rotation),
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
                    });
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
    validateRotation,
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
                    const rotation = node.rotation();

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
                        rotation: validateRotation(rotation),
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
    validateRotation,
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
                        const tmp = windows.filter((window) => window.id !== e.target.attrs.id);
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
                    const rotation = node.rotation();

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
                        rotation: validateRotation(rotation),
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
    validateRotation,
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
                    const rotation = node.rotation();

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
                        rotation: validateRotation(rotation),
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

const MyCanvas = ({ floorCallback, bool, index }) => {
    const [tables, setTables] = useState([]);
    const [seats, setSeats] = useState([]);
    const [walls, setWalls] = useState([]);
    const [windows, setWindows] = useState([]);
    const [doors, setDoors] = useState([]);
    const [show, setShow] = useState(bool);

    console.log("showshowshowshow", bool);
    console.log("indexindexindexindexindexindex", index);
    const [selectedId, selectShape] = useState(null);
    const [tableCnt, setTableCnt] = useState(1);
    const [seatCnt, setSeatCnt] = useState(1);
    const [wallCnt, setWallCnt] = useState(1);
    const [windowCnt, setWindowCnt] = useState(1);
    const [doorCnt, setDoorCnt] = useState(1);
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

    const [isDelete, setIsDelete] = useState(false);

    const [alertModal, setAlertModal] = useState(false);

    const getToken = localStorage.getItem("managerToken");
    const marketIdLS = localStorage.getItem("marketId");

    const validateRotation = (num) => {
        if (num >= -5 && num <= 5) {
            return 0;
        } else if (num > 0) {
            const degree = num;
            if (degree > 0 && degree <= 15) return 15;
            else if (degree > 15 && degree <= 30) return 30;
            else if (degree > 30 && degree <= 45) return 45;
            else if (degree > 45 && degree <= 60) return 60;
            else if (degree > 60 && degree <= 75) return 75;
            else if (degree > 75 && degree <= 90) return 90;
            else if (degree > 90 && degree <= 105) return 105;
            else if (degree > 105 && degree <= 120) return 120;
            else if (degree > 120 && degree <= 135) return 135;
            else if (degree > 135 && degree <= 150) return 150;
            else if (degree > 150 && degree <= 165) return 165;
            else if (degree > 165 && degree <= 180) return 180;
            else return 0;
        } else {
            const degree = Math.abs(num);
            if (degree > 0 && degree <= 15) return -15;
            else if (degree > 15 && degree <= 30) return -30;
            else if (degree > 30 && degree <= 45) return -45;
            else if (degree > 45 && degree <= 60) return -60;
            else if (degree > 60 && degree <= 75) return -75;
            else if (degree > 75 && degree <= 90) return -90;
            else if (degree > 90 && degree <= 105) return -105;
            else if (degree > 105 && degree <= 120) return -120;
            else if (degree > 120 && degree <= 135) return -135;
            else if (degree > 135 && degree <= 150) return -150;
            else if (degree > 150 && degree <= 165) return -165;
            else if (degree > 165 && degree <= 180) return -180;
            else return 0;
        }
        // return target;
    };

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
            createTable(tableNum, tableWidth, tableHeight, minPeopleNum, maxPeopleNum);
        }
        if (edit) {
            editTable(id, tableNum, tableWidth, tableHeight, minPeopleNum, maxPeopleNum);
        }
    };
    const editTable = (id, tableNum, tableWidth, tableHeight, minPeopleNum, maxPeopleNum) => {
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
    const createTable = (tableNum, tableWidth, tableHeight, minPeopleNum, maxPeopleNum) => {
        //openModal();

        console.log("creatTable함수");
        const table = {
            x: 100 + tableCnt * 20,
            y: 100 + tableCnt * 20,
            width: tableWidth,
            height: tableHeight,
            // fill: RGBA(101, 67, 33),
            fill: "#FFB385",
            rotation: 0,
            id: "table" + tableCnt,
            tableNum: tableNum,
            minPeople: minPeopleNum,
            maxPeople: maxPeopleNum,
        };

        console.log("만들어진 테이블:", table);
        setId(id);
        setTableCnt(tableCnt + 1);
        setTables([...tables, table]);
    };

    const createSeat = () => {
        const seat = {
            x: 200 + seatCnt,
            y: 200 + seatCnt,
            radius: 11,
            fill: "#FFD07F",
            id: "seat" + seatCnt,
        };
        setSeatCnt(seatCnt + 1);
        setSeats([...seats, seat]);
    };

    const createWall = () => {
        const wall = {
            x: 100,
            y: 100,
            width: 250,
            height: 5,
            fill: "#DED7B1",
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
            fill: "#93D5FF",
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
            fill: "#CC7351",
            rotation: 0,
            id: "door" + doorCnt,
        };
        setDoorCnt(doorCnt + 1);
        setDoors([...doors, door]);
    };

    const getShape = () => {
        const getToken = localStorage.getItem("managerToken");

        var config = {
            method: "get",
            url: url + `/fooding/restaurant/${marketIdLS}/structure`,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getToken,
            },
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                const floor1 = response.data.floors[index];
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
                        fill: "#FFB385",
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
                        radius: 11,
                        fill: "#FFD07F",
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
                        fill: "#DED7B1",
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
                        fill: "#93D5FF",
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
                        fill: "#CC7351",
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
    useEffect(() => {
        console.log("렌더링");
    }, [tables]);
    // submit
    let floor = {
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
    };

    useEffect(() => {
        floorCallback(index, floor);
    }, [floor]);

    function delay() {
        return new Promise((resolve) => setTimeout(resolve, 3000));
    }
    async function modalSet() {
        await delay();
        setAlertModal(false);
    }

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
    const eraseAll = () => {
        tables.clear();
        seats.clear();
        windows.clear();
        walls.clear();
        doors.clear();
    };
    if (bool == true) {
        return (
            <Container>
                <ButtonContainer>
                    {/* 만약에 매장 주인이 처음 만드는 거라면 floor 가 증가되도록 해야함. 
       층 추가하기 버튼 누르면 캔버스 위에 1 2 3 뜨도록
       */}
                    <button onClick={openModal}>
                        <p>
                            <FontAwesomeIcon icon={faSquare} />
                        </p>
                        <span>테이블 </span>{" "}
                    </button>
                    <button onClick={createSeat}>
                        <p>
                            <FontAwesomeIcon icon={faChair} />
                        </p>
                        <span> 좌석 </span>
                    </button>
                    <button onClick={createWall}>
                        <p>
                            <FontAwesomeIcon icon={faGripLines} />
                        </p>
                        <span>벽 </span>
                    </button>
                    <button onClick={createWindow}>
                        <p>
                            <FontAwesomeIcon icon={faBorderAll} />
                        </p>
                        <span>창문 </span>
                    </button>
                    <button onClick={createDoor}>
                        <p>
                            <FontAwesomeIcon icon={faDoorOpen} />
                        </p>
                        <span>출입구 </span>
                    </button>
                    {/* <button onClick={postData}>
          <p>
            <FontAwesomeIcon icon={faSquareCheck} />
          </p>
          <span>저장하기</span>
        </button> */}
                    <button onClick={changeInfo}>
                        <p>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </p>
                        <span>테이블 수정</span>
                    </button>
                    {/* <button onClick={eraseAll}><p><FontAwesomeIcon icon={faPenToSquare} /></p><span>모두 지우기</span></button> */}

                    <Garbage onMouseUp={handleDelete}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </Garbage>
                </ButtonContainer>
                <CanvasContainer>
                    <Stage
                        width={845}
                        height={500}
                        onMouseDown={checkDeselect}
                        onTouchStart={checkDeselect}
                    >
                        <Layer>
                            {tables.map((table, i) => {
                                console.log("테이블 그림", table, i);
                                return (
                                    <>
                                        <Table
                                            onDblClick={handleTableDblClick}
                                            shapeProps={table}
                                            isSelected={table.id === selectedId}
                                            tables={tables}
                                            setTables={setTables}
                                            isDelete={isDelete}
                                            setIsDelete={setIsDelete}
                                            validateRotation={validateRotation}
                                            onSelect={() => {
                                                selectShape(table.id);
                                            }}
                                            onChange={(newAttrs) => {
                                                const tmp = tables.slice();
                                                tmp[i] = newAttrs;
                                                setTables(tmp);
                                            }}
                                        />
                                        <Text
                                            text={table.tableNum}
                                            rotation={table.rotation}
                                            x={table.x}
                                            y={table.y}
                                            fontSize="15"
                                        />
                                    </>
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
                                        validateRotation={validateRotation}
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
                                        validateRotation={validateRotation}
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
                                        validateRotation={validateRotation}
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
                </CanvasContainer>
                {modal ? (
                    <Modal2
                        parentCallback={handleCallback}
                        editModal={editModal}
                        editTableObj={editTableObj}
                    />
                ) : null}

                <AnimatePresence>
                    {alertModal ? <AlertModal>매장 구조가 등록되었습니다.</AlertModal> : null}
                </AnimatePresence>
            </Container>
        );
    } else {
        return <div></div>;
    }
};

export default MyCanvas;
