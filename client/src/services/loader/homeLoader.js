import axios from "axios";

const homeLoader = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/product`
  );
  return response.data;
};

export default homeLoader;
