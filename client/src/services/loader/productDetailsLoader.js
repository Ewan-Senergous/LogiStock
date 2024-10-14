import axios from "axios";

const productDetailsLoader = async ({ params }) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/product/${params.id}`
  );
  return response.data;
};

export default productDetailsLoader;
