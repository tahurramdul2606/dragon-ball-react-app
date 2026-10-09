import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ currentUser, setCurrentUser }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        setCurrentUser(null); // remove user from state
        navigate("/login");
    };

    return (
      <>
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center fixed top-0 left-0 w-full z-50 ">
            <div className="text-xl font-bold">
                <Link to="/">DragonBallZ</Link>
            </div>

            <div className="space-x-4">
                {currentUser && (
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="hover:bg-gray-700 px-3 py-2 rounded hidden md:block"
          >
            Home
          </Link>

          <Link
            to="/favorites"
            className="relative hover:bg-gray-700 px-3 py-2 rounded"
          >
            Favorites
            {(currentUser.favorites || []).length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {(currentUser.favorites || []).length}
              </span>
            )}
          </Link>

          <Link
            to="/profile"
            className="hover:bg-gray-700 px-3 py-2 rounded"
          >
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}
            </div>
        </nav>
        
        </>
      
    );
}

export default Navbar;