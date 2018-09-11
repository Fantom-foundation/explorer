
import React from 'react';
import {Line} from 'react-chartjs-2';

const data = {
  labels: ['10.00AM', '12.00PM', '2:00PM', '4:00PM', '5:00PM', '6:00PM', '7:00PM', '8:00PM', '9:00PM'],
  datasets: [
   {
     fill: false,
    label: 'My First dataset',
       lineTension: 0.1,
      backgroundColor: 'rgba(255,0,0)',
       borderColor: 'rgba(255,20,147,1)',
       borderCapStyle: 'butt',
      borderDash: [],
     borderDashOffset: 0.0,
     borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(0,0,255,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(255,0,0,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 0,
        data: [65, 59, 80, 81, 56, 55, 40, 70, 20, 25, 31],
     },
    {
      fill: false,
      lineTension: 0.1,
      label: 'My Second dataset',
      backgroundColor: 'rgba(0,0,255)',
      borderColor: 'rgba(0,0,255,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(0,0,255,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(255,0,0,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 20,
      data: [65, 70, 2, 4, 5, 85, 40, 70, 20, 5, 76],
    },
  ],
};
const options = {
  // maintainAspectRatio: false,
  scales: {
    yAxes: [{
      ticks: {
        fontSize: 18,
        fontFamily: 'Gotham-Medium',
      //fontColor: 'rgb()',
        maxRotation: 0.00001,
        padding: 20,
        labelOffset: 20,
        callback(value, index) {
          console.log(value,index, "value");
          if (value === 0) { return '0'; }
           if (value === 20) {
             return '25';
           }
           if (value === 40) {
            return '50';
          }
          if (value === 60) {
            return '75';
          }
          if (value === 80) {
            return '100';
          }
        },
      },
      beginAtZero: true,
      gridLines: {
        drawTicks: true,
        color: 'grey',
      },
    }],
 
    xAxes: [{
      ticks: {
        fontSize: 18,
        fontFamily: 'Gotham-Medium',
        //fontColor: colorMap['primaryBlue'],
        maxRotation: 0.00001,
        padding: 20,
        labelOffset: 20,
      //   callback(value, index) {
      //      if (index % 2 == 0) return '';
      //      return value;
      //   },
       },
      beginAtZero: false,
      gridLines: {
        tickMarkLength: 15,
        offsetGridLines: true,
        display: true,
        drawTicks: true,
        drawOnChartArea: false,
        color: 'grey',
      },
      angleLines: {
        color: 'transparent'
      }
 
    }]
  },
 };

export default class Account extends React.Component {
  displayName: 'LineExample';
  render() {
    return (
      <div>
        <Line options={options}
        data={data}
        height={50}/>
      </div>
    );
  }
}