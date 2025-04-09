import { useParams } from "react-router-dom";
import { fetchProducts } from "@/services/api";
import { Product } from "@/types";
import {
  ErrorMessage,
  Loading,
  ProductGallery,
  ProductInfo,
} from "@/components/ui";
import { useQuery } from "@tanstack/react-query";

/**
 * ProductDetails component displays the Product Detail Page (PDP) for a product.
 * It retrieves the product ID from the URL using the `useParams` hook from `react-router-dom`.
 *
 * @returns {JSX.Element} The JSX code for displaying the product.
 */
const ProductDetailPage: React.FC = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const {
    data: products = [],
    error,
    isLoading,
    isError,
  } = useQuery<Product[], Error>({
    queryKey: ["product", id],
    queryFn: () => fetchProducts({ id }),
    enabled: !!id,
  });

  if (isLoading) return <Loading />;
  if (isError || !products.length) {
    return (
      <ErrorMessage
        error={error?.message || "Failed to fetch product. Please try again."}
      />
    );
  }

  const product = products[0];

  return (
    <div className="flex gap-8 flex-col lg:flex-row lg:gap-0 py-10">
      <ProductGallery images={product.gallery} />
      <ProductInfo product={product} />
    </div>
  );
};

export default ProductDetailPage;
