"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Countries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("http://localhost:3002/countries/available");
        if (!res.ok) throw new Error("Failed to fetch countries");
        const data = await res.json();
        setCountries(data);
      } catch (err) {
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
              <Link href={`/country/${country.name}`}>{country.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Countries;
