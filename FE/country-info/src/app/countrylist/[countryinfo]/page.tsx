"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function CountryInfo() {
  const [countryData, setCountryData] = useState<RootObject>();

  const currentPage = usePathname();
  const countryinfo = currentPage.split("/").pop();
  const borderCountries = countryData?.borderCountries?.borders;

  const apiBaseUrl = process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL;

  console.log(countryData);

  useEffect(() => {
    const fetchPopulationData = async () => {
      if (!countryinfo) return;

      try {
        const res = await fetch(`${apiBaseUrl}/countries/info/${countryinfo}`);
        if (!res.ok) throw new Error("Failed to fetch population data");
        const data = await res.json();
        setCountryData(data);
      } catch (error) {
        console.error("Error fetching population data:", error);
      }
    };

    fetchPopulationData();
  }, [countryinfo]);

  if (!countryinfo || !countryData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-4 border-t-4 border-blue-600 rounded-full animate-spin"></div>
          <span className="text-xl text-gray-500">Loading...</span>
        </div>
      </div>
    );
  }

  const populationCounts =
    countryData.populationData.data[0]?.populationCounts || [];
  const years = populationCounts.map((item) => item.year);

  const population = populationCounts.map((item) => item.value / 10);

  const chartData = {
    labels: years,
    datasets: [
      {
        label: "Population Over Time",
        data: population,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      <div className="container mx-auto p-6 space-y-8 bg-slate-300 shadow-lg rounded-xl">
        <h1 className="text-3xl font-semibold text-center text-blue-600">
          {countryData?.borderCountries.commonName}
        </h1>

        <div className="flex justify-center mb-6">
          {countryData?.flagUrl.data
            .filter((datum) => countryinfo === datum.iso2)
            .map((datum) => (
              <img
                key={datum.iso2}
                src={datum.flag}
                alt={`Flag of ${datum.name}`}
                className="w-32 h-auto rounded-lg shadow-lg"
              />
            ))}
        </div>

        <div>
          <h2 className="text-2xl font-medium text-gray-700 mb-4">
            Border Countries
          </h2>
          {borderCountries && borderCountries.length > 0 ? (
            <ul className="space-y-2">
              {borderCountries.map((borderCountry) => (
                <li
                  key={borderCountry.countryCode}
                  className="flex items-center space-x-4"
                >
                  <Link
                    href={`/countrylist/${borderCountry.countryCode}`}
                    className="text-lg font-semibold text-blue-500 hover:text-blue-700"
                  >
                    {borderCountry.commonName}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No border countries available.</p>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-medium text-gray-700 mb-4">
            Population Over Time
          </h2>
          <Line data={chartData} />
        </div>
      </div>
    </>
  );
}
