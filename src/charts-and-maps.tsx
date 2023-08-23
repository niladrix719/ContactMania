import { Line } from "react-chartjs-2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "react-query";
import axios from "axios";
import Navbar from "./components/navbar";

function ChartsAndMaps() {
  const { data: worldData } = useQuery("worldData", () =>
    axios
      .get("https://disease.sh/v3/covid-19/all")
      .then((response) => response.data)
  );

  const { data: countryData } = useQuery("countryData", () =>
    axios
      .get("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.data)
  );

  // const formatWorldwideDataForChart = (data) => {
  //   const labels = Object.keys(data.cases);
  //   const cases = Object.values(data.cases);

  //   return {
  //     labels,
  //     datasets: [
  //       {
  //         label: "Worldwide Cases",
  //         data: cases,
  //         borderColor: "aqua",
  //         backgroundColor: "rgba(0, 123, 255, 0.2)",
  //         fill: true,
  //       },
  //     ],
  //   };
  // };

  const markers = countryData?.map((country) => ({
    lat: country.countryInfo.lat,
    lng: country.countryInfo.long,
    countryName: country.country,
    cases: country.cases,
    deaths: country.deaths,
  }));

  return (
    <div>
      <Navbar />
      {/* <div>
        <Line
          data={formatWorldwideDataForChart(worldData)}
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
      </div> */}
      <div>
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: "60vh", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {markers?.map((marker, index) => (
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
    </div>
  );
}

export default ChartsAndMaps;
