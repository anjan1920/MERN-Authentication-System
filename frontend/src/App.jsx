import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigate } from "react-router-dom";

import Navbar from './components/navbar'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import NotFound  from './components/notFound';

function App() {

  // state initialization happens when App component mounts
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  console.log(user);

  // This effect runs once after the App component mounts (first render).
  // It checks if a JWT token exists in localStorage.
  // If token exists, it fetches the logged-in user details from backend.
  // Because dependency array is empty ([]), this effect will NOT run again
  // unless the App component unmounts and mounts again (like page refresh).
  useEffect(() => {

    const fetchUser = async () => {

      const token = localStorage.getItem("token");

      if (token) {
        try {
          const res = await axios.get("/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });

          // update user state with backend response
          // this triggers a re-render of App
          setUser(res.data);

        } catch (err) {

          // if token is invalid or request fails
          setError("Failed to fetch user data");

          // remove invalid token from storage
          localStorage.removeItem("token");
        }
      }

      // whether token exists or not, stop loading screen
      // this triggers re-render and shows main UI
      setIsLoading(false);
    };

    // call the async function once after mount
    fetchUser();

  }, []); // empty dependency array = run only once after mount

  // While checking token and fetching user, show loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  // After loading finishes, render the main application
  // Routing changes only the component inside <Routes>,
  // App itself does NOT unmount during route navigation.
  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} error={error} />} />

        {/* If user is already logged in, prevent access to login/register */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register setUser={setUser} />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
