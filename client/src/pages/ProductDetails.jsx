import { useLoaderData } from "react-router-dom";

export default function ProductDetails() {
  const product = useLoaderData();

  return (
    <div className="product-details">
      <h2>{product.title}</h2>
      <img
        src={`${import.meta.env.VITE_API_URL}/${product.image_url}`}
        alt={product.title}
        className="product-image-details"
      />
      <p>{product.description}</p>
      <p>
        <strong>Price:</strong> {product.price}€
      </p>
      <p>
        <strong>Stock:</strong> {product.stock}
      </p>
    </div>
  );
}
