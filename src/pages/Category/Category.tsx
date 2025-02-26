import { Product } from "../../types/Product";
import fetchProducts from "../../services/api";
import { ProductCard } from "../../components/ui/ProductCard";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts(category);
        setProducts(products);
      } catch (err) {
        console.error(err);
        setError(
          `Failed to fetch ${category} products. Please try again later.`
        );
      }
    };

    loadProducts();
  }, [category]);

  return (
    <>
      <div className="py-14">
        <h1 className="capitalize mb-14">{category}</h1>
        <div>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Category;
