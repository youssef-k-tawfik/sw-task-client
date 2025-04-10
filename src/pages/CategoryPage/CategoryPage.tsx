import { useQuery } from "@tanstack/react-query";
import { ProductCard, Loading, ErrorMessage } from "@/components/ui";
import { fetchProducts } from "@/services/api";
import { Product } from "@/types";

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
  const {
    data: products = [],
    error,
    isLoading,
    isError,
  } = useQuery<Product[], Error>({
    queryKey: ["category", category],
    queryFn: () => fetchProducts({ category }),
  });

  if (isLoading) {
    return (
      <>
        <h1 className="capitalize my-14 text-[42px]">{category}</h1>
        <Loading />
      </>
    );
  }

  if (isError) {
    return <ErrorMessage error={error?.message || "An error occurred"} />;
  }

  return (
    <div className="pb-14">
      <h1 className="capitalize my-14 text-[42px]">{category}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Category;
