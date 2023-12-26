import "./App.css";
import React, { useEffect, useState } from "react";
import LineChart from "./charts/LineChart";
import Api from "./Api";
import moment from "moment";
function App() {
  const [getItem, setItem] = useState("");
  // useEffect(() => {
  //   Api.get("/Air")
  //     .then((response) => {
  //       setItem(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => console.log(error));

  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      Api.get("/Air")
        .then((response) => {
          setItem(response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  function fetchData() {
    if (Object.keys(getItem).length > 0) {
      return getItem.data.map((value, key) => {
        return (
          <>
            <div className="col-span-3 py-[20px] pl-[30px] pr-[38px]">
              <div className="temperature__info bg-white py-[16px] px-[16px] rounded-lg">
                <p className="uppercase font-semibold  text-[20px]">
                  Temperature:
                </p>
                <span className="uppercase font-semibold text-[20px] text-[#41b174]">
                  {value.temperature}
                  <sup>o</sup>C
                </span>
              </div>
            </div>
            <div className="col-span-3  py-[20px] pl-[30px] pr-[38px]">
              <div className="humidity__info bg-white py-[16px] px-[16px] rounded-lg">
                <p className="uppercase font-semibold  text-[20px]">
                  Humidity:
                </p>
                <span className="uppercase font-semibold  text-[20px] text-[#41b174]">
                  {value.humidity}%
                </span>
              </div>
            </div>
            <div className="col-span-3 py-[20px] pl-[30px] ">
              <div className="CO__info bg-white py-[16px] px-[16px] rounded-lg">
                <p className="uppercase font-semibold  text-[20px]">CO:</p>
                <span className="uppercase font-semibold  text-[20px] text-[#41b174]">
                  {value.co} ppm
                </span>
              </div>
            </div>
          </>
        );
      });
    }
  }
  function fetchApi() {
    if (Object.keys(getItem).length > 0) {
      return getItem.data.map((value, key) => {
        return (
          <div key={key} className=" bg-white py-[16px] px-[16px] rounded-lg">
            <p className="uppercase font-semibold  text-[20px]">AQI:</p>
            <span className="uppercase font-semibold  text-[20px] text-[#41b174]">
              {value.aqi}
            </span>
          </div>
        );
      });
    }
  }
  function fetchDateTime() {
    if (Object.keys(getItem).length > 0) {
      return getItem.data.map((value, key) => {
        return (
          <p className="flex flex-col font-bold">
            <span>{moment(value.dataTime).format("MMM D, YYYY")}</span>
            <span>{moment(value.dataTime).format("h:mm A")}</span>
          </p>
        );
      });
    }
  }
  return (
    <div className="App bg-[#f2f6f7]">
      <header className="h-[80px] bg-[#17b8be]">
        <h3 className="uppercase text-3xl font-medium text-center text-[#fff] pt-[20px]">
          Air quality monitoring
        </h3>
      </header>
      <section className="max-w-[1280px] mx-auto">
        <div className="information">
          <div className="grid grid-cols-12">
            <div className="col-span-3 py-[20px] pr-[38px]">
              <div className="parameter bg-white pt-[20px] pb-[40px] px-[16px] rounded-lg">
                <h3 className="uppercase font-semibold  text-[20px]">
                  measured parameters
                </h3>
              </div>
            </div>
            {fetchData()}
            {/* <div className="col-span-3 py-[20px] pl-[30px] pr-[38px]">
              <div className="temperature__info bg-white py-[16px] px-[16px] rounded-lg">
                <p className="uppercase font-semibold  text-[20px]">
                  Temperature:
                </p>
                <span className="uppercase font-semibold text-[20px] text-[#41b174]">
                  24,6
                  <sup>o</sup>C
                </span>
              </div>
            </div>
            <div className="col-span-3  py-[20px] pl-[30px] pr-[38px]">
              <div className="humidity__info bg-white py-[16px] px-[16px] rounded-lg">
                <p className="uppercase font-semibold  text-[20px]">
                  Humidity:
                </p>
                <span className="uppercase font-semibold  text-[20px] text-[#41b174]">
                  20%
                </span>
              </div>
            </div>
            <div className="col-span-3 py-[20px] pl-[30px] ">
              <div className="CO__info bg-white py-[16px] px-[16px] rounded-lg">
                <p className="uppercase font-semibold  text-[20px]">CO:</p>
                <span className="uppercase font-semibold  text-[20px] text-[#41b174]">
                  200 ppm
                </span>
              </div>
            </div> */}
          </div>
        </div>
        <div className="chart">
          <div className="chart__heading flex justify-between items-center">
            <h2 className="uppercase text-[20px] font-bold">
              Air Quality History
            </h2>
            <h2 className="uppercase text-[20px] font-bold">Charts</h2>
            {/* <p className="flex flex-col font-bold">
              <span>Date: 25-12-2020</span>
              <span>Time: 16:02:23</span>
            </p> */}
            {fetchDateTime()}
          </div>
          <div>
            <LineChart />
          </div>
        </div>
        <div className="aqi pb-[30px]">
          <h3 className="uppercase text-3xl font-medium  pt-[20px]">AQI</h3>
          <div className="table__cover">
            <div className="flex justify-between">
              <div className="table">
                <h2 className="uppercase text-[18px] font-medium  pt-[10px] text-center">
                  Table of AQI value range and air quality assessment
                </h2>
                <table className="border-[2px] text-center w-[1000px] mt-4 table__AQI border-b border-solid border-black">
                  <thead>
                    <tr>
                      <td className="border-b border-r  border-solid border-black text-[20px] font-bold">
                        AQI value range
                      </td>
                      <td className="border-b border-r  border-solid border-black text-[20px] font-bold">
                        Air quality
                      </td>
                      <td className="border-b border-r  border-solid border-black text-[20px] font-bold">
                        Color
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <p className="text-[18px] font-[400]">0-50</p>
                      </td>
                      <td>
                        <p className="text-[18px] font-[400]">Good</p>
                      </td>
                      <td className="relative">
                        <p className="w-[30px] h-[30px] absolute left-1/2 transform -translate-x-1/2 top-[12px] rounded-[50%] bg-[#a2dd5d]"></p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="text-[18px] font-[400]">51-100</p>
                      </td>
                      <td>
                        <p className="text-[18px] font-[400]">Medium</p>
                      </td>
                      <td className="relative">
                        <p className="w-[30px] h-[30px] absolute left-1/2 transform -translate-x-1/2 top-[12px] rounded-[50%] bg-[#fdd752]"></p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="text-[18px] font-[400]">101-150</p>
                      </td>
                      <td>
                        <p className="text-[18px] font-[400]">Least</p>
                      </td>
                      <td className="relative">
                        <p className="w-[30px] h-[30px] absolute left-1/2 transform -translate-x-1/2 top-[12px] rounded-[50%] bg-[#f99a58]"></p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="text-[18px] font-[400]">151-200</p>
                      </td>
                      <td>
                        <p className="text-[18px] font-[400]">Bad</p>
                      </td>
                      <td className="relative">
                        <p className="w-[30px] h-[30px] absolute left-1/2 transform -translate-x-1/2 top-[12px] rounded-[50%] bg-[#fb686e]"></p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="text-[18px] font-[400]">201-300</p>
                      </td>
                      <td>
                        <p className="text-[18px] font-[400]">Very bad</p>
                      </td>
                      <td className="relative">
                        <p className="w-[30px] h-[30px] absolute left-1/2 transform -translate-x-1/2 top-[12px] rounded-[50%] bg-[#a97cbd]"></p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="text-[18px] font-[400]">301-500</p>
                      </td>
                      <td>
                        <p className="text-[18px] font-[400]">Dengoures</p>
                      </td>
                      <td className="relative">
                        <div className="w-[30px] h-[30px] absolute left-1/2 transform -translate-x-1/2 top-[12px] rounded-[50%] bg-[#955b73] "></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h2 className="uppercase text-[18px] font-medium  pt-[10px] text-center mb-5">
                  AQI parameters
                </h2>
                {/* <div className=" bg-white py-[16px] px-[16px] rounded-lg">
                  <p className="uppercase font-semibold  text-[20px]">AQI:</p>
                  <span className="uppercase font-semibold  text-[20px] text-[#41b174]">
                    200
                  </span>
                </div> */}
                {fetchApi()}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default App;
