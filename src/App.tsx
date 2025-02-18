// libraries
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import { Category } from "./pages/Category";
const ProductDetails = lazy(
  () => import("./pages/ProductDetails/ProductDetails")
);

// components
import Layout from "./Layout";
import NotFound from "./NotFound";
import { Loading } from "./components/ui/Loading";

// routes
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Category category="all" /> },
      { path: "/clothes", element: <Category category="clothes" /> },
      { path: "/tech", element: <Category category="tech" /> },
      {
        path: "/product/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ProductDetails />
          </Suspense>
        ),
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
