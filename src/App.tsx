// libraries
import { lazy } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000, // Cache data for 10 minutes
      retry: 2,
    },
  },
});

/**
 * App component is the main entry point of the application.
 * It sets up the React Query Client, Router, and Cart Provider.
 *
 * @returns {JSX.Element} The main application component.
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <RouterProvider router={routes} />
        <Toaster position="top-center" containerStyle={{ marginTop: "40px" }} />
      </CartProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
