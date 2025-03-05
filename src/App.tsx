// libraries
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
      <RouterProvider router={routes} />
    </>
  );
}
