import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchProducts from "@/services/api";
import { Product } from "@/types";
import {
  ErrorMessage,
  Loading,
  ProductGallery,
  ProductInfo,
} from "@/components/ui";


/**
 * ProductDetails component displays the Product Detail Page (PDP) for a product.
 * It retrieves the product ID from the URL using the `useParams` hook from `react-router-dom`.
 *
 * @returns {JSX.Element} The JSX code for displaying the product.
 */
const ProductDetailPage: React.FC = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const abortController = new AbortController();

    const loadProduct = async () => {
      try {
        setLoading(true);
        const products = await fetchProducts({ id }, abortController.signal);
        if (products && products.length > 0) {
          setProduct(products[0]);
        }
      } catch (err: unknown) {
        if (
          err instanceof Error &&
          err.name !== "CanceledError" &&
          err.name !== "AbortError"
        ) {
          console.error(err);
          setError(`Failed to fetch ${id} product. Please try again later.`);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProduct();

    return () => abortController.abort();
  }, [id]);

  if (loading) return <Loading />;
  if (error || !product) return <ErrorMessage error={error} />;

  return (
    <div className="flex gap-8 flex-col lg:flex-row lg:gap-0 py-10">
      <ProductGallery images={product.gallery} />
      <ProductInfo product={product} />
    </div>
  );
};

export default ProductDetailPage;
