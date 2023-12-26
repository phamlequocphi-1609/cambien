import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data, options }) => {
  const [chart, setChart] = useState({});
  var baseUrl = "http://192.168.0.69:7122/api/Air";
  var proxyUrl = "https://cors-anywhere.herokuapp.com/";
  var apiKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

  useEffect(() => {
    const fetchCoins = async () => {
      await fetch(`${proxyUrl}${baseUrl}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${apiKey}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              console.log(json.data);
              setChart(json.data);
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchCoins();
  }, [baseUrl, proxyUrl, apiKey]);

  console.log("chart", chart);
  var data = {
    labels: chart?.coins?.map((x) => x.name),
    datasets: [
      {
        // label: `${chart?.coins?.length} Temperature`,
        label: `Temperature`,
        data: chart?.coins?.map((x) => x.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
      {
        // label: `${chart?.coins?.length} Humidity`,
        label: ` Humidity`,
        data: chart?.coins?.map((x) => x.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
      {
        // label: `${chart?.coins?.length} CO`,
        label: `CO`,
        data: chart?.coins?.map((x) => x.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  var options = {
    maintainAspectRatio: false,
    scales: {},
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  };
  return (
    <div>
      <Line data={data} height={400} options={options} />
    </div>
  );
};

export default LineChart;

// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import faker from 'faker';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const currentTime = new Date();

// // Tạo một mảng để lưu trữ thời gian
// const timeArray: Date[] = [];

// // Thêm thời gian vào mảng với khoảng cách 5 phút
// for (let i = 0; i < 3; i++) {
//   // Tính toán thời điểm 5 phút sau
//   const timeLater = new Date(currentTime.getTime() + i * 5 * 60 * 1000);

//   // Thêm thời gian vào mảng
//   timeArray.push(timeLater);
// }

// const temperature = ['24', '25'];

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
// const data = {
//   labels: labels, // Sử dụng thời gian làm nhãn
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: temperature.map((tem) => tem),
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: Array.from({ length: 3 }, () => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

// export function App() {
//   return <Line options={options} data={data} />;
// }
