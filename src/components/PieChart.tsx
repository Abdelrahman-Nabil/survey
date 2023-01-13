import React from "react";
import ReactApexChart from 'react-apexcharts'

const PieChart = (props: any) => {

  return (
    <div id="chart">
      <ReactApexChart options={props.params.options} series={props.params.series} type="pie" width={380} />
    </div>

  );
}
export default PieChart;