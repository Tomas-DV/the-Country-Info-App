"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function CountryInfo() {
  const [countryData, setCountryData] = useState<RootObject>();
  const [flagUrl, setFlagUrl] = useState("");
  const currentPage = usePathname();
  const countryinfo = currentPage.split("/").pop();

  console.log(countryData);

  useEffect(() => {
    const fetchPopulationData = async () => {
      if (!countryinfo) return;

      try {
        const res = await fetch(
          `http://localhost:3002/countries/info/${countryinfo}`
        );
        if (!res.ok) throw new Error("Failed to fetch population data");
        const data = await res.json();
        setCountryData(data);
      } catch (error) {
        console.error("Error fetching population data:", error);
      }
    };

    fetchPopulationData();
  }, [countryinfo]);

  if (!countryinfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h1>Country name: {countryData?.borderCountries.commonName}</h1>
        <h1>
          {countryData?.flagUrl.data
            .filter((datum) => countryinfo === datum.iso2)
            .map((datum) => (
              <img
                key={datum.iso2}
                src={datum.flag}
                alt={`Flag of ${datum.name}`}
              />
            ))}
        </h1>
      </div>
    </>
  );
}
