
import React from 'react';
import {Line} from 'react-chartjs-2';

const data = {
  labels: ['10.00AM', '12.00PM', '2:00PM', '4:00PM', '5:00PM', '6:00PM', '7:00PM', '8:00PM', '9:00PM'],
  datasets: [
    {
      fill: false,
      lineTension: 0.9,
     // backgroundColor: 'rgba(255,0,0)',
      borderColor: 'rgba(189, 16, 224,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(189, 16, 224,1)',
      // pointBackgroundColor: '#bd10e0',
      // pointBorderWidth: 1,
      // pointHoverRadius: 7,
     // pointHoverBackgroundColor: 'rgba(189, 16, 224,1)',
     // pointHoverBorderColor: 'rgba(189, 16, 224,1)',
     // pointHoverBorderWidth: 2,
     // pointRadius: 1,
      //pointHitRadius: 1,
      data: [65, 59, 80, 81, 56, 55, 40, 70, 20, 25, 31],
    },
    {
      fill: false,
      lineTension: 0.1,
      //backgroundColor: 'rgba(0,0,255)',
      borderColor: 'rgba(3, 155, 229,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(0,0,255,1)',
      // pointBackgroundColor: '#fff',
      // pointBorderWidth: 1,
      // pointHoverRadius: 5,
      // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      // pointHoverBorderColor: 'rgba(255,0,0,1)',
      // pointHoverBorderWidth: 2,
      // pointRadius: 1,
      // pointHitRadius: 20,
      data: [65, 70, 2, 4, 5, 85, 40, 70, 20, 5, 76],
    },
  ],
};
const options = {
  // maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    yAxes: [{
      crosshair: {
        width: 0.5,
        zIndex: 50,
        color: 'rgba(3, 155, 229,1)',
        snap: false,
        label: {
          enabled: true,

          color: 'red',
          format: '{value:.2f}',
        },
      },
      ticks: {
        fontSize: 18,
        fontFamily: 'Gotham-Medium',
      //fontColor: 'rgb()',
        maxRotation: 0.00001,
        padding: 10,
        //labelOffset: 20,
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
      crosshair: {
        width: 0.5,
        zIndex: 50,
        color: 'red',
      },
      ticks: {
       // fontSize: 18,
        //fontFamily: 'Gotham-Medium',
        //fontColor: colorMap['primaryBlue'],
        maxRotation: 0.00001,
        padding: 10,
        labelOffset: 60,
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
        color: 'transparent',
      },
 
    }]
  },
  tooltips: {
    mode: 'index',
    backgroundColor: 'rgba(195, 195, 195)',
    borderColor: 'rgb(0, 0, 0)',
    borderWidth: 0.3,
    cornerRadius: 0,
    caretSize: 0,
    xPadding: 70,
    yPadding: 25,
    titleFontColor: 'rgba(0, 0, 0, 0.87)',
    titleFontSize: 10,
    titleFontFamily: 'Roboto',
    bodyFontFamily: 'Roboto',
    enabled: true,
    callbacks: {
                        label: function (tooltipItem, data) {
                            var amount = tooltipItem.yLabel + ' ' + 'USD';
                            return amount
                        }
},
  },
//   tooltips: {
//     enabled: true,
//     mode: 'single',
//     callbacks: {
//         label: function(tooltipItems, data) { 
//             return tooltipItems.yLabel + ' €';
//         }
//   },
// },
};

export default class Chart extends React.Component {
  displayName: 'LineExample';
  render() {
    return (
      <div>
        <Line options={options}
        data={data}
        height={100}/>
      </div>
    );
  }
}
