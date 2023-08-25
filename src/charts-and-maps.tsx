import { Line } from "react-chartjs-2";
import "leaflet/dist/leaflet.css";
import { useQuery } from "react-query";
import axios from "axios";
import Navbar from "./components/navbar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
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
  const { data: countryData, error: countryError } = useQuery("countryData", () =>
    axios
      .get("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.data)
  );

  if (countryError) {
    return <div>Error fetching data</div>;
  }

  const formatCountryDataForChart = (data: any) => {
    const labels = data.map((country: any) => country.country);
    const cases = data.map((country: any) => country.cases);
    return {
      labels: labels,
      datasets: [
        {
          label: "Cases by Country",
          data: cases,
          borderColor: "aqua",
          backgroundColor: "rgba(0, 123, 255, 0.2)",
          fill: true,
        },
      ],
    };
  };

  const markers = countryData?.map((country: any) => ({
    lat: country.countryInfo.lat,
    lng: country.countryInfo.long,
    countryName: country.country,
    cases: country.cases,
    deaths: country.deaths,
  }));

  return (
    <div>
      <Navbar />
      <div>
        <MapContainer
          center={{ lat: 20, lng: 0 }}
          zoom={2}
          style={{ height: "60vh", width: "100%" }}
        >
          <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright%22%3EOpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

          {markers?.map((marker: any, index: any) => (
            <Marker key={index} position={[marker.lat, marker.lng]}>
              <Popup>
                <h1>{marker.countryName}</h1>
                <p>Total Cases: {marker.cases}</p>
                <p>Total Deaths: {marker.deaths}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div>
        {countryData ? (
          <Line
            data={formatCountryDataForChart(countryData)}
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
                  type: "linear",
                  beginAtZero: true,
                },
              },
            }}
          />
        ) : (
          <div>Loading country chart...</div>
        )}
      </div>
    </div>
  );
}

export default ChartsAndMaps;
