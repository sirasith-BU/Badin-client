import { useEffect, useState } from "react";
import {
  getAllOrders,
  getOrder,
  getReceipt,
} from "../../../services/BadinService";
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { updateOrderStatus } from "../../../services/BadinService";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

function AdminOrderComponent() {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Dialog Data
  const [orderDetails, setOrderDetails] = useState([]);
  const [receiptDetails, setReceiptDetails] = useState([]);

  // Open Dialog handle
  const [detailDialog, setDetailDialog] = useState(false);
  const [receiptDialog, setReceiptDialog] = useState(false);

  // const [orderStatus, setOrderStatus] = useState("not_receive");
  // Print
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    getAllOrders().then((res) => {
      setOrders(res);
    });
  };

  // Detail Dialog
  const OpenDetailDialog = async (orderId) => {
    setSelectedOrderId(orderId);
    const orders = await getOrder(orderId);
    setOrderDetails(orders);
    setDetailDialog(true);
  };
  const CloseDetailDialog = () => {
    setDetailDialog(false);
    setOrderDetails([]);
    setSelectedOrderId(null);
  };

  // Receipt Dialog
  const OpenReceiptDialog = async (orderId) => {
    setSelectedOrderId(orderId);
    const result = await getOrder(orderId);
    setOrderDetails(result);
    const reciepts = await getReceipt(orderId);
    setReceiptDetails(reciepts);
    setReceiptDialog(true);
  };
  const CloseReceiptDialog = () => {
    setReceiptDialog(false);
    setReceiptDetails([]);
    setSelectedOrderId(null);
  };

  // const updateStatus = (status, orderId) => {
  //   updateOrderStatus(status, orderId).then((response) => {
  //     console.log("Update order response", response);
  //   });
  // };

  const statusOptions = [
    {
      value: "not_receive",
      text: "ยังไม่รับออเดอร์❌",
    },
    {
      value: "receive",
      text: "รับออเดอร์✅",
    },
    {
      value: "shipping",
      text: "กำลังจัดส่ง..📦",
    },
    {
      value: "billed",
      text: "ชำระเงินแล้ว💸",
    },
  ];

  return (
    <div className="mx-auto px-4">
      <h2 className="text-5xl font-bold mb-4 text-pink-700 text-left uppercase">
        Orders
      </h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-pink-100">
            <tr>
              <th className="py-3 px-4 border-b text-left">Order ID</th>
              <th className="py-3 px-4 border-b text-left">วัน</th>
              <th className="py-3 px-4 border-b text-left">เวลา</th>
              <th className="py-3 px-4 border-b text-left">ชื่อลูกค้า</th>
              <th className="py-3 px-4 border-b text-left">ที่อยู่</th>
              <th className="py-3 px-4 border-b text-left">การชำระเงิน</th>
              <th className="py-3 px-4 border-b text-left">เบอร์โทร</th>
              <th className="py-3 px-4 border-b text-left">ของที่สั่ง</th>
              <th className="py-3 px-4 border-b text-left">สถานะ</th>
              <th className="py-3 px-4 border-b text-left">ใบเสร็จ</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i} className="hover:bg-pink-50">
                <td className="py-2 px-4 border-b">{order.order_id}</td>
                <td className="py-2 px-4 border-b">{order.date}</td>
                <td className="py-2 px-4 border-b">{order.time}</td>
                <td className="py-2 px-4 border-b">{order.customer_name}</td>
                <td className="py-2 px-4 border-b">{order.address}</td>
                <td className="py-2 px-4 border-b">{order.payment}</td>
                <td className="py-2 px-4 border-b">{order.telephone}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-1 rounded shadow transition"
                    onClick={() => OpenDetailDialog(order.order_id)}
                  >
                    ดูรายละเอียด
                  </button>
                </td>
                <td className="py-2 px-4 border-b">
                  <FormControl>
                    <InputLabel id="order-status-label">
                      สถานะออเดอร์
                    </InputLabel>
                    <Select
                      labelId="order-status-label"
                      value={order.status}
                      label="สถานะออเดอร์"
                      // onChange={(event) => setOrderStatus(event.target.value)}
                      onChange={(event) => {
                        updateOrderStatus(
                          event.target.value,
                          order.order_id
                        ).then((response) => {
                          console.log(
                            "Update order response",
                            response.message
                          );
                          fetchOrders();
                        });
                      }}
                    >
                      {statusOptions.map((status) => {
                        return (
                          <MenuItem value={status.value}>
                            {status.text}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-1 rounded shadow transition"
                    onClick={() => OpenReceiptDialog(order.order_id)}
                  >
                    ดูใบเสร็จ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dialog แสดงรายละเอียดออเดอร์ */}
      <Dialog
        open={detailDialog}
        onClose={CloseDetailDialog}
        maxWidth="md"
        fullWidth
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
          <div className="text-right mt-4 font-bold text-2xl text-pink-700">
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
            onClick={CloseDetailDialog}
          >
            ปิด
          </button>
        </DialogActions>
      </Dialog>

      {/* Dialog แสดงรายละเอียดใบเสร็จ */}
      <Dialog
        open={receiptDialog}
        onClose={CloseReceiptDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <div className="flex justify-between">
            <span className="text-2xl font-bold text-pink-700">
              ใบเสร็จ Order #{selectedOrderId}
            </span>
            <Button variant="contained" onClick={reactToPrintFn}>
              ปริ้นใบเสร็จ
            </Button>
          </div>
        </DialogTitle>
        <DialogContent>
          <div ref={contentRef}>
            <div className="overflow-x-auto">
              <div className="flex flex-col gap-2 mt-2 text-center">
                <hr></hr>
                <h1 className="text-3xl font-bold ">พายบดิน บายดะห์</h1>
                <p className="text-sm">
                  383 ริมทางรถไฟวงเวียนใหญ่ แขวงบางยี่เรือ เขตธนบุรี
                  กรุงเทพมหานคร 10600
                </p>
                <hr></hr>
              </div>
              {receiptDetails.map((reciept, i) => {
                return (
                  <ul key={i} className="text-md my-2 p-2">
                    <li>ชื่อลูกค้า: {reciept.customer_name}</li>
                    <li>ที่อยู่สำหรับจัดส่ง: {reciept.address}</li>
                    <li>เบอร์โทรติดต่อ: {reciept.telephone}</li>
                  </ul>
                );
              })}
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-pink-100">
                  <tr>
                    <th className="py-2 px-4 border-b text-left">ชื่อสินค้า</th>
                    <th className="py-2 px-4 border-b text-left">ขนาด</th>
                    <th className="py-2 px-4 border-b text-left">รสชาติ</th>
                    <th className="py-2 px-4 border-b text-left">จำนวน</th>
                    <th className="py-2 px-4 border-b text-left">
                      ราคาต่อหน่วย
                    </th>
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
            <div className="m-2">
              <div className="text-right text-2xl">
                ราคารวม:{" "}
                {orderDetails.reduce(
                  (sum, item) =>
                    sum + Number(item.unit_price) * Number(item.quantity),
                  0
                )}{" "}
                บาท
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded shadow transition"
            onClick={CloseReceiptDialog}
          >
            ปิด
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminOrderComponent;
