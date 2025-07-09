import Axios from "axios";
import { useState } from "react";

function TestComponent() {
  const [prodList, setProdList] = useState([]);

  const getProducts = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/api/products");
      console.log("Products fetched:", response);
      setProdList(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <h1>Test Page</h1>
      <p>This is a test page.</p>
      <button onClick={getProducts}>Fetch Products</button>
      <ul className="text-lg">
        {prodList.map((product, i) => (
          <li key={i}>{product.name} {product.size} {product.taste} {product.price}บาท</li>
        ))}
      </ul>
    </div>
  );
}
export default TestComponent;
