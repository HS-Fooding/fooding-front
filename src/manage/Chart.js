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
  Pie,
  PieChart,
} from "recharts";

const Chart = () => {
  const [ageBarChart, setAgeBarChart] = useState([]);
  const [sexBarChart, setSexBarChart] = useState([]);
  const [jobPieChart, setJobPieChart] = useState([]);
  const [favorRadarChart, setFavorRadarChart] = useState([]);
  const [reserveLineChart, setReserveLineChart] = useState([]);
  const [arrForMax, setArrForMax] = useState([]);

  useEffect(async () => {
    const getToken = localStorage.getItem("managerToken");

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
        const data = response.data.data;
        const workingTime = response.data.workingTime;

        let ageArr = [0, 0, 0, 0, 0, 0];
        let menCount = 0;
        let womenCount = 0;
        let job = new Map([]);
        let jobResult = [];
        let favor = new Map([]);
        let favorResult = [];
        let time = new Map([]);
        let timeResult = [];
        const openHour = parseInt(workingTime.open.split(":")[0]);
        const openMin = parseInt(workingTime.open.split(":")[1]);
        const closeHour = parseInt(workingTime.close.split(":")[0]);
        const closeMin = parseInt(workingTime.close.split(":")[1]);
        let h = openHour;
        let m = openMin;
        while (true) {
          if (h === closeHour && m === closeMin) break;
          h < 10 ? time.set(`0${h}:00`, 0) : time.set(`${h}:00`, 0);
          h < 10 ? time.set(`0${h}:30`, 0) : time.set(`${h}:30`, 0);
          h++;
        }
        setArrForMax(time);

        await data.forEach((el) => {
          // console.log("!!", el);
          // age part
          if (parseInt(el.age) < 20) ageArr[0] += 1;
          else if (parseInt(el.age) < 30) ageArr[1] += 1;
          else if (parseInt(el.age) < 40) ageArr[2] += 1;
          else if (parseInt(el.age) < 50) ageArr[3] += 1;
          else if (parseInt(el.age) < 60) ageArr[4] += 1;
          else ageArr[5] += 1;

          // sex part
          if (el.sex) menCount += 1;
          else womenCount += 1;

          // job part
          if (job.has(el.job)) {
            const tmp = job.get(el.job);
            job.set(el.job, tmp + 1);
          } else {
            if (el.job != null) job.set(el.job, 1);
          }

          // favor part
          el.favor.forEach((m) => {
            if (favor.has(m)) {
              const tmp = favor.get(m);
              favor.set(m, tmp + 1);
            } else {
              if (m != null) favor.set(m, 1);
            }
          });

          // reservation time part
          const tmp = time.get(el.reserveTime);
          time.set(el.reserveTime, tmp + 1);
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

        for (var obj of job) {
          jobResult.push({ name: obj[0], value: parseInt(obj[1]) });
        }
        setJobPieChart(jobResult);

        for (var obj of favor) {
          favorResult.push({
            subject: obj[0],
            value: parseInt(obj[1]),
            fullMark: 30,
          });
        }
        setFavorRadarChart(favorResult);

        for (var obj of time) {
          timeResult.push({ name: obj[0], value: parseInt(obj[1]) });
        }
        setReserveLineChart(timeResult);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <BarChart width={400} height={250} data={ageBarChart}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="나이" fill="#82ca9d" />
      </BarChart>
      <BarChart width={400} height={250} data={sexBarChart}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="성별" fill="#82ca9d" />
      </BarChart>
      <PieChart width={400} height={250}>
        <Pie
          data={jobPieChart}
          dataKey="value"
          cx="50%"
          cy="50%"
          fill="#8884d8"
        />
        <Tooltip />
      </PieChart>
      <RadarChart
        outerRadius={90}
        width={400}
        height={250}
        data={favorRadarChart}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 10]} />
        <Radar
          name="Favor"
          dataKey="value"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Tooltip />
        <Legend />
      </RadarChart>
      <LineChart
        width={1000}
        height={500}
        data={reserveLineChart}
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
        {/* <ReferenceLine x="Page C" stroke="red" label="Max PV PAGE" /> */}
        <ReferenceLine
          y={Math.max(...arrForMax.values())}
          label="Max"
          stroke="red"
        />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </>
  );
};

export default Chart;
