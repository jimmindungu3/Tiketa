import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import "./index.css";

const API_BASE_URL =
  import.meta.env.VITE_ENVIRONMENT === "development"
    ? import.meta.env.VITE_API_BASE_URL_DEV
    : import.meta.env.VITE_API_BASE_URL_PROD;

// Import pages
import Home from "./pages/Home.jsx";
import Sign from "./pages/Sign.jsx";
import Login from "./pages/Login.jsx";
import BuyTicketPage from "./pages/BuyTicketPage.jsx";
import CreateEvent from "./pages/CreateEvent.jsx";

const Main = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/events`, { withCredentials: true })
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the events!", error);
      });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home events={events} />,
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
    {
      path: "/create-event",
      element: <CreateEvent />,
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
