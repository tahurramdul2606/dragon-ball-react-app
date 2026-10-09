import React, { useState } from "react";
import { Navigate } from "react-router-dom";

function Profile({ currentUser, setCurrentUser }) {
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        name: currentUser?.name || "",
        email: currentUser?.email || "",
        age: currentUser?.age || "",
        gender: currentUser?.gender || "",
        bio: currentUser?.bio || "",
    });

    if (!currentUser) return <Navigate to="/login" />;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setCurrentUser({ ...currentUser, ...form });
        setEditing(false);
        alert("Profile updated!");
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6  pt-25">
            <h1 className="text-4xl font-bold mb-6">Profile 👤</h1>

            {/* User Info */}
            <div className="bg-gray-800 p-6 rounded-xl max-w-md mx-auto space-y-4">
                {editing ? (
                    <div className="space-y-3">
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-700"
                            placeholder="Name"
                        />
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-700"
                            placeholder="Email"
                        />
                        <input
                            type="number"
                            name="age"
                            value={form.age}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-700"
                            placeholder="Age"
                        />
                        <select
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-700"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <textarea
                            name="bio"
                            value={form.bio}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-700"
                            placeholder="Bio"
                        />
                        <button
                            onClick={handleSave}
                            className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setEditing(false)}
                            className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <p><strong>Name:</strong> {currentUser.name}</p>
                        <p><strong>Email:</strong> {currentUser.email}</p>
                        <p><strong>Age:</strong> {currentUser.age}</p>
                        <p><strong>Gender:</strong> {currentUser.gender}</p>
                        <p><strong>Bio:</strong> {currentUser.bio}</p>
                        <p><strong>Favorites Count:</strong> {(currentUser.favorites || []).length}</p>
                        <button
                            onClick={() => setEditing(true)}
                            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 mt-2"
                        >
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>

            {/* Favorite Characters */}
            <div className="bg-gray-800 p-6 rounded-xl max-w-3xl mx-auto mt-6">
                <h2 className="text-2xl font-bold mb-3">Favorite Characters</h2>
                {currentUser.favorites && currentUser.favorites.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {currentUser.favorites.map((char) => (
                            <div
                                key={char.id}
                                className="bg-gray-700 rounded p-3 flex flex-col items-center"
                            >
                                <img
                                    src={char.image || "https://via.placeholder.com/150"}
                                    alt={char.name}
                                    className="w-full h-40 object-contain rounded mb-2"
                                />
                                <p className="text-center font-bold">{char.name}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">No favorite characters yet.</p>
                )}
            </div>

            {/* Activity Log */}
            <div className="bg-gray-800 p-6 rounded-xl max-w-md mx-auto mt-6">
                <h2 className="text-2xl font-bold mb-3">Activity</h2>
                {currentUser.favorites && currentUser.favorites.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1 text-gray-200">
                        {currentUser.favorites.map((char) => (
                            <li key={char.id}>
                                Added <strong>{char.name}</strong> to favorites
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-400">No activity yet.</p>
                )}
            </div>
        </div>
    );
}

export default Profile;