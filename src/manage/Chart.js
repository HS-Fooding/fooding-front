import { LineChart, Line } from "recharts";
const data = [
    { name: "Page A", hello: 400, pv: 2400, amt: 2500 },
    { name: "Page A", hello: 300, pv: 2500, amt: 2600 },
    { name: "Page A", hello: 200, pv: 2600, amt: 2700 },
    { name: "Page A", hello: 100, pv: 3000, amt: 2800 },
];

function Chart() {
    return (
        <LineChart width={400} height={400} data={data}>
            <Line type="monotone" dataKey="hello" stroke="#8884d8" />
        </LineChart>
    );
}
export default Chart;
