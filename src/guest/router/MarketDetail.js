import React, { useEffect, useState, Component } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Header from "../component/Header";
import { url } from "../../Api";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MultipleSlider from "../component/MultipleSlider";
import "@fortawesome/fontawesome-free/js/all.js";
import { Stage, Layer, Rect, Circle, Transformer } from "react-konva";
// import CurrentTable from "../component/CurrentTables";
import { motion, AnimatePresence } from "framer-motion";

import {
    faCaretRight,
    faCaretDown,
    faEye,
    faPencil,
    faStar,
    faChevronRight,
    faChevronDown,
    faAngleDown,
    faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
const Container = styled.div`
    /* border: 1px solid black; */
    width: 410px;
    height: 770px;
    position: relative;
    box-sizing: border-box;
    overflow: auto;
    /* flex-wrap:wrap; */
    ::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
    }
`;

const MarketImgsBox = styled.div`
    width: 100%;
    height: 150px;
    //background-color: orange;
    margin-top: 60px;
`;

const MarketTitleBox = styled.div`
    width: 100%;
    height: 110px;
    border-bottom: 1px solid ${(props) => props.theme.borderGrayColor};
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    align-items: center;

    span {
        margin: 10px 5px;
        font-size: 13px;
    }
    .leftInfos {
        display: flex;
        flex-direction: column;
        .marketName {
            font-size: 23px;
            margin-bottom: 20px;
        }
    }
    .avgScore {
        font-size: 25px;
        font-weight: bold;
        color: ${(props) => props.theme.mainColor};
    }
`;

const MarketMenuBox = styled.div`
    position: sticky;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid ${(props) => props.theme.borderGrayColor};
`;

const MenuBtnBox = styled.div`
    width: 70px;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    list-style: none;
    a {
        text-decoration: none;
    }
    svg {
        font-size: 30px;
        color: ${(props) => props.theme.mainColor};
    }
    span {
        font-size: 13px;
        margin: 0 auto;
        color: ${(props) => props.theme.mainColor};
    }
`;

const MarketDetailInfo = styled.div`
    width: 100%;
    /* height: 300px; */
    height: auto;
    /* margin: 20px 0px; */
    //background-color: skyblue;
    display: flex;
    flex-direction: column;
    padding: 20px;
    font-size: 14px;
    border-bottom: 1px solid ${(props) => props.theme.borderGrayColor};
    .InfosBox {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        /* padding: 10px; */
        //background-color: teal;
        padding: 34px 0px;
    }

    .marketDesc {
        font-size: 17px;
        font-weight: bold;
        margin: 23px 0px;
    }

    p {
        /* letter-spacing: 0.1em; */
        line-height: 1.5;
    }
    .marketIntro {
    }
`;

const EachInfo = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px 0px;

    .marketDescTitle {
        font-weight: bold;
        color: #555655;
    }
`;

const MarketMenuInfo = styled.div`
    width: 100%;
    height: auto;
    margin-bottom: 50px;
    .RepresentatitiveTitle {
        width: 100%;
        height: 25px;
        display: flex;
        margin-left: 20px;
        margin-top: 10px;
        font-size: 17px;
        font-weight: bold;
        align-items: center;
    }
`;
const EachMenu = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px rgba(0, 0, 0, 0.05) solid;
`;
const MenuContainer = styled.div`
    width: 90%;
    height: 130px;
    /* background-color:green; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;
const MenuInfo = styled.div`
    width: 63%;
    height: 80%;

    .MenuName {
        width: 80%;
        height: 20px;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 7px;
        display: flex;
        p {
            margin-right: 4px;
        }
    }
    .MenuDescription {
        width: 80%;
        height: 40px;
        font-size: 12px;
        margin-bottom: 20px;
        line-height: 1.5;
        color: gray;
    }
    .MenuPrice {
        width: 80%;
        height: 20px;
        display: flex;
        font-size: 15px;
    }
`;
const MenuImg = styled.div`
    width: 33%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    .imgContainer {
        width: 100%;
        height: 90%;
        img {
            width: 100%;
            height: 100%;
            border-radius: 12px;
        }
    }
`;

const MoreMenu = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${(props) => props.theme.mainColor};
    :hover {
        cursor: pointer;
    }
    p {
        margin-left: 20px;
    }
    .iconContainer {
        margin-right: 24px;
        font-size: 20px;
    }
`;

const MarketTable = styled.div`
    padding: 30px 0px;
    .marketDesc {
        font-size: 17px;
        font-weight: bold;
        margin: 23px 0px;
        padding: 20px;
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

const Modal = styled.div`
    z-index: 10;
    position: absolute;
    width: 90%;
    /* margin-top: 60%; */
    left: 8%;
    top: 50%;
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

// const marketId = localStorage.getItem("marketId");
const getToken = localStorage.getItem("guestToken");

// const CurrentTable = () => {
//   const [tables, setTables] = useState([]);
//   const [seats, setSeats] = useState([]);
//   const [walls, setWalls] = useState([]);
//   const [windows, setWindows] = useState([]);
//   const [doors, setDoors] = useState([]);
//   const [wholeFloorsLength, setWholeFloorsLength] = useState();
//   const [wholeFloor, setWholeFloor] = useState();
//   const [selectedId, selectShape] = useState(null);
//   const [tableCnt, setTableCnt] = useState([]);
//   const [seatCnt, setSeatCnt] = useState([]);
//   const [wallCnt, setWallCnt] = useState([]);
//   const [windowCnt, setWindowCnt] = useState([]);
//   const [doorCnt, setDoorCnt] = useState([]);
//   const [id, setId] = useState();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [availableTable, setAvailableTable] = useState([]);
//   const [availableTableNumArr, setAvailableTableNumArr] = useState([]);

//   useEffect(() => {
//     //console.log("current market id", currentMarketId);

//     getAvailableTable();
//     getShape();
//   }, []);

//   const getAvailableTable = () => {
//     var config = {
//       method: "get",
//       url:
//         url +
//         `/fooding/restaurant/${marketId}/reservation?date=2022-05-19&num=2&time=11:30`,
//       headers: {
//         Authorization: "Bearer " + getToken,
//       },
//     };

//     axios(config)
//       .then(function (response) {
//         console.log(response.data.tables);
//         setAvailableTable(response.data.tables);
//         const availableTable = response.data.tables;
//         return availableTable;
//       })
//       .then((availableTable) => {
//         const availableTableNumArr = availableTable.map((table) => {
//           return table.tableNum;
//         });

//         setAvailableTableNumArr(availableTableNumArr);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };

//   const getShape = () => {
//     const marketId = localStorage.getItem("marketId");

//     var config = {
//       method: "get",
//       url: url + `/fooding/restaurant/${marketId}/structure`,
//       Authorization: "Bearer " + getToken,
//     };

//     axios(config)
//       .then(function (response) {
//         console.log(response.data);
//         const floors = response.data.floors;
//         setWholeFloorsLength(floors.length);
//         setWholeFloor(floors);
//         console.log("floors length", wholeFloorsLength);
//         let tempTableCntArr = [];
//         let tempSeatCntArr = [];
//         let tempWallCntArr = [];
//         let tempWindowCntArr = [];
//         let tempDoorCntArr = [];

//         let tempTablesArr = [];
//         let tempSeatsArr = [];
//         let tempWallsArr = [];
//         let tempWindowsArr = [];
//         let tempDoorsArr = [];

//         for (var i = 0; i < response.data.floors.length; i++) {
//           const tempTable = [];
//           const tempSeat = [];
//           const tempWall = [];
//           const tempWindow = [];
//           const tempDoor = [];

//           floors[i].tables.forEach((t, id) => {
//             const table = {
//               x: t.x,
//               y: t.y,
//               width: t.width,
//               height: t.height,
//               fill: "brown",
//               rotation: t.rotation,
//               id: "table" + id,
//               tableNum: t.tableNum,
//               minPeople: t.minPeople,
//               maxPeople: t.maxPeople,
//             };
//             tempTable.push(table);
//             setId(id);
//           });
//           tempTableCntArr.push(floors[i].tables.length);
//           console.log("tempTableCntArr", tempTableCntArr);

//           floors[i].seats.map((s, id) => {
//             const seat = {
//               x: s.x,
//               y: s.y,
//               radius: 10,
//               fill: "gray",
//               id: "seat" + id,
//             };
//             tempSeat.push(seat);
//           });
//           tempSeatCntArr.push(floors[i].seats.length);

//           floors[i].walls.map((w, id) => {
//             const wall = {
//               x: w.x,
//               y: w.y,
//               width: w.width,
//               height: 5,
//               fill: "black",
//               rotation: w.rotation,
//               id: "wall" + id,
//             };
//             tempWall.push(wall);
//           });
//           tempWallCntArr.push(floors[i].walls.length);

//           floors[i].windows.map((w, id) => {
//             const window = {
//               x: w.x,
//               y: w.y,
//               width: w.width,
//               height: 5,
//               fill: "skyblue",
//               rotation: w.rotation,
//               id: "window" + id,
//             };
//             tempWindow.push(window);
//           });
//           tempWindowCntArr.push(floors[i].windows.length);

//           floors[i].doors.map((d, id) => {
//             const door = {
//               x: d.x,
//               y: d.y,
//               width: d.width,
//               height: 15,
//               fill: "green",
//               rotation: d.rotation,
//               id: "door" + id,
//             };
//             tempDoor.push(door);
//           });
//           tempDoorCntArr.push(floors[i].doors.length);

//           tempTablesArr.push(tempTable);
//           tempSeatsArr.push(tempSeat);
//           tempWallsArr.push(tempWall);
//           tempWindowsArr.push(tempWindow);
//           tempDoorsArr.push(tempDoor);
//         } //for문을 돌면서 floor에 있는 요소를 다 저장을 해줘야함

//         setTableCnt(tempTableCntArr);
//         setSeatCnt(tempSeatCntArr);
//         setWallCnt(tempWallCntArr);
//         setWindowCnt(tempWindowCntArr);
//         setDoorCnt(tempDoorCntArr);

//         setTables(tempTablesArr);
//         setSeats(tempSeatsArr);
//         setWalls(tempWallsArr);
//         setWindows(tempWindowsArr);
//         setDoors(tempDoorsArr);

//         // console.log("real tableCnts",tableCnt);
//         // console.log("real setSeatCnt",seatCnt);
//         // console.log("real setWallCnt",wallCnt);
//         // console.log("real setWindowCnt",windowCnt);
//         // console.log("real setDoorCnt",doorCnt);

//         // console.log("tablestables",tempTablesArr);
//         console.log("wholeFloor", wholeFloor);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };
//   return (
//     <Stage
//       style={{
//         marginTop: "10px",
//         display: "flex",
//         justifyContent: "center",
//       }}
//       width={300}
//       height={200}
//       //   fill={"yellow"}
//       //   onMouseDown={checkDeselect}
//       //   onTouchStart={checkDeselect}
//     >
//       <Layer>
//         {tables[currentIndex]?.map((table, i) => {
//           return (
//             <Rect
//               id={table?.id}
//               x={table.x / 3}
//               y={table.y / 3}
//               width={table.width / 3}
//               height={table.height / 3}
//               rotation={table.rotation}
//               //   fill={
//               //     selectedTable?.id === table.id
//               //       ? "#764225"
//               //       : availableTableNumArr.includes(table.tableNum)
//               //       ? "brown"
//               //       : "black"
//               //   }

//               fill={
//                 availableTableNumArr.includes(table.tableNum)
//                   ? "#FF7B54"
//                   : "rgba(0,0,0,0.2)"
//               }
//             />
//           );
//         })}
//         {walls[currentIndex]?.map((wall, i) => {
//           return (
//             <Rect
//               x={wall.x / 3}
//               y={wall.y / 3}
//               width={wall.width / 3}
//               height={wall.height / 3}
//               fill="#DED7B1"
//               rotation={wall.rotation}
//             />
//           );
//         })}
//         {seats[currentIndex]?.map((seat, i) => {
//           return (
//             <Circle
//               x={seat.x / 3}
//               y={seat.y / 3}
//               radius={4}
//               fill="#FFD07F"
//               rotation={seat.rotation}
//             />
//           );
//         })}
//         {windows[currentIndex]?.map((window, i) => {
//           return (
//             <Rect
//               x={window.x / 3}
//               y={window.y / 3}
//               width={window.width / 3}
//               height={window.height / 3}
//               fill="#93D5FF"
//               rotation={window.rotation}
//             />
//           );
//         })}
//         {doors[currentIndex]?.map((door, i) => {
//           return (
//             <Rect
//               x={door.x / 3}
//               y={door.y / 3}
//               width={door.width / 3}
//               height={door.height / 3}
//               fill="#CC7351"
//               rotation={door.rotation}
//             />
//           );
//         })}
//       </Layer>
//     </Stage>
//   );
// };
const FloorButtonContainer = styled.div`
    width: 90%;
    margin-left: 13px;
    height: 30px;
    display: flex;
`;
const MarketDetail = () => {
    const [market, setMarket] = useState();
    const [marketMenu, setMarketMenu] = useState();
    const [representativeNNormal, setRepresentativeNNormal] = useState();
    const [representative, setRepresentative] = useState();
    const [toggle, setToggle] = useState(false);
    const { marketId } = useParams();
    const [category, setCategory] = useState([]);

    const [modal, setModal] = useState(false);

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

    const [maximumUsageTime, setMaximumUsageTime] = useState();

    const [floor, setFloor] = useState([true]);
    const [selectedFloor, setSelectedFloor] = useState(0);

    const FloorButton = styled.div`
        width: 40px;
        height: 30px;
        font-size: 13px;
        border-radius: 7px;
        margin-left: 10px;
        background-color: ${(props) => (props.num == selectedFloor ? "#FF7B54" : "#f4f4f5")};
        color: ${(props) => (props.num == selectedFloor ? "white" : "black")};

        display: flex;
        justify-content: center;
        align-items: center;
        :hover {
            cursor: pointer;
        }
    `;
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
                const savefloorNum = Array(response.data.floors.length);
                savefloorNum.fill(false);
                savefloorNum[0] = true;
                console.log("saveFloorNum", savefloorNum);
                setFloor(savefloorNum);
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

    useEffect(() => {
        console.log("marketId", marketId);
        localStorage.setItem("marketId", marketId);

        getAvailableTable();
        getShape();

        var config = {
            method: "get",
            url: url + `/fooding/restaurant/${marketId}`,
            Authorization: "Bearer " + getToken,
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                setMarket(response.data);
                setMaximumUsageTime(response.data.maximumUsageTime);
                localStorage.setItem("maximumUsageTime", response.data.maximumUsageTime);
                const korCategory = response.data.category.map((category) => {
                    if (category === "KOREAN") return "한식";
                    else if (category === "JAPANESE") return "일식";
                    else if (category === "CHINESE") return "중식";
                    else if (category === "WESTERN") return "양식";
                    else if (category === "VIETNAM") return "베트남";
                    else if (category === "TAIWAN") return "태국";
                    else if (category === "SNACK") return "분식";
                    else if (category === "NOODLE") return "면요리";
                    else if (category === "BBQ") return "바베큐";
                    else if (category === "PORK") return "돼지고기";
                    else if (category === "BEEF") return "소고기";
                    else if (category === "CHICKEN") return "닭고기";
                    else if (category === "LAMB") return "양고기";
                    else if (category === "CAFE") return "카페";
                    else if (category === "DESSERT") return "디저트";
                    else if (category === "BAR") return "바";
                    else if (category === "PUB") return "술집";
                });

                console.log(korCategory);
                setCategory(korCategory);

                localStorage.setItem(
                    "weekdaysWorkHour",
                    JSON.stringify(response.data.weekdaysWorkHour)
                );
                localStorage.setItem(
                    "weekendsWorkHour",
                    JSON.stringify(response.data.weekendsWorkHour)
                );
            })
            .catch(function (error) {
                console.log(error);
            });

        var config2 = {
            method: "get",
            url: url + `/fooding/restaurant/${marketId}/menu`,
        };

        axios(config2)
            .then(function (response) {
                console.log(response.data);
                setMarketMenu(response.data);
                bringRepresentativeMenu(response.data);
            })
            .then(function () {})
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    const bringRepresentativeMenu = (menuss) => {
        let representativeMenu = [];
        let normalMenu = [];

        menuss?.map((menu) => {
            if (menu.representative === true) {
                representativeMenu.push(menu);
            } else {
                normalMenu.push(menu);
            }
        });
        let representNnormal = representativeMenu.concat(normalMenu);
        console.log("representNnormal", representNnormal);
        setRepresentativeNNormal(representNnormal);
        setRepresentative(representativeMenu);
    };
    // useEffect(()=>{

    // },[representativeNNormal,market,marketMenu]);
    const getToken = localStorage.getItem("guestToken");
    const postFavorList = () => {
        const data = JSON.stringify({
            restId: marketId,
        });
        console.log("보낼 데이터", data);
        var config = {
            method: "post",
            url: url + `/fooding/mypage/bookmark/${marketId}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getToken,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                setModal(true);
                modalSet();
                console.log(response.data);
            })
            .then(function () {})
            .catch(function (error) {
                console.log(error);
            });
    };

    function delay() {
        return new Promise((resolve) => setTimeout(resolve, 3000));
    }
    async function modalSet() {
        await delay();
        setModal(false);
    }

    const seeMoreMenu = () => {
        setToggle((toggle) => !toggle);
    };
    return (
        <Container>
            <Header back="/guest/restaurantList" title={""} />
            <MarketImgsBox>
                <MultipleSlider images={market?.images} />
            </MarketImgsBox>
            <MarketTitleBox>
                <div className="leftInfos">
                    <span className="marketName">{market?.name}</span>
                    <div>
                        <span style={{ color: "gray" }}>
                            {" "}
                            <FontAwesomeIcon icon={faEye} /> {market?.viewCount}
                        </span>
                        <span style={{ color: "gray" }}>
                            {" "}
                            <FontAwesomeIcon icon={faPencil} style={{ marginRight: "6px" }} />
                            {market?.reviewCount}
                        </span>
                    </div>
                </div>
                <div className="avgScore">{Number(market?.avgScore).toFixed(1)}</div>
            </MarketTitleBox>
            <MarketMenuBox>
                <MenuBtnBox onClick={postFavorList}>
                    <i class="fa-solid fa-star"></i>
                    <span>즐겨찾기</span>
                </MenuBtnBox>
                <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to="/guest/reservation1"
                    state={{
                        maximumUsageTime: market?.maximumUsageTime,
                        weekdaysWorkHour: market?.weekdaysWorkHour,
                        weekendsWorkHour: market?.weekendsWorkHour,
                        marketId: marketId,
                    }}
                >
                    <MenuBtnBox>
                        <i className="fa-solid fa-calendar-days reservation"></i>
                        <span>예약하기</span>
                    </MenuBtnBox>
                </Link>
                <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to={`/guest/review/${marketId}`}
                    state={{
                        marketId: marketId,
                    }}
                >
                    <MenuBtnBox>
                        <i class="fa-solid fa-pen"></i>
                        <span>리뷰</span>
                    </MenuBtnBox>
                </Link>
            </MarketMenuBox>
            <MarketDetailInfo>
                {/* 매장소개, 운영시간,주소,전화번호(매장,개인),주차공간,최대이용가능시간,카테고리, */}
                <span className="marketDesc">매장 소개</span>
                <p clasName="marketIntro">{market?.intro}</p>
                <div className="InfosBox">
                    <span className="marketDesc">편의정보</span>
                    <EachInfo>
                        <span className="marketDescTitle">카테고리</span>
                        <div>
                            {category?.map((c, index) =>
                                category.length == index + 1 ? (
                                    <span style={{ marginLeft: "4px" }}>{c} </span>
                                ) : (
                                    <span style={{ marginLeft: "4px" }}>{c} /</span>
                                )
                            )}
                        </div>
                    </EachInfo>
                    <EachInfo>
                        <span className="marketDescTitle">영업시간</span>
                        <span>
                            주중 {market?.weekdaysWorkHour.open.substring(0, 5)}-
                            {market?.weekdaysWorkHour.close.substring(0, 5)} / 주말{" "}
                            {market?.weekendsWorkHour.open.substring(0, 5)}-
                            {market?.weekendsWorkHour.close.substring(0, 5)}
                        </span>
                    </EachInfo>
                    <EachInfo>
                        <span className="marketDescTitle">주소</span>
                        <span>{market?.location.addressName}</span>
                    </EachInfo>
                    <EachInfo>
                        <span className="marketDescTitle">주차정보</span>
                        <span>{market?.parkingInfo}</span>
                    </EachInfo>
                    <EachInfo>
                        <span className="marketDescTitle">개인번호</span>
                        <span>{market?.tel[0]}</span>
                    </EachInfo>
                    <EachInfo>
                        <span className="marketDescTitle">사업자번호</span>
                        <span>{market?.tel[1]}</span>
                    </EachInfo>
                </div>
            </MarketDetailInfo>
            <MarketTable>
                <span className="marketDesc">테이블 현황</span>
            </MarketTable>
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

                                // fill={
                                //   availableTableNumArr.includes(table.tableNum)
                                //     ? "#FF7B54"
                                //     : "rgba(0,0,0,0.2)"
                                // }
                                fill={
                                    availableTable[table.tableNum - 1]
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
            {/* <CurrentTable currentMarketId={marketId}></CurrentTable> */}
            <MarketMenuInfo>
                {/* 대표메뉴 3,4개 나오고 슬라이드 버튼 누르면 나머지 메뉴 나오게
  만약에 대표메뉴가 있다면 그 메뉴를 우선 띄어줌 그리고 나머지 메뉴를 띄워줌.
  만약 대표메뉴가 없다면 문자열 순서대로 일반메뉴들 띄워줌.

*/}
                <div className="RepresentatitiveTitle">
                    <p>대표메뉴</p>
                </div>

                {
                    //세개만 만들어놓음.
                    representative?.map((menu, index) => {
                        return (
                            <EachMenu>
                                <MenuContainer>
                                    <MenuInfo>
                                        <div className="MenuName">{menu.name}</div>
                                        <div className="MenuDescription">
                                            {menu.description.length > 50
                                                ? menu.description.slice(0, 50) + "..."
                                                : menu.description}
                                        </div>
                                        <div className="MenuPrice">
                                            {menu.price}
                                            <p>원</p>
                                        </div>
                                    </MenuInfo>
                                    <MenuImg>
                                        <div className="imgContainer">
                                            <img src={menu.image}></img>
                                        </div>
                                    </MenuImg>
                                </MenuContainer>
                            </EachMenu>
                        );
                    })
                }
                <MoreMenu onClick={seeMoreMenu}>
                    <p>메뉴 더보기</p>
                    <div className="iconContainer">
                        {toggle ? (
                            <FontAwesomeIcon icon={faAngleDown} />
                        ) : (
                            <FontAwesomeIcon icon={faAngleRight} />
                        )}
                    </div>
                </MoreMenu>
                {/* 메뉴 더보기 div 전체를 누르면  펼쳐진 상태가 되고 그옆에 아이콘도 아래로 바뀜*/}
                {toggle
                    ? representativeNNormal?.map((menu, index) => {
                          return (
                              <EachMenu>
                                  <MenuContainer>
                                      <MenuInfo>
                                          <div className="MenuName">
                                              {menu.representative == true ? (
                                                  <FontAwesomeIcon
                                                      icon={faStar}
                                                      style={{ color: "#FF7B54" }}
                                                  />
                                              ) : null}
                                              {""}
                                              {menu.name}
                                          </div>
                                          <div className="MenuDescription">
                                              {menu.description.length > 50
                                                  ? menu.description.slice(0, 50) + "..."
                                                  : menu.description}
                                          </div>
                                          <div className="MenuPrice">
                                              {menu.price}
                                              <p>원</p>
                                          </div>
                                      </MenuInfo>
                                      <MenuImg>
                                          <div className="imgContainer">
                                              <img src={menu.image}></img>
                                          </div>
                                      </MenuImg>
                                  </MenuContainer>
                              </EachMenu>
                          );
                      })
                    : null}
            </MarketMenuInfo>
            <AnimatePresence>
                {modal ? <Modal>즐겨찾기에 등록되었습니다.</Modal> : null}
            </AnimatePresence>
        </Container>
    );
};

export default MarketDetail;
