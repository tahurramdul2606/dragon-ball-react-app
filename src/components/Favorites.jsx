import React from "react";
import { Navigate } from "react-router-dom";

function Favorites({ currentUser, setCurrentUser }) {
    if (!currentUser) return <Navigate to="/login" />;

    const favorites = currentUser.favorites || [];

    if (favorites.length === 0) {
        return (
            <div className="min-h-screen bg-gray-900 text-white p-8">
                <h1 className="text-3xl font-bold mb-4">Your Favorites</h1>
                <p>You haven't added any favorite characters yet!</p>
            </div>
        );
    }

    const removeFavorite = (charId) => {
        const updatedFavorites = (currentUser.favorites || []).filter(
            (char) => char.id !== charId
        );
        setCurrentUser({ ...currentUser, favorites: updatedFavorites });
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6  pt-25">
            <h1 className="text-4xl font-bold mb-6">Your Favorites, {currentUser.name} 💛</h1>

            {favorites.length === 0 ? (
                <p className="text-gray-400">You have no favorite characters yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favorites.map((char) => (
                        <div
                            key={char.id}
                            className="bg-gray-800 p-4 rounded-xl flex flex-col items-center space-y-2"
                        >
                            <img
                                src={char.image || "https://via.placeholder.com/300x300?text=No+Image"}
                                alt={char.name}
                                className="w-full h-64 object-contain rounded"
                            />
                            <h2 className="text-xl font-bold">{char.name}</h2>
                            <p><strong>Ki:</strong> {char.ki || "N/A"}</p>
                            <p><strong>Max Ki:</strong> {char.maxKi || "N/A"}</p>
                            <p><strong>Gender:</strong> {char.gender || "N/A"}</p>
                            <p><strong>Race:</strong> {char.race || "N/A"}</p>
                            <p><strong>Affiliation:</strong> {char.affiliation || "N/A"}</p>
                            <button
                                onClick={() => removeFavorite(char.id)}
                                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 mt-2"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favorites;