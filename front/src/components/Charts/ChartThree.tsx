import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import agent from '../../data/agent';
import { useAppSelector } from '../../configureStore';
import { CheckInDTO } from '../../models/checkIn';
import { ApexOptions } from 'apexcharts';

interface ChartThreeState {
  series: number[];
  labels: string[];
}

const ChartThree: React.FC = () => {
  const [state, setState] = useState<ChartThreeState>({
    series: [],
    labels: [],
  });

  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchCheckIns = async () => {
      try {
        const response = await agent.CheckIns.getCheckInsByUserId(user?.id!);

        const countryCounts: { [key: string]: number } = {};
        response.forEach((checkIn: CheckInDTO) => {
          const country = checkIn.country;
          countryCounts[country] = (countryCounts[country] || 0) + 1;
        });

        const labels = Object.keys(countryCounts);
        const series = Object.values(countryCounts);

        setState({ series, labels });
      } catch (error) {
        console.error('Error fetching check-ins:', error);
      }
    };

    fetchCheckIns();
  }, [user?.id]);

  const generateColors = (numColors: number) => {
    const baseColors = ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF'];
    const additionalColors = ['#33FF57', '#FF33F6', '#33F6FF', '#FF5733'];
    return numColors <= baseColors.length
      ? baseColors.slice(0, numColors)
      : baseColors.concat(additionalColors).slice(0, numColors);
  };

  const options: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'donut',
    },
    colors: generateColors(state.labels.length),
    labels: state.labels,
    legend: {
      show: true,
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Beer Origin by Country
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
