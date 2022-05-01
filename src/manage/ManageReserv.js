import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

const BLOCK_OF_TIME = 30;

const dummy = {
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

const ReactGridLayout = WidthProvider(RGL);
const transformed = transformData(dummy);
const reservations = transformed.reservations;

export default class ManageReserv extends React.Component {
    state = { layout: [], restInfo: {} };

    static defaultProps = {
        className: "layout",
        items: reservations.length,
        cols: dummy.tableInfo.tableNums.length,
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
        this.state = { layout: layout, restInfo: { ...transformed } };
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

    generateDOM() {
        // console.log(this.state.layout);
        return _.map(this.state.layout, function (l, i) {
            // console.log(l);
            return (
                <div key={i}>
                    {/* <div className="text">{i + 1}</div> */}
                    <div>nickname : {l.nickname}</div>
                    <div>tableNum : {l.tableNum}</div>
                    <div>reservAt : {l.reservAt.toLocaleString("en-US", { timeZone: "UTC" })}</div>
                    <div>reservCount : {l.reservCount}</div>
                    <div>isCar : {l.isCar ? "yes" : "no"}</div>
                </div>
            );
        });
    }

    generateLayout() {
        const p = this.props;
        return _.map(new Array(p.items), function (item, i) {
            return {
                x: reservations[i].x,
                y: reservations[i].y,
                w: reservations[i].w,
                h: reservations[i].h,
                nickname: reservations[i].nickname,
                tableNum: reservations[i].tableNum,
                reservCount: reservations[i].reservCount,
                isCar: reservations[i].isCar,
                reservAt: reservations[i].reservAt,
                i: i.toString(),
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
                <ReactGridLayout
                    layout={this.state.layout}
                    onDragStop={this.onLayoutChange}
                    onResize={this.onLayoutChange}
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
