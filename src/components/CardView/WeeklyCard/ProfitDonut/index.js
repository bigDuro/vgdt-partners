import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';



const DoughnutChart = (props) => {
  const { totals } = props;
  const { rate, loadedMiles, deadHead, additionPay, breakdownPay, detentionPay, layoverPay } = totals;
  const gas = parseFloat((parseFloat(loadedMiles) + parseFloat(deadHead))/5.3 * 2.97);
  const driverPay = rate * .23 + parseFloat(additionPay) + parseFloat(breakdownPay) + parseFloat(detentionPay) + parseFloat(layoverPay);
  const profits = parseFloat(parseFloat(rate) - parseFloat(gas) - parseFloat(driverPay));

  const data = {
    labels: profits > 0 ? ['Gas', 'Driver', 'Profits'] : ['Gas', 'Driver'],
    datasets: [
      {
        label: 'Weekly Stats',
        data: profits > 0 ? [gas.toFixed(2), driverPay.toFixed(2), profits.toFixed(2)] : [gas.toFixed(2), driverPay.toFixed(2)],
        backgroundColor: profits > 0 ? [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ] : [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: profits > 0 ? [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ] : [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
    <Doughnut data={data} />

    <Typography variant="body2" color="textSecondary" component="p">
      <b>Weekly Revenue:</b> ${rate}.00
    </Typography>
    </>
  )

};

export default DoughnutChart;
