import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Import components
import App from "./App.jsx";
import SignUpForm from "./components/SignUpForm.jsx";
import SignInform from "./components/SignInform.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/signup",
        element: <SignUpForm />,
      },
      {
        path: "signin",
        element: <SignInform />,
      },
    ],
  },
]);

// Routes
// const router = createBrowserRouter([
//   { path: "/", element: <App /> },
//   { path: "/signup", element: <SignUpForm /> },
//   { path: "/signin", element: <SignInform /> },
// ]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
