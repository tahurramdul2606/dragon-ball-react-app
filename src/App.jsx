
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";


import Home from "./components/Home"
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Favorites from "./components/Favorites";
import CharacterDetails from "./components/CharacterDetails";
import Profile from "./components/Profile";

function App() {
  const [users, setUsers] = useState([]);       // All registered users
  const [currentUser, setCurrentUser] = useState(null); // Logged-in user


  return (
    <>
      <BrowserRouter>
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />

        <Routes>
          <Route
            path="/"
            element={<Home currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/login"
            element={<Login users={users} setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/register"
            element={<Register users={users} setUsers={setUsers} />}
          />
          <Route
            path="/favorites"
            element={<Favorites currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />
          <Route path="/profile"
            element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/character/:id"
            element={<CharacterDetails currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          />
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
