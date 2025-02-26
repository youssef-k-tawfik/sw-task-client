// libraries
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
const Category = lazy(() => import("./pages/Category/Category"));
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
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Category category="all" />
          </Suspense>
        ),
      },
      {
        path: "/clothes",
        element: (
          <Suspense fallback={<Loading />}>
            <Category category="clothes" />
          </Suspense>
        ),
      },
      {
        path: "/tech",
        element: (
          <Suspense fallback={<Loading />}>
            <Category category="tech" />
          </Suspense>
        ),
      },
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
