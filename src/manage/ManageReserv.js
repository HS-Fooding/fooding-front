import React, { useEffect } from "react";
import _ from "lodash";
import axios from "axios";
import { url } from "../Api";

import RGL, { WidthProvider, Responsive } from "react-grid-layout";

const BLOCK_OF_TIME = 30;

const parseDate = (date, time) => {
    const _date = date.split("-");
    const _time = time.split(":");

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
                isCar: m.isCar,
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

const ReactGridLayout = WidthProvider(Responsive);

const ManageReserv = () => {
    const [transformed, setTransformed] = React.useState({});
    const [reservations, setReservations] = React.useState([]);
    const [layout, setLayout] = React.useState([]);
    const [breakpoint, setBreakpoint] = React.useState([]);
    const [cols, setCols] = React.useState([]);
    const [restInfo, setRestInfo] = React.useState({});
    const [newCounter, setNewCounter] = React.useState(0);

    ManageReserv.defaultProps = {
        className: "layout",
        cols: transformed.tableNums,
        rowHeight: 30,
        onLayoutChange: function () {},
        // This turns off compaction so you can place items wherever.
        // verticalCompact: false,
        compactType: null,
        // This turns off rearrangement so items will not be pushed arround.
        preventCollision: true,
    };

    useEffect(async () => {
        const getToken = localStorage.getItem("token");

        // this.onAddItem = this.onAddItem.bind(this);
        // this.onBreakpointChange = this.onBreakpointChange.bind(this);
        const config = {
            method: "get",
            // url: url + `/fooding/admin/restaurant/${restId}/reservation`,
            url: url + `/fooding/admin/restaurant/${2}/reservation`,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getToken,
            },
            params: {
                date: "2022-05-01",
            },
        };

        await axios(config)
            .then((response) => {
                setTransformed(transformData(response.data));
                // console.log(transformData(response.data));
                setReservations(transformed.reservations);

                return transformData(response.data).reservations;
            })
            .then((response) => {
                // generate layout
                const layout = response.map((item, i, list) => {
                    return {
                        i: i.toString(),
                        x: response[i].x,
                        y: response[i].y,
                        w: response[i].w,
                        // h: parseInt(response[i].h),
                        h: 2,
                        // h: 1,
                        nickname: response[i].nickname,
                        tableNum: response[i].tableNum,
                        reservCount: response[i].reservCount,
                        isCar: response[i].isCar,
                        reservAt: response[i].reservAt,
                    };
                });
                // console.log("layout!!", layout);
                setLayout(layout);
                // setRestInfo(transformed);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function onLayoutChange(layout) {
        const tmp = { ...layout };
        // const restInfo = { ...restInfo };
        console.log("tmp", tmp);
        console.log("layout changed", layout);
        const open = transformed.open;
        console.log("open at", open);

        for (var i = 0; i < Object.keys(tmp).length; i++) {
            tmp[i].x = parseInt(layout[i].x);
            tmp[i].y = parseInt(layout[i].y);
            tmp[i].w = parseInt(layout[i].w);
            tmp[i].h = parseInt(layout[i].h);
            tmp[i].tableNum = parseInt(tmp[i].x) + 1;
            const open_hours = open.getHours();
            const open_minutes = open.getMinutes();
            const reserv_hour = tmp[i].y / 2 + open_hours + open_minutes / 30;
            const reserv_minute = (((tmp[i].y / 2 + open_hours + open_minutes) % 30) % 1) * 60;
            tmp[i].reservAt = `${
                parseInt(reserv_hour) / 10 >= 1
                    ? parseInt(reserv_hour)
                    : "0".concat(parseInt(reserv_hour))
            }:${reserv_minute === 30 ? reserv_minute : "00"}`;
        }

        setLayout({ layout: Object.keys(tmp).map((m, i) => layout[i]) });
        // this.setState({ layout: Object.keys(tmp).map((m, i) => tmp[i]) });
        console.log("this", this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
        console.log("this2", this);
    }

    const onAddItem = () => {
        // TODO : 추가적으로 모달창 띄워서 값들을 입력 받아야 함
        const nickname = prompt("nickname");
        const reservAt = prompt("reservAt");
        const tableNum = prompt("tableNum");
        const reservCount = prompt("reservCount");
        const isCar = prompt("isCar");

        const diff =
            (parseDate(transformed.date, reservAt) -
                parseDate(transformed.date, transformed.open)) /
            (60 * 1000 * BLOCK_OF_TIME);

        // console.log("adding", "n" + this.state.newCounter);
        setNewCounter(newCounter + 1);

        setLayout(
            layout.concat({
                i: "n" + newCounter,
                x: transformed.tableNums.findIndex((t) => t === tableNum), // 테이블 번호
                y: diff, // puts it at the bottom
                w: 1,
                h: transformed.maxUsageTime / 30,
                //
                nickname,
                reservAt,
                tableNum,
                reservCount,
                isCar,
            })
        );
    };

    // We're using the cols coming back from this to calculate where to add new items.
    const onBreakpointChange = (breakpoint, cols) => {
        setBreakpoint(breakpoint);
        setCols(cols);
    };

    const onRemoveItem = (i) => {
        console.log("removing", i);
        setLayout({ layout: _.reject(layout, { i: i }) });
    };

    const generateDOM = () => {
        const removeStyle = {
            position: "absolute",
            right: "2px",
            top: 0,
            cursor: "pointer",
        };

        return _.map(layout, (el, i) => {
            // console.log("!!", i, el);
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
                        // onClick={onRemoveItem.bind(this, t)}
                        onClick={onRemoveItem}
                    >
                        x
                    </span>
                </div>
            );
        });
    };

    const stringifyLayout = () => {
        return Object.keys(layout).map((l) => {
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
            <ReactGridLayout
                layout={layout}
                onDragStop={onLayoutChange}
                onResize={onLayoutChange}
                onBreakpointChange={onBreakpointChange}
                // {...this.props}
            >
                {generateDOM()}
            </ReactGridLayout>
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
