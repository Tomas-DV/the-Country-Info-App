"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Countries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiBaseUrl = process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/countries/available`);
        if (!res.ok) throw new Error("Failed to fetch countries");
        const data = await res.json();
        setCountries(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return <div className="text-center text-xl">Loading countries...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Countries List</h1>
        <ul className="space-y-2">
          {countries.map((country) => (
            <li key={country.name} className="border-b pb-2">
              <Link href={`countrylist/${country.countryCode}`}>
                {country.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Countries;
