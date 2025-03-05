import { useEffect, useState } from "react";
import { ProductCard, Loading } from "../../components/ui";
import fetchProducts from "../../services/api";
import { Product } from "../../types";

interface CategoryProps {
  category: string;
}

/**
 * Category component displays the Category Page for a given category.
 * It receives the category name as a prop.
 *
 * @param {CategoryProps} props - The props for the component.
 * @param {string} props.category - The name of the category to display.
 *
 * @returns {JSX.Element} The JSX code for displaying the category page.
 */
const Category: React.FC<CategoryProps> = ({
  category,
}: CategoryProps): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const abortController = new AbortController();

    const loadProducts = async () => {
      try {
        setLoading(true);

        const products = await fetchProducts(
          { category },
          abortController.signal
        );

        setProducts(products);
      } catch (err: unknown) {
        if (
          err instanceof Error &&
          err.name !== "CanceledError" &&
          err.name !== "AbortError"
        ) {
          console.error(err.message);
          setError(
            `Failed to fetch ${category} products. Please try again later.`
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadProducts();

    return () => {
      abortController.abort();
    };
  }, [category]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <div className="py-14">
        <h1 className="capitalize mb-14">{category}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
