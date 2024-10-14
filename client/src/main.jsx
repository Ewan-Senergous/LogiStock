import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

import homeLoader from "./services/loader/homeLoader";
import productDetailsLoader from "./services/loader/productDetailsLoader";

import "./styles/main.css";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
        loader: productDetailsLoader,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
