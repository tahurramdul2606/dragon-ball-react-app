import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Home({ currentUser, setCurrentUser }) {
    const [allCharacters, setAllCharacters] = useState([]);   //Full API data
    const [filteredCharacters, setFilteredCharacters] = useState([]);   //After filtering
    const [loading, setLoading] = useState(true);   //Show loading state
    const [page, setPage] = useState(1);    //Current page
    const [raceFilter, setRaceFilter] = useState("");   //Selected race
    const [uniqueRaces, setUniqueRaces] = useState([]);     //Dropdown options
    const [searchTerm, setSearchTerm] = useState("");
    const limit = 10;

    const navigate = useNavigate();

    if (!currentUser) return <Navigate to="/login" />;

    // Fetch all pages
    const fetchAllCharacters = async () => {
        setLoading(true);
        try {
            let allChars = [];
            for (let p = 1; p <= 6; p++) {
                const res = await fetch(`https://dragonball-api.com/api/characters?page=${p}&limit=${limit}`);
                const data = await res.json();
                allChars = [...allChars, ...(data.items || [])];
            }
            setAllCharacters(allChars);
            setFilteredCharacters(allChars);

            // Extract unique races dynamically
            const races = Array.from(new Set(allChars.map(c => c.race).filter(Boolean)));
            setUniqueRaces(races);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllCharacters();
    }, []);


    // Filter by race
    // useEffect(() => {
    //     if (!raceFilter) {
    //         setFilteredCharacters(allCharacters);
    //     } else {
    //         const filtered = allCharacters.filter(
    //             (char) => char.race?.toLowerCase() === raceFilter.toLowerCase()
    //         );
    //         setFilteredCharacters(filtered);
    //         setPage(1); // reset to first page
    //     }
    // }, [raceFilter, allCharacters]);

    useEffect(() => {
        let filtered = allCharacters;

        // Filter by race
        if (raceFilter) {
            filtered = filtered.filter(
                (char) => char.race?.toLowerCase() === raceFilter.toLowerCase()
            );
        }

        // Filter by search (name OR race)
        if (searchTerm) {
            filtered = filtered.filter((char) =>
                char.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                char.race?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredCharacters(filtered);
        setPage(1); // reset page on filter/search change
    }, [raceFilter, searchTerm, allCharacters]);

    const addFavorite = (char) => {
        const exists = (currentUser.favorites || []).find((c) => c.id === char.id);
        if (exists) return;

        setCurrentUser({
            ...currentUser,
            favorites: [...(currentUser.favorites || []), char],
        });
    };

    // Pagination slice
    const startIndex = (page - 1) * limit;
    const paginatedCharacters = filteredCharacters.slice(startIndex, startIndex + limit);
    const totalPages = Math.ceil(filteredCharacters.length / limit);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 pt-25">

            {/* <h1 className="text-4xl font-bold mb-6">Welcome, {currentUser.name} 👋</h1> */}

            {/* Quick Stats */}
            <div className="flex space-x-6 mb-6 flex-wrap">
                <div className="bg-gray-800 p-4 rounded-xl text-center flex-1">
                    <h2 className="text-2xl font-bold">{filteredCharacters.length}</h2>
                    <p>Total Characters</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl text-center flex-1">
                    <h2 className="text-2xl font-bold">{(currentUser.favorites || []).length}</h2>
                    <p>Your Favorites</p>
                </div>
            </div>

            {/* Dynamic Race Filter */}
            <div className="flex space-x-4 mb-6 gap-2 items-center flex-wrap">
                <label htmlFor="race" className="text-gray-300">Filter by Race:</label>

                <select
                    id="race"
                    className="p-2 rounded bg-gray-700"
                    value={raceFilter}
                    onChange={(e) => {
                        setRaceFilter(e.target.value);
                        setSearchTerm("");
                    }}
                >
                    <option value="">All</option>
                    {uniqueRaces.map((race) => (
                        <option key={race} value={race}>{race}</option>
                    ))}
                </select>

                {/* 🔍 Search Input */}
                <div className="relative w-full sm:w-80 md:w-96">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-4.35-4.35m1.6-5.4a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search by name or race..."
                        className="w-full p-2 pl-8 pr-8 rounded bg-gray-700 text-white"
                        value={searchTerm}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSearchTerm(value);

                            if (value) {
                                setRaceFilter(""); // reset only when user starts typing
                            }
                        }}
                    />


                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
                        >
                            ✖
                        </button>
                    )}
                </div>
            </div>

            {/* Characters Grid */}
            {loading ? (
                <p>Loading characters...</p>
            ) : paginatedCharacters.length === 0 ? (
                <div className="text-center w-full mt-10">
                    <h2 className="text-2xl font-bold text-gray-300">No results found 😔</h2>
                    <p className="text-gray-500 mt-2">
                        Try searching with a different name or race
                    </p>

                    {/* Optional: Reset button */}
                    <button
                        onClick={() => {
                            setSearchTerm("");
                            setRaceFilter("");
                        }}
                        className="mt-4 bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Reset Filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {paginatedCharacters.map((char) => (
                        <div
                            key={char.id}
                            className="bg-gray-800 p-4 rounded-xl flex flex-col items-center space-y-2"
                        >
                            <img
                                src={char.image || "https://via.placeholder.com/300x300"}
                                alt={char.name}
                                className="w-full h-64 object-contain rounded"
                            />
                            <h2 className="text-xl font-bold">{char.name}</h2>
                            <p><strong>Ki:</strong> {char.ki || "N/A"}</p>
                            <p><strong>Max Ki:</strong> {char.maxKi || "N/A"}</p>
                            <p><strong>Gender:</strong> {char.gender || "N/A"}</p>
                            <p><strong>Race:</strong> {char.race || "N/A"}</p>
                            <p><strong>Affiliation:</strong> {char.affiliation || "N/A"}</p>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => addFavorite(char)}
                                    className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600 mt-2"
                                >
                                    Add to Favorites
                                </button>
                                <button
                                    onClick={() => navigate(`/character/${char.id}`)}
                                    className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 mt-2"
                                >
                                    Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
                    disabled={page === 1}
                >
                    Prev
                </button>
                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Home;