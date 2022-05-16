import React, { useEffect, useState } from "react";
import { url } from "../Api";
import axios from "axios";

import {
    LineChart,
    Line,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    ReferenceLine,
} from "recharts";

const radarChart_data = [
    {
        subject: "Math",
        A: 120,
        B: 110,
        fullMark: 150,
    },
    {
        subject: "Chinese",
        A: 98,
        B: 130,
        fullMark: 150,
    },
    {
        subject: "English",
        A: 86,
        B: 130,
        fullMark: 150,
    },
    {
        subject: "Geography",
        A: 99,
        B: 100,
        fullMark: 150,
    },
    {
        subject: "Physics",
        A: 85,
        B: 90,
        fullMark: 150,
    },
    {
        subject: "History",
        A: 65,
        B: 85,
        fullMark: 150,
    },
];
const lineChart_data = [
    {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const Chart = () => {
    const [ageBarChart, setAgeBarChart] = React.useState([]);
    const [sexBarChart, setSexBarChart] = React.useState([]);

    useEffect(async () => {
        const getToken = localStorage.getItem("token");

        const config = {
            method: "get",
            // url: url + `/fooding/admin/restaurant/${restId}/reservation`,
            url: url + `/fooding/admin/restaurant/1/chart`,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getToken,
            },
            params: {
                start: "2022-05-05",
                end: "2022-05-07",
            },
        };

        await axios(config)
            .then(async (response) => {
                let ageArr = [0, 0, 0, 0, 0, 0];
                let menCount = 0;
                let womenCount = 0;

                await response.data.forEach((el) => {
                    // age count
                    if (parseInt(el.age) < 20) ageArr[0] += 1;
                    else if (parseInt(el.age) < 30) ageArr[1] += 1;
                    else if (parseInt(el.age) < 40) ageArr[2] += 1;
                    else if (parseInt(el.age) < 50) ageArr[3] += 1;
                    else if (parseInt(el.age) < 60) ageArr[4] += 1;
                    else ageArr[5] += 1;

                    if (el.sex) menCount += 1;
                    else womenCount += 1;
                });

                setAgeBarChart([
                    {
                        name: "10대",
                        나이: ageArr[0],
                    },
                    {
                        name: "20대",
                        나이: ageArr[1],
                    },
                    {
                        name: "30대",
                        나이: ageArr[2],
                    },
                    {
                        name: "40대",
                        나이: ageArr[3],
                    },
                    {
                        name: "50대",
                        나이: ageArr[4],
                    },
                    {
                        name: "60대",
                        나이: ageArr[5],
                    },
                ]);
                setSexBarChart([
                    {
                        name: "남자",
                        성별: menCount,
                    },
                    {
                        name: "여자",
                        성별: womenCount,
                    },
                ]);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            <BarChart width={730} height={250} data={ageBarChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="나이" fill="#82ca9d" />
            </BarChart>
            <BarChart width={730} height={250} data={sexBarChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="성별" fill="#82ca9d" />
            </BarChart>

            <RadarChart outerRadius={90} width={730} height={250} data={radarChart_data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Legend />
            </RadarChart>
            <RadarChart outerRadius={90} width={730} height={250} data={radarChart_data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Legend />
            </RadarChart>

            <LineChart
                width={500}
                height={300}
                data={lineChart_data}
                margin={{
                    top: 20,
                    right: 50,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine x="Page C" stroke="red" label="Max PV PAGE" />
                <ReferenceLine y={9800} label="Max" stroke="red" />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
        </>
    );
};

export default Chart;
