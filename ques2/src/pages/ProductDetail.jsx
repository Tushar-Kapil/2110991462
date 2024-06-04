import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/categories/all/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="border border-gray-200 rounded-lg p-4">
        <p className="font-bold">{product.name}</p>
        <p>Price: ${product.price}</p>
        <p>Rating: {product.rating}</p>
        <p>Company: {product.company}</p>
        <p>Availability: {product.availability}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
