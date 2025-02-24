import { useParams } from "react-router-dom";

/**
 * ProductDetails component displays the Product Detail Page (PDP) for a product.
 * It retrieves the product ID from the URL using the `useParams` hook from `react-router-dom`.
 *
 * @returns {JSX.Element} The JSX code for displaying the product ID.
 */
const ProductDetails: React.FC = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <div> id:{id} </div>
    </>
  );
};

export default ProductDetails;
