import React, { useEffect, useState } from "react";
import { url } from "../../Api";
import axios from "axios";
import Header from "../component/Header";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "../../css/Calandar.css";

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
  Cell,
} from "recharts";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 40px;
  align-items: center;
`;

const MyDatePicker = styled(DatePicker)`
  height: auto;
  width: 216px;
  input {
    border: 1px solid gray;
  }
  color: ${(props) => props.theme.mainColor};
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  /* background-color: gray; */
  border-radius: 5px;
  font-size: 17px;
  font-weight: bold;
  /* background-color: transparent; */
  /* color: white; */
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const Boxes = styled.div`
  display: flex;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 80px;
`;

const Title = styled.span`
  display: inline-block;
  text-align: center;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
  font-family: Verdana, Geneva, Tahoma, sans-serif;

  &:last-child {
    text-align: left;
    color: red;
  }
`;
const Msg = styled.div`
  margin-top: 3rem;
`;

const Chart = () => {
  const [ageBarChart, setAgeBarChart] = useState([]);
  const [sexBarChart, setSexBarChart] = useState([]);
  const [jobPieChart, setJobPieChart] = useState([]);
  const [favorRadarChart, setFavorRadarChart] = useState([]);
  const [reserveLineChart, setReserveLineChart] = useState([]);
  const [arrForMax, setArrForMax] = useState([]);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const getToken = localStorage.getItem("managerToken");
  const marketId = localStorage.getItem("marketId");

  useEffect(async () => {
    let startYear = startDate.getFullYear();
    let startMonth = startDate.getMonth() + 1;
    let startDay = startDate.getDay() + 1;

    let endYear = endDate.getFullYear();
    let endMonth = endDate.getMonth() + 1;
    let endDay = endDate.getDay() + 1;

    if (endDay.toString().length == 1) {
      endDay = "0" + endDay;
    }

    if (startDay.toString().length == 1) {
      startDay = "0" + startDay;
    }

    if (startMonth.toString().length == 1) {
      startMonth = "0" + startMonth;
    }

    if (endMonth.toString().length == 1) {
      endMonth = "0" + endMonth;
    }

    const config = {
      method: "get",
      url: url + `/fooding/admin/restaurant/${marketId}/chart`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken,
      },
      params: {
        // start: "2022-05-05",
        // end: "2022-05-07",
        start: `${startYear}-${startMonth}-${startDay}`,
        end: `${endYear}-${endMonth}-${endDay}`,
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
  }, [startDate, endDate]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "orange"];

  return (
    <>
      <Header />
      <Container>
        <MyDatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            setDateRange(update);
            console.log(startDate, endDate);
          }}
          withPortal
        />
        {startDate ? (
          <>
            <Boxes>
              <Box>
                <Title>나이</Title>
                <BarChart width={400} height={250} data={ageBarChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="나이" fill="#82ca9d" />
                </BarChart>
              </Box>
              <Box>
                <Title>직업</Title>
                <PieChart width={400} height={250}>
                  <Pie
                    data={jobPieChart}
                    cx="50%"
                    cy="50%"
                    label
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {jobPieChart.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </Box>
            </Boxes>
            <Boxes>
              <Box>
                <Title>성별</Title>
                <BarChart width={400} height={250} data={sexBarChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="성별" fill="#82ca9d" />
                </BarChart>
              </Box>
              <Box>
                <Title>취향</Title>
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
                    name="취향"
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                  <Legend />
                </RadarChart>
              </Box>
            </Boxes>
            <Box>
              <Title class="reserveCount">시간별 예약 수</Title>
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
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  name="예약 수"
                />
              </LineChart>
            </Box>
          </>
        ) : (
          <Msg>날짜를 입력하세요!</Msg>
        )}
      </Container>
    </>
  );
};

export default Chart;
