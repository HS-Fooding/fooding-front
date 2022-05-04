import React, { useEffect } from "react";
import _ from "lodash";
import axios from "axios";
import { url } from "../Api";

import RGL, { WidthProvider, Responsive } from "react-grid-layout";

const BLOCK_OF_TIME = 30;

const parseDate = (date, time) => {
    const _date = date.split("-");
    var _time;
    if (typeof time === "object") {
        _time = [time.getHours(), time.getMinutes()];
    } else {
        _time = time.split(":");
    }

    // const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

    const result = new Date(_date[0], _date[1] - 1, _date[2]);

    result.setHours(_time[0]);
    result.setMinutes(_time[1]);
    return result;
};

// const getWorkingHour = (tableLength, open, close) => {
//     return tableLength * ((close - open) / (18 * 100000));
// };

const transformData = (dummy) => {
    // console.log("original : ", dummy);
    return {
        date: dummy.tableInfo.date,
        open: parseDate(dummy.tableInfo.date, dummy.tableInfo.open),
        close: parseDate(dummy.tableInfo.date, dummy.tableInfo.close),
        maxUsageTime: dummy.tableInfo.maxUsageTime,
        tableNums: Object.assign({}, dummy.tableInfo.tableNums),
        reservations: dummy.reservations.map((m) => {
            const diff =
                (parseDate(dummy.tableInfo.date, m.reservAt) -
                    parseDate(dummy.tableInfo.date, dummy.tableInfo.open)) /
                (60 * 1000 * BLOCK_OF_TIME);
            return {
                nickname: m.nickname,
                tableNum: m.tableNum,
                reservCount: m.reservCount,
                isCar: m.car,
                // reservAt: parseDate(dummy.tableInfo.date, m.reservAt),
                reservAt: m.reservAt,
                x: dummy.tableInfo.tableNums.findIndex((t) => t === m.tableNum), // 테이블 번호
                y: diff,
                w: 1,
                h: dummy.tableInfo.maxUsageTime / 30,
            };
        }),
    };
};

const ResponsiveReactGridLayout = WidthProvider(Responsive);
var data = "hello";
const ManageReserv = () => {
    const [transformed, setTransformed] = React.useState({});
    const [reservations, setReservations] = React.useState([]);
    const [layout, setLayout] = React.useState([]);
    const [breakpoint, setBreakpoint] = React.useState([]);
    const [cols, setCols] = React.useState([]);
    const [restInfo, setRestInfo] = React.useState({});
    const [newCounter, setNewCounter] = React.useState(0);

    useEffect(async () => {
        const getToken = localStorage.getItem("token");

        const config = {
            method: "get",
            // url: url + `/fooding/admin/restaurant/${restId}/reservation`,
            url: url + `/fooding/admin/restaurant/${1}/reservation`,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getToken,
            },
            params: {
                // date: "2022-05-01",
                date: "1997-06-05",
            },
        };

        await axios(config)
            .then((response) => {
                setTransformed(transformData(response.data));
                // console.log(transformData(response.data));
                setReservations(transformed.reservations);

                data = transformData(response.data);

                return transformData(response.data).reservations;
            })
            .then((response) => {
                // generate layout
                console.log(response);
                const layout = response.map((item, i, list) => {
                    // console.log("res!!", item);
                    return {
                        i: i.toString(),
                        x: response[i].x,
                        y: response[i].y,
                        w: response[i].w,
                        h: parseInt(response[i].h),
                        nickname: response[i].nickname,
                        tableNum: response[i].tableNum,
                        reservCount: response[i].reservCount,
                        isCar: response[i].isCar,
                        reservAt: response[i].reservAt,
                    };
                });
                setLayout(layout);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    ManageReserv.defaultProps = {
        className: "layout",
        // cols: transformed.tableNums,
        cols: data.tablenums, // TODO : Need to check
        rowHeight: 30,
        onLayoutChange: function () {},
        // This turns off compaction so you can place items wherever.
        compactType: null,
        // This turns off rearrangement so items will not be pushed arround.
        preventCollision: true,
    };

    const onLayoutChange = (data, from, to, index) => {
        const tmp = layout;
        const open = transformed.open;
        // console.log("data", data);
        // console.log("from", from);
        // console.log("to", to);
        // console.log("index", index);

        for (var i = 0; i < tmp.length; i++) {
            tmp[i].x = parseInt(data[i].x);
            tmp[i].y = parseInt(data[i].y);
            tmp[i].w = parseInt(data[i].w);
            tmp[i].h = parseInt(data[i].h);
            tmp[i].tableNum = parseInt(data[i].x) + 1;
            const open_hours = open.getHours();
            const open_minutes = open.getMinutes();
            const reserv_hour = data[i].y / 2 + open_hours + open_minutes / 30;
            const reserv_minute = (((data[i].y / 2 + open_hours + open_minutes) % 30) % 1) * 60;
            tmp[i].reservAt = `${
                parseInt(reserv_hour) / 10 >= 1
                    ? parseInt(reserv_hour)
                    : "0".concat(parseInt(reserv_hour))
            }:${reserv_minute === 30 ? reserv_minute : "00"}`;
        }

        const result = layout.map((m, i) => tmp[i]);
        setLayout([...result]);
    };

    const onAddItem = () => {
        // TODO : 추가적으로 모달창 띄워서 값들을 입력 받아야 함
        console.log("transformed", transformed);
        const nickname = prompt("nickname");
        const reservAt = prompt("reservAt");
        const tableNum = prompt("tableNum");
        const reservCount = prompt("reservCount");
        const isCar = prompt("isCar");

        const diff =
            (parseDate(transformed.date, reservAt) -
                parseDate(transformed.date, transformed.open)) /
            (60 * 1000 * BLOCK_OF_TIME);

        const tmp = {
            i: "n" + newCounter,
            // x: transformed.tableNums.findIndex((t) => t === tableNum), // 테이블 번호
            x: parseInt(tableNum - 1),
            y: diff,
            w: 1,
            h: transformed.maxUsageTime / 30,
            //
            nickname,
            reservAt,
            tableNum,
            reservCount,
            isCar: isCar === "true" ? true : false,
        };
        setNewCounter(newCounter + 1);

        setLayout([...layout, tmp]);
    };

    // We're using the cols coming back from this to calculate where to add new items.
    const onBreakpointChange = (breakpoint, cols) => {
        setBreakpoint(breakpoint);
        setCols(cols);
    };

    const onRemoveItem = (i) => {
        console.log("removing", i);

        const result = layout.filter((m) => m.i !== i);
        console.log("result", result);
        setLayout(result);
    };

    const generateDOM = () => {
        const removeStyle = {
            position: "absolute",
            right: "2px",
            top: 0,
            cursor: "pointer",
        };

        return _.map(layout, (el, i) => {
            const t = el.i;
            return (
                <div key={t} data-grid={el}>
                    {/* <div className="text">{i + 1}</div> */}
                    <div>nickname : {el.nickname}</div>
                    <div>tableNum : {el.tableNum}</div>
                    {/* <div>reservAt : {el.reservAt.toLocaleString("en-US", { timeZone: "UTC" })}</div> */}
                    <div>reservAt : {el.reservAt}</div>
                    <div>reservCount : {el.reservCount}</div>
                    <div>isCar : {el.isCar ? "yes" : "no"}</div> {/*TODO*/}
                    <span
                        className="remove"
                        style={removeStyle}
                        onClick={onRemoveItem.bind(this, t)}
                    >
                        x
                    </span>
                </div>
            );
        });
    };

    const stringifyLayout = () => {
        return layout.map((l) => {
            const name = l.i === "__dropping-elem__" ? "drop" : l.i;
            return (
                <div className="layoutItem" key={l.i}>
                    <b>{name}</b>
                    {`: [${l.x}, ${l.y}, ${l.w}, ${l.h}]`}
                </div>
            );
        });
    };

    return (
        <div>
            <button onClick={onAddItem}>Add Item</button>
            <ResponsiveReactGridLayout
                layout={layout}
                onDragStop={onLayoutChange}
                onResize={onLayoutChange}
                onBreakpointChange={onBreakpointChange}
                onRemoveItem={onRemoveItem}
                {...ManageReserv.defaultProps}
            >
                {generateDOM()}
            </ResponsiveReactGridLayout>
            <div>
                <div className="layoutJSON">
                    Displayed as <code>[x, y, w, h]</code>
                    <br />
                    <br />
                    <div className="columns">{stringifyLayout()}</div>
                </div>
            </div>
        </div>
    );
};

export default ManageReserv;
