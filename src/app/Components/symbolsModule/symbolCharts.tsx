import React from "react";
import { Line } from "react-chartjs-2";

const SymbolCharts = ({ data, title }: { data: any; title: string }) => {
  const chartData = {
    labels: data.map((item: any) => item.date),
    datasets: [
      {
        label: `${title} Price`,
        data: data.map((item: any) => item.price),
        borderColor: "#D1C286",
        backgroundColor: "rgba(209, 195, 134, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default SymbolCharts;
