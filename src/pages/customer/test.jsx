import { useState } from "react";
import {
  getAllProducts,
  getAllOrders,
  getAllOrderItems,
} from "../../../services/BadinService.js";

function TestAPIComponent() {
  const [prodList, setProdList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [orderItemsList, setOrderItemsList] = useState([]);

  const fetchProducts = async () => {
    const product_data = await getAllProducts();
    setProdList(product_data);
  };

  const fetchOrders = async () => {
    const order_data = await getAllOrders();
    setOrderList(order_data);
  };

  const fetchOrderItems = async () => {
    const order_items_data = await getAllOrderItems();
    setOrderItemsList(order_items_data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1>Test API Page</h1>
      <p>This is a test page.</p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={fetchProducts}
      >
        Fetch Products
      </button>
      <ul className="text-lg">
        {prodList.map((product, i) => (
          <li key={i}>
            {product.id_products}. {product.name} {product.size} {product.taste}{" "}
            {product.price}บาท
          </li>
        ))}
      </ul>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={fetchOrders}
      >
        Fetch Orders
      </button>
      <ul className="text-lg">
        {orderList.map((order, i) => (
          <li key={i}>
            {order.order_id}. {order.customer_name} {order.description}{" "}
            {order.address} {order.payment} {order.telephone}
          </li>
        ))}
      </ul>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={fetchOrderItems}
      >
        Fetch Order Items
      </button>
      <ul className="text-lg">
        {orderItemsList.map((item, i) => (
          <li key={i}>
            {item.order_id}. {item.product_id} {item.quantity} {item.unit_price}
            บาท
          </li>
        ))}
      </ul>
    </div>
  );
}
export default TestAPIComponent;
