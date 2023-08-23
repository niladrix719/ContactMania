import { Line } from 'react-chartjs-2';
import Navbar from "./components/navbar";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

function ChartsAndMaps() {
  return (
    <div>
      {/* <Navbar /> */}
      <Line
        data={{
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "# of votes",
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: "aqua",
              borderColor: "white",
              pointBorderColor: "aqua",
              fill: true,
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                font: {
                  size: 18,
                },
              },
            },
          },
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}

export default ChartsAndMaps;