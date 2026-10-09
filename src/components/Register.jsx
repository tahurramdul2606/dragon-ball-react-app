import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Register({ users, setUsers }) {
    const navigate = useNavigate();

    const [passError, setPassError] = useState("");
    const [confirmError, setConfirmError] = useState("");

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        gender: "",
        favoriteSaiyan: "",
        bio: "",
    });

    const handlePassChange = (e) => {
        const value = e.target.value;

        // update form state
        setForm((prev) => ({
            ...prev,
            password: value,
        }));

        // strong password regex
        const strongPasswordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        // validation
        if (!strongPasswordRegex.test(value)) {
            setPassError(
                "Min 8 chars, include uppercase, lowercase, number & special char"
            );
        } else {
            setPassError("");
        }
    };

    const handleConfirmPassChange = (e) => {
        const value = e.target.value;

        setForm((prev) => ({
            ...prev,
            confirmPassword: value,
        }));

        if (value !== form.password) {
            setPassError("Passwords do not match");
        } else {
            setPassError("");
        }
    };

    // Handle input change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = () => {
        const { name, email, password, confirmPassword, age, gender } = form;

        if (!name || !email || !password || !confirmPassword || !age || !gender) {
            return alert("Please fill all required fields");
        }


        if (password !== confirmPassword) {
            return alert("Passwords do not match");
        }

        const exists = users.find((u) => u.email === email);
        if (exists) return alert("User already exists");

        setUsers([...users, form]); // save in top-level state
        alert("Registered successfully!");
        navigate("/login");
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-6 rounded-xl w-96 text-white">
                <h2 className="text-2xl mb-4 font-bold">Register</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full p-2 mb-3 rounded bg-gray-700"
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 mb-3 rounded bg-gray-700"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 mb-3 rounded bg-gray-700"
                    onChange={handlePassChange}
                />
                {passError && <p className="text-red-400 text-sm">{passError}</p>}
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full p-2 mb-3 rounded bg-gray-700"
                    onChange={handleConfirmPassChange}
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    className="w-full p-2 mb-3 rounded bg-gray-700"
                    onChange={handleChange}
                />
                <select
                    name="gender"
                    className="w-full p-2 mb-3 rounded bg-gray-700"
                    onChange={handleChange}
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <input
                    type="text"
                    name="favoriteSaiyan"
                    placeholder="Favorite Saiyan"
                    className="w-full p-2 mb-3 rounded bg-gray-700"
                    onChange={handleChange}
                />
                <textarea
                    name="bio"
                    placeholder="Short Bio"
                    className="w-full p-2 mb-3 rounded bg-gray-700"
                    onChange={handleChange}
                />

                <button
                    onClick={handleRegister}
                    className="w-full bg-green-500 p-2 rounded hover:bg-green-600"
                >
                    Register
                </button>

                <p
                    className="mt-3 text-sm text-gray-400 cursor-pointer"
                    onClick={() => navigate("/login")}
                >
                    Already have an account? Login
                </p>
            </div>
        </div>
    )
}

export default Register
