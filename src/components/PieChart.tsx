import React from "react";
import { Pie } from "react-chartjs-2";
import ReactApexChart from 'react-apexcharts'

const PieChart = (props: any) => {
  console.log('props', props)
 
  return (
    <div id="chart">
      <ReactApexChart options={props.params.options} series={props.params.series} type="pie" width={380} />
    </div>

  );
}
export default PieChart;