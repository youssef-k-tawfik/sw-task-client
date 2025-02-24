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
  return (
    <>
      <div>Category {category} page</div>
    </>
  );
};

export default Category;
