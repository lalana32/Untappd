import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useAppSelector } from '../../configureStore';
import agent from '../../data/agent';
import { CheckInDTO } from '../../models/checkIn';

const options: ApexOptions = {
  legend: {
    show: false,
  },
  colors: ['#3C50E0'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#000',
      top: 5,
      blur: 8,
      left: 0,
      opacity: 0.3,
    },
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    type: 'category',
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
    },
    categories: [],
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 5,
    tickAmount: 6,
    labels: {
      formatter: (val) => val.toFixed(2),
    },
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: '#3C50E0',
    strokeWidth: 3,
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.6,
      opacityTo: 0.3,
      stops: [0, 100],
    },
  },
  stroke: {
    width: [2],
    curve: 'smooth',
  },
  tooltip: {
    shared: true,
    intersect: false,
    custom: function ({ series, seriesIndex, dataPointIndex }) {
      const beerName = options.xaxis!.categories[dataPointIndex];
      const rating = series[seriesIndex][dataPointIndex];
      return `<div class="arrow_box">
                <span>Beer: ${beerName}</span><br>
                <span>Rating: ${rating.toFixed(2)}</span>
              </div>`;
    },
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartOne: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id;
  const [checkIns, setCheckIns] = useState<CheckInDTO[]>([]);
  const [state, setState] = useState<ChartOneState>({
    series: [],
  });

  useEffect(() => {
    const fetchCheckIns = async () => {
      try {
        const response = await agent.CheckIns.getCheckInsByUserId(userId!);

        setCheckIns(response);
      } catch (error) {
        console.error('Error fetching check-ins:', error);
      }
    };

    fetchCheckIns();
  }, [userId]);

  useEffect(() => {
    if (checkIns.length > 0) {
      const ratings = checkIns.map((checkIn) => checkIn.rating);
      const labels = checkIns.map((checkIn) => checkIn.beerName);

      setState({
        series: [
          {
            name: 'Beer Ratings',
            data: ratings,
          },
        ],
      });

      options.xaxis!.categories = labels;
    }
  }, [checkIns]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5"></div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
