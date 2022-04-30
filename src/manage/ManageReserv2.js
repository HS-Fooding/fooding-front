import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import makeLayout from "./test-hook.jsx";
import("./test-hook.jsx").then((fn) => fn.default(NoCollisionLayout));

const ReactGridLayout = WidthProvider(RGL);

export default class NoCollisionLayout extends React.PureComponent {
    static defaultProps = {
        className: "layout",
        items: 50,
        cols: 12,
        rowHeight: 30,
        onLayoutChange: function () {},
        // This turns off compaction so you can place items wherever.
        verticalCompact: false,
        // This turns off rearrangement so items will not be pushed arround.
        preventCollision: true,
    };

    constructor(props) {
        super(props);

        const layout = this.generateLayout();
        this.state = { layout };
    }

    generateDOM() {
        return _.map(this.state.layout, function (l, i) {
            console.log(l);
            return (
                <div key={i} className={l.static ? "static" : ""}>
                    {l.static ? (
                        <span
                            className="text"
                            title="This item is static and cannot be removed or resized."
                        >
                            Static - {i}
                        </span>
                    ) : (
                        <span className="text">{i}</span>
                    )}
                </div>
            );
        });
        return _.map(_.range(this.props.items), function (i) {
            return (
                <div key={i}>
                    <span className="text">{i}</span>
                </div>
            );
        });
    }

    generateLayout() {
        const p = this.props;
        return _.map(new Array(p.items), function (item, i) {
            const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
            return {
                x: (i * 2) % 12,
                y: Math.floor(i / 6) * y,
                w: 2,
                h: y,
                i: i.toString(),
            };
        });
    }

    onLayoutChange(layout) {
        console.log("!!!", layout);
        this.props.onLayoutChange(layout);
    }

    render() {
        makeLayout(this.state.layout);

        return (
            <ReactGridLayout
                layout={this.state.layout}
                onLayoutChange={this.onLayoutChange}
                {...this.props}
            >
                {this.generateDOM()}
            </ReactGridLayout>
        );
    }
}
