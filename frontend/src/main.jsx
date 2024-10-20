import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import "./index.css";

// Import pages
import Home from "./pages/Home.jsx";
import Sign from "./pages/Sign.jsx";
import Login from "./pages/Login.jsx";
import BuyTicketPage from "./pages/BuyTicketPage.jsx";

const Main = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    axios
      .get("https://tiketa.onrender.com/api/events", {
        withCredentials: true,
      })
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the events!", error);
        setLoading(false);
      });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home events={events} loading={loading} />, // Pass loading state
    },
    {
      path: "/sign-up",
      element: <Sign />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/buy-ticket/:title",
      element: <BuyTicketPage events={events} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

// Render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
