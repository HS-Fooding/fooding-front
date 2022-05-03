import React from "react";
import _ from "lodash";
import axios from "axios";
import { url } from "../Api";

import RGL, { WidthProvider, Responsive } from "react-grid-layout";

const BLOCK_OF_TIME = 30;

const dummy2 = {
    tableInfo: {
        open: "9:00",
        close: "11:00",
        date: "2022-04-20",
        maxUsageTime: 120,
        tableNums: ["1", "2", "3", "4", "5", "6", "7"],
    },
    reservations: [
        {
            reservAt: "09:00",
            tableNum: "1",
            nickname: "leo",
            reservCount: 4,
            isCar: false,
        },
        {
            reservAt: "09:30",
            tableNum: "2",
            nickname: "leo",
            reservCount: 2,
            isCar: true,
        },
        {
            reservAt: "10:00",
            tableNum: "3",
            nickname: "tom",
            reservCount: 3,
            isCar: false,
        },
        {
            reservAt: "13:00",
            tableNum: "3",
            nickname: "sam",
            reservCount: 3,
            isCar: true,
        },
    ],
};

const parseDate = (date, time) => {
    const _date = date.split("-");
    const _time = time.split(":");

    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

    const result = new Date(_date[0], _date[1] - 1, _date[2]);

    result.setHours(_time[0]);
    result.setMinutes(_time[1]);
    return result;
};

// const getWorkingHour = (tableLength, open, close) => {
//     return tableLength * ((close - open) / (18 * 100000));
// };

const transformData = (dummy) => {
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
// const transformed = transformData(dummy);
// const reservations = transformed.reservations;

var data = "hello";
export default class ManageReserv extends React.Component {
    // state = { layout: [], restInfo: {} };

    transformed = {};
    reservations = [];

    async componentDidMount() {
        const getToken = localStorage.getItem("token");

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
                // console.log(response.data);
                this.transformed = transformData(response.data);
                data = this.transformed;
                // console.log("!!!", this.transformed);
                console.log("data!!", data);
                this.reservations = this.transformed.reservations;
                // console.log("???", this.reservations);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    static defaultProps = {
        className: "layout",
        // items: this.reservations.length,
        // cols: dummy.tableInfo.tableNums.length,
        cols: data.tableNums,
        rowHeight: 30,
        onLayoutChange: function () {},
        // This turns off compaction so you can place items wherever.
        // verticalCompact: false,
        compactType: null,
        // This turns off rearrangement so items will not be pushed arround.
        preventCollision: true,
    };

    constructor(props) {
        super(props);

        const layout = this.generateLayout();
        this.state = { layout: layout, restInfo: { ...this.transformed }, newCounter: 0 };

        this.onAddItem = this.onAddItem.bind(this);
        this.onBreakpointChange = this.onBreakpointChange.bind(this);
    }

    onLayoutChange = (layout) => {
        const tmp = { ...this.state.layout };
        const restInfo = { ...this.state.restInfo };
        const open = restInfo.open;

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

        this.setState({ layout: Object.keys(tmp).map((m, i) => tmp[i]) });
        this.props.onLayoutChange(layout);
    };

    onAddItem() {
        // TODO : 추가적으로 모달창 띄워서 값들을 입력 받아야 함
        const nickname = prompt("nickname");
        const reservAt = prompt("reservAt");
        const tableNum = prompt("tableNum");
        const reservCount = prompt("reservCount");
        const isCar = prompt("isCar");

        const diff =
            (parseDate(this.transformed.date, reservAt) -
                parseDate(this.transformed.date, this.transformed.open)) /
            (60 * 1000 * BLOCK_OF_TIME);

        // console.log("adding", "n" + this.state.newCounter);

        this.setState({
            // Add a new item. It must have a unique key!
            layout: this.state.layout.concat({
                i: "n" + this.state.newCounter,
                x: this.transformed.tableNums.findIndex((t) => t === tableNum), // 테이블 번호
                y: diff, // puts it at the bottom
                w: 1,
                h: this.transformed.maxUsageTime / 30,
                //
                nickname,
                reservAt,
                tableNum,
                reservCount,
                isCar,
            }),
            // Increment the counter to ensure key is always unique.
            newCounter: this.state.newCounter + 1,
        });
    }

    // We're using the cols coming back from this to calculate where to add new items.
    onBreakpointChange(breakpoint, cols) {
        this.setState({
            breakpoint: breakpoint,
            cols: cols,
        });
    }

    onRemoveItem(i) {
        console.log("removing", i);
        this.setState({ layout: _.reject(this.state.layout, { i: i }) });
    }

    generateDOM() {
        const removeStyle = {
            position: "absolute",
            right: "2px",
            top: 0,
            cursor: "pointer",
        };

        return _.map(this.state.layout, (el, i) => {
            const t = el.add ? "+" : el.i;
            return (
                <div key={t} data-grid={el}>
                    {/* <div className="text">{i + 1}</div> */}
                    <div>nickname : {el.nickname}</div>
                    <div>tableNum : {el.tableNum}</div>
                    <div>reservAt : {el.reservAt.toLocaleString("en-US", { timeZone: "UTC" })}</div>
                    <div>reservCount : {el.reservCount}</div>
                    <div>isCar : {el.isCar ? "yes" : "no"}</div>

                    <span
                        className="remove"
                        style={removeStyle}
                        onClick={this.onRemoveItem.bind(this, t)}
                    >
                        x
                    </span>
                </div>
            );
        });
    }

    generateLayout() {
        // const p = this.props;

        return _.map(this.reservations.length, (item, i, list) => {
            return {
                i: i.toString(),
                x: this.reservations[i].x,
                y: this.reservations[i].y,
                w: this.reservations[i].w,
                h: this.reservations[i].h,
                add: i === list.length - 1,
                nickname: this.reservations[i].nickname,
                tableNum: this.reservations[i].tableNum,
                reservCount: this.reservations[i].reservCount,
                isCar: this.reservations[i].isCar,
                reservAt: this.reservations[i].reservAt,
            };
        });
    }

    stringifyLayout() {
        return this.state.layout.map(function (l) {
            const name = l.i === "__dropping-elem__" ? "drop" : l.i;
            return (
                <div className="layoutItem" key={l.i}>
                    <b>{name}</b>
                    {`: [${l.x}, ${l.y}, ${l.w}, ${l.h}]`}
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.onAddItem}>Add Item</button>
                <ReactGridLayout
                    layout={this.state.layout}
                    onDragStop={this.onLayoutChange}
                    onResize={this.onLayoutChange}
                    onBreakpointChange={this.onBreakpointChange}
                    {...this.props}
                >
                    {this.generateDOM()}
                </ReactGridLayout>
                <div>
                    <div className="layoutJSON">
                        Displayed as <code>[x, y, w, h]</code>
                        <br />
                        <br />
                        <div className="columns">{this.stringifyLayout()}</div>
                    </div>
                </div>
            </div>
        );
    }
}
