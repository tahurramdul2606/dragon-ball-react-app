import React, { useEffect, useState } from "react";
import { useParams, Navigate, Link, useNavigate, } from "react-router-dom";

function CharacterDetails({ currentUser, setCurrentUser }) {
    const { id } = useParams(); // get character id from URL
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    if (!currentUser) return <Navigate to="/login" />;

    const fetchCharacter = async () => {
        setLoading(true);
        try {
            const res = await fetch(`https://dragonball-api.com/api/characters/${id}`);
            const data = await res.json();
            setCharacter(data);
        } catch (error) {
            console.error("Error fetching character:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCharacter();
    }, [id]);

    const addFavorite = () => {
        const exists = (currentUser.favorites || []).find((c) => c.id === character.id);
        if (exists) return;

        setCurrentUser({
            ...currentUser,
            favorites: [...(currentUser.favorites || []), character],
        });
    };

    if (loading) return <p className="text-white p-6">Loading character...</p>;
    if (!character) return <p className="text-white p-6">Character not found.</p>;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col md:flex-row gap-6 pt-25">
            {/* Image */}
            <div className="md:w-1/3 flex justify-center">
                <img
                    src={character.image || "https://via.placeholder.com/300x300?text=No+Image"}
                    alt={character.name}
                    className="rounded shadow-lg w-full max-w-sm object-contain"
                />
            </div>

            {/* Details */}
            <div className="md:w-2/3 space-y-4">
                <h1 className="text-4xl font-bold">{character.name}</h1>
                <p className="text-gray-300">{character.description || "No description available."}</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-200">
                    <p><strong>Ki:</strong> {character.ki || "N/A"}</p>
                    <p><strong>Max Ki:</strong> {character.maxKi || "N/A"}</p>
                    <p><strong>Gender:</strong> {character.gender || "N/A"}</p>
                    <p><strong>Race:</strong> {character.race || "N/A"}</p>
                    <p><strong>Affiliation:</strong> {character.affiliation || "N/A"}</p>
                </div>

                {/* Transformations */}
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-3">Transformations</h2>

                    {character.transformations?.length > 0 ? (
                        <div className="flex flex-wrap gap-4">
                            {character.transformations.map((form, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-800 p-3 rounded shadow-md text-center"
                                >
                                    <img
                                        src={form.image}
                                        alt={form.name}
                                        className="w-45 h-45 object-contain mx-auto transition-transform duration-300 hover:scale-150 lg:hover:scale-200"
                                    />
                                    <p className="mt-2 text-sm">{form.name}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">No transformations available.</p>
                    )}
                </div>


                {/* Add to Favorites */}
                <button
                    onClick={addFavorite}
                    className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 mt-4 mr-1"
                >
                    Add to Favorites ❤️
                </button>
                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 mt-4"
                >
                    Home
                </button>
            </div>
        </div>
    );
}

export default CharacterDetails;