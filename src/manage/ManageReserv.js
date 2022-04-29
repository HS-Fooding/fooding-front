import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

const dummy = {
    tableInfo: {
        open: "09:00",
        close: "11:00",
        date: "2022-04-20",
        maxUsageTime: 90,
        tableNums: ["1", "2", "3", "4", "5", "6", "7"],
    },
    reservations: [
        {
            reservAt: "10:00",
            tableNum: "1",
            nickname: "leo",
            reservCount: 4,
            isCar: true,
        },
        {
            reservAt: "11:30",
            tableNum: "2",
            nickname: "leo",
            reservCount: 2,
            isCar: true,
        },
        {
            reservAt: "15:00",
            tableNum: "3",
            nickname: "leo",
            reservCount: 3,
            isCar: true,
        },
        {
            reservAt: "17:00",
            tableNum: "3",
            nickname: "leo",
            reservCount: 3,
            isCar: true,
        },
    ],
};

const dateTransform = (date, time) => {
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

const getWorkingHour = (tableLength, open, close) => {
    return tableLength * ((close - open) / (18 * 100000));
};

const transformData = (dummy) => {
    return {
        date: dummy.tableInfo.date,
        open: dateTransform(dummy.tableInfo.date, dummy.tableInfo.open),
        close: dateTransform(dummy.tableInfo.date, dummy.tableInfo.close),
        maxUsageTime: dummy.tableInfo.maxUsageTime,
        reservations: dummy.reservations.map((m) => {
            return {
                nickname: m.nickname,
                tableNum: m.tableNum,
                reservCount: m.reservCount,
                isCar: m.isCar,
                reservAt: dateTransform(dummy.tableInfo.date, m.reservAt),
                x: dummy.tableInfo.tableNums.findIndex((t) => t === m.tableNum), // 테이블 번호
                // prettier-ignore
                y: (dateTransform(dummy.tableInfo.date, m.reservAt) - dateTransform(dummy.tableInfo.date, dummy.tableInfo.open)) / 30, // 예약 시간
                w: 1,
                h: dummy.tableInfo.maxUsageTime / 30,
            };
        }),
    };
};

const transformed = transformData(dummy);
const reservations = transformed.reservations;

export default class ManageReserv extends React.PureComponent {
    static defaultProps = {
        className: "layout",
        // items: 50,
        items: reservations.length,
        cols: dummy.tableInfo.tableNums.length,
        rowHeight: 10,
        onLayoutChange: function () {},
        // This turns off compaction so you can place items wherever.
        // verticalCompact: false,
        compactType: "vertical",
        // This turns off rearrangement so items will not be pushed arround.
        preventCollision: false,
    };

    constructor(props) {
        super(props);

        const layout = this.generateLayout();
        this.state = { layout };
    }

    generateDOM() {
        return _.map(_.range(this.props.items), (i) => {
            return (
                <div key={i}>
                    <span className="text">{i + 1}</span>
                </div>
            );
        });
    }

    generateLayout() {
        return _.map(reservations, (item, i) => {
            console.log(item);
            // const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
            return {
                x: parseInt(item.x),
                y: parseInt(item.y),
                w: parseInt(item.w),
                h: parseInt(item.h),
                i: i.toString(),
            };
        });
    }

    onLayoutChange(layout) {
        this.props.onLayoutChange(layout);
    }

    render() {
        return (
            <div>
                <ReactGridLayout
                    layout={this.state.layout}
                    onLayoutChange={this.onLayoutChange}
                    {...this.props}
                >
                    {this.generateDOM()}
                </ReactGridLayout>
            </div>
        );
    }
}
