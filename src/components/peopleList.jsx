import React, { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const PeopleList = ({darkMode}) => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}`
        );
        const data = await res.json();
        setPeople(data.results);
      } catch (err) {
        console.error("Failed to fetch people:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-white mt-20">Loading people...</div>
    );
  }

  return (
    <div className={`${darkMode? "bg-[#f2ecec]  text-[#1b0b0b]":"text-white"}min-h-screen p-8 bg-[#1d0f0f]`}>
      <h2 className="text-4xl font-bold  mb-8 text-center">
        Popular People
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {people.map((person) => (
          <div
            key={person.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg text-center text-white p-4"
          >
            <img
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
                  : "/fallback.jpg"
              }
              alt={person.name}
              className="w-full h-72 object-cover rounded"
            />
            <h3 className="mt-3 text-lg font-semibold">{person.name}</h3>
            <p className="text-sm text-gray-400">
              Known for:{" "}
              {person.known_for_department || "Unknown"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeopleList;