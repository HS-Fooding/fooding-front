import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

const dummy = {
    tableInfo: {
        open: "09:00",
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

    return new Date(
        Date.UTC(
            parseInt(_date[0]),
            parseInt(_date[1]),
            parseInt(_date[2]),
            parseInt(_time[0]),
            parseInt(_time[1])
        )
    );
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
            return {
                nickname: m.nickname,
                tableNum: m.tableNum,
                reservCount: m.reservCount,
                isCar: m.isCar,
                reservAt: parseDate(dummy.tableInfo.date, m.reservAt),
                x: dummy.tableInfo.tableNums.findIndex((t) => t === m.tableNum), // 테이블 번호
                // prettier-ignore
                y: (parseDate(dummy.tableInfo.date, m.reservAt) - parseDate(dummy.tableInfo.date, dummy.tableInfo.open)) / 30, // 예약 시간
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
    state = { layout: [], data: [...reservations] };

    static defaultProps = {
        className: "layout",
        // items: 50,
        // cols: 12,
        items: reservations.length,
        cols: dummy.tableInfo.tableNums.length,
        rowHeight: 30,
        onLayoutChange: function () {},
        // This turns off compaction so you can place items wherever.
        // verticalCompact: false,
        compactType: null,
        // This turns off rearrangement so items will not be pushed arround.
        preventCollision: false,
    };

    constructor(props) {
        super(props);

        const layout = this.generateLayout();
        this.state = { layout };
    }

    onLayoutChange = (layout) => {
        // console.log("layout!!", layout);
        const tmp = { ...this.state.layout };
        // console.log("???", tmp);

        for (var i = 0; i < Object.keys(tmp).length; i++) {
            // console.log(tmp[i]);
            tmp[i].x = parseInt(layout[i].x);
            tmp[i].y = parseInt(layout[i].y);
            tmp[i].w = parseInt(layout[i].w);
            tmp[i].h = parseInt(layout[i].h);
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
            // const y = Math.ceil(Math.random() * 4) + 1;
            const y = (reservations[i].y / 1000000) * 4;
            return {
                x: reservations[i].x,
                y: Math.floor(i) * y,
                // y: reservations[i].y,
                w: reservations[i].w,
                // h: y,
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

// import("./test-hook.jsx").then((fn) => fn.default(ManageReserv));
// console.log("asdf");
