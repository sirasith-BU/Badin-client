import { useEffect, useState } from "react";
import { getAllOrders, getOrder } from "../../../services/BadinService";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

function DashboardAdminComponent() {
  const [orders, setOrders] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    getAllOrders().then((res) => {
      setOrders(res);
    });
  }, []);

  const handleOpenDialog = async (orderId) => {
    setSelectedOrderId(orderId);
    const res = await getOrder(orderId);
    setOrderDetails(res);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setOrderDetails([]);
    setSelectedOrderId(null);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold mb-8 text-pink-700 text-center uppercase">
        Orders
      </h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-pink-100">
            <tr>
              <th className="py-3 px-4 border-b text-left">Order ID</th>
              <th className="py-3 px-4 border-b text-left">ชื่อลูกค้า</th>
              <th className="py-3 px-4 border-b text-left">ที่อยู่</th>
              <th className="py-3 px-4 border-b text-left">การชำระเงิน</th>
              <th className="py-3 px-4 border-b text-left">เบอร์โทร</th>
              <th className="py-3 px-4 border-b text-left">รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i} className="hover:bg-pink-50">
                <td className="py-2 px-4 border-b">{order.order_id}</td>
                <td className="py-2 px-4 border-b">{order.customer_name}</td>
                <td className="py-2 px-4 border-b">{order.address}</td>
                <td className="py-2 px-4 border-b">{order.payment}</td>
                <td className="py-2 px-4 border-b">{order.telephone}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-1 rounded shadow transition"
                    onClick={() => handleOpenDialog(order.order_id)}
                  >
                    ดูรายละเอียด
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dialog แสดงรายละเอียด order */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          className: "rounded-xl",
        }}
      >
        <DialogTitle>
          <span className="text-2xl font-bold text-pink-700">
            รายละเอียด Order #{selectedOrderId}
          </span>
        </DialogTitle>
        <DialogContent>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-pink-100">
                <tr>
                  <th className="py-2 px-4 border-b text-left">ชื่อสินค้า</th>
                  <th className="py-2 px-4 border-b text-left">ขนาด</th>
                  <th className="py-2 px-4 border-b text-left">รสชาติ</th>
                  <th className="py-2 px-4 border-b text-left">จำนวน</th>
                  <th className="py-2 px-4 border-b text-left">ราคาต่อหน่วย</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((item, idx) => (
                  <tr key={idx} className="hover:bg-pink-50">
                    <td className="py-2 px-4 border-b">{item.name}</td>
                    <td className="py-2 px-4 border-b">{item.size}</td>
                    <td className="py-2 px-4 border-b">{item.taste}</td>
                    <td className="py-2 px-4 border-b">{item.quantity}</td>
                    <td className="py-2 px-4 border-b">{item.unit_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* เพิ่มราคารวม */}
          <div className="text-right mt-4 font-bold text-lg text-pink-700">
            ราคารวม:{" "}
            {orderDetails.reduce(
              (sum, item) =>
                sum + Number(item.unit_price) * Number(item.quantity),
              0
            )}{" "}
            บาท
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded shadow transition"
            onClick={handleCloseDialog}
          >
            ปิด
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DashboardAdminComponent;
