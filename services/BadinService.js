import Axios from "axios";

const api = "http://localhost:3001/api";

const getAllProducts = async () => {
  try {
    const response = await Axios.get(`${api}/products`);
    console.log("Products fetched:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const getAllOrders = async () => {
  try {
    const response = await Axios.get(`${api}/orders`);
    console.log("Orders fetched:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

const getAllOrderItems = async () => {
  try {
    const response = await Axios.get(`${api}/order_items`);
    console.log("Order items fetched:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching order items:", error);
  }
};

const createOrders = async (orders) => {
  try {
    const response = await Axios.post(`${api}/createOrders`, orders);
    console.log("Order created:", response);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
  }
};

const getOrder = async (orderId) => {
  try {
    const response = await Axios.get(`${api}/getOrder/${orderId}`, {});
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
  }
};

export {
  getAllProducts,
  getAllOrders,
  getAllOrderItems,
  createOrders,
  getOrder,
};
