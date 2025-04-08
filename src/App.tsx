// libraries
import { lazy } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

// pages
const Category = lazy(() =>
  import("@/pages").then((module) => ({ default: module.Category }))
);
const ProductDetails = lazy(() =>
  import("@/pages").then((module) => ({ default: module.ProductDetailPage }))
);

// components
import Layout from "@/Layout";
import { NotFound } from "@/components/ui";
import { CartProvider } from "@/contexts/Cart";
import { Toaster } from "react-hot-toast";

// routes
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Category category="all" />,
      },
      {
        path: "/all",
        element: <Navigate to="/" />,
      },
      {
        path: "/clothes",
        element: <Category category="clothes" />,
      },
      {
        path: "/tech",
        element: <Category category="tech" />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <CartProvider>
        <RouterProvider router={routes} />
        <Toaster position="top-center" containerStyle={{ marginTop: "40px" }} />
      </CartProvider>
    </>
  );
}
