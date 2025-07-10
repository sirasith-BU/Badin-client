import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  createOrders,
  getAllProducts,
} from "../../../services/BadinService.js";

function CartPageComponent({ cart, setCart }) {
  // Form states
  const [customerName, setCustomerName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  // Check Form states
  const [isNameValid, setIsNameValid] = useState(true);
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [isPaymentMethodValid, setIsPaymentMethodValid] = useState(true);
  const [isContactNumberValid, setIsContactNumberValid] = useState(true);

  // Snackbar states
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showCartEmpty, setShowCartEmpty] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const productData = getAllProducts().then((data) => {
      console.log("Product Data:", data);
    });
  }, []);

  const addOrders = async () => {
    try {
      if (cart.length !== 0) {
        // Validate fields
        let valid = true;
        if (customerName.trim() === "") {
          setIsNameValid(false);
          valid = false;
        } else {
          setIsNameValid(true);
        }
        if (address.trim() === "") {
          setIsAddressValid(false);
          valid = false;
        } else {
          setIsAddressValid(true);
        }
        if (paymentMethod.trim() === "") {
          setIsPaymentMethodValid(false);
          valid = false;
        } else {
          setIsPaymentMethodValid(true);
        }
        if (contactNumber.trim() === "") {
          setIsContactNumberValid(false);
          valid = false;
        } else {
          setIsContactNumberValid(true);
        }

        if (!valid) return; // ถ้ามีฟิลด์ไหนไม่ถูกต้อง ให้หยุด

        const response = await createOrders({
          name: customerName,
          description: description,
          address: address,
          paymentMethod: paymentMethod,
          contactNumber: contactNumber,
          products: cart.map((item) => ({
            productName: item.name,
            quantity: item.count || 0,
          })),
        });
        if (response.status === 201) {
          setShowSuccess(true);
          setTimeout(() => {
            setCart([]);
            navigate("/");
            setShowSuccess(false);
          }, 3000);
        }
      } else {
        setShowCartEmpty(true);
        setTimeout(() => {
          setShowCartEmpty(false);
        }, 3000);
      }
    } catch (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  // Increase item count
  const handleIncrease = (idx) => {
    setCart(
      cart.map((item, i) =>
        i === idx ? { ...item, count: (item.count || 1) + 1 } : item
      )
    );
  };

  // Decrease item count
  const handleDecrease = (idx) => {
    setCart(
      cart.flatMap((item, i) => {
        if (i !== idx) return item;
        const newCount = (item.count || 1) - 1;
        return newCount > 0 ? { ...item, count: newCount } : [];
      })
    );
  };

  // Delete item
  const handleDelete = (idx) => {
    setCart(cart.filter((_, i) => i !== idx));
  };

  // Calculate total price (if price is number)
  const getTotal = () => {
    return cart.reduce((sum, item) => {
      const price = parseFloat(item.price);
      return sum + (isNaN(price) ? 0 : price * (item.count || 1));
    }, 0);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-5xl font-bold mb-6">ตะกร้าสินค้า</h2>
      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={5000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={() => setShowSuccess(false)}
          sx={{ width: "100%" }}
        >
          สั่งซื้อสำเร็จ! ขอบคุณที่ใช้บริการ.
        </MuiAlert>
      </Snackbar>
      {/* Error Snackbar */}
      <Snackbar
        open={showError}
        autoHideDuration={5000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
          onClose={() => setShowError(false)}
          sx={{ width: "100%" }}
        >
          เกิดข้อผิดพลาดในการสั่งซื้อ กรุณาลองอีกครั้งในภายหลัง.
        </MuiAlert>
      </Snackbar>
      {/* Cart Empty Snackbar */}
      <Snackbar
        open={showCartEmpty}
        autoHideDuration={5000}
        onClose={() => setShowCartEmpty(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="warning"
          onClose={() => setShowCartEmpty(false)}
          sx={{ width: "100%" }}
        >
          ตะกร้าสินค้าไม่มีสินค้า กรุณาเพิ่มสินค้าก่อนสั่งซื้อ.
        </MuiAlert>
      </Snackbar>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Cart Section */}
        <div className="flex-1">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-xl">ไม่มีสินค้าในตะกร้า</p>
          ) : (
            <>
              <ul className="divide-y">
                {cart.map((item, idx) => (
                  <li
                    key={idx}
                    className="py-4 flex justify-between items-center md:text-2xl"
                  >
                    <span>{item.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        className="px-2 py-1 bg-pink-200 rounded"
                        onClick={() => handleDecrease(idx)}
                      >
                        -
                      </button>
                      <span>{item.count || 1}</span>
                      <button
                        className="px-2 py-1 bg-pink-200 rounded"
                        onClick={() => handleIncrease(idx)}
                      >
                        +
                      </button>
                    </div>
                    <span className="text-pink-600">
                      {parseFloat(item.price) * (item.count || 1)} บาท
                    </span>
                    <button
                      className="ml-2 px-2 py-1 bg-red-400 text-white rounded"
                      onClick={() => handleDelete(idx)}
                    >
                      ลบ
                    </button>
                  </li>
                ))}
              </ul>
              <div className="text-center text-4xl font-bold mt-6 text-3xl md:text-right">
                รวมทั้งหมด:{" "}
                <span className="text-pink-600">{getTotal()} บาท</span>
              </div>
            </>
          )}
        </div>
        {/* Form Section */}
        <div className="w-full md:w-96 bg-gray-50 rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold mb-4">ข้อมูลผู้สั่งซื้อ</h3>
          <form className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">ชื่อ</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="ชื่อ"
                onChange={(event) => {
                  setCustomerName(event.target.value);
                }}
              />
              {!isNameValid && (
                <small className="text-red-500 text-sm"> กรุณากรอกชื่อ</small>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">รายละเอียด</label>
              <textarea
                className="w-full border rounded px-3 py-2"
                rows={2}
                placeholder="รายละเอียดเพิ่มเติม"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">ที่อยู่</label>
              <textarea
                className="w-full border rounded px-3 py-2"
                rows={2}
                placeholder="ที่อยู่สำหรับจัดส่ง"
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              />
              {!isAddressValid && (
                <small className="text-red-500 text-sm">กรุณากรอกที่อยู่</small>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">การชำระเงิน</label>
              <FormControl fullWidth>
                <InputLabel id="payment-method-label">
                  เลือกวิธีชำระเงิน
                </InputLabel>
                <Select
                  labelId="payment-method-label"
                  value={paymentMethod}
                  label="เลือกวิธีชำระเงิน"
                  onChange={(event) => setPaymentMethod(event.target.value)}
                >
                  <MenuItem value="เก็บเงินปลายทาง">เก็บเงินปลายทาง</MenuItem>
                  <MenuItem value="พร้อมเพย์">PromptPay</MenuItem>
                </Select>
              </FormControl>
              {paymentMethod === "พร้อมเพย์" && (
                <div className="mt-4 flex flex-col items-center">
                  <img
                    src="/images/promptpay-qr.png" // เปลี่ยน path ตามไฟล์จริง
                    alt="PromptPay QR"
                    className="w-48 h-48 object-contain border rounded"
                  />
                  <span className="mt-2 text-gray-600">
                    โปรดสแกนเพื่อชำระเงินผ่าน PromptPay
                  </span>
                </div>
              )}
              {!isPaymentMethodValid && (
                <small className="text-red-500 text-sm">
                  กรุณาเลือกวิธีชำระเงิน
                </small>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">เบอร์โทรติดต่อ</label>
              <input
                type="tel"
                className="w-full border rounded px-3 py-2"
                placeholder="เบอร์โทรศัพท์"
                onChange={(event) => {
                  setContactNumber(event.target.value);
                }}
              />
              {!isContactNumberValid && (
                <small className="text-red-500 text-sm">
                  กรุณากรอกเบอร์โทรติดต่อ
                </small>
              )}
            </div>
            <Button
              variant="contained"
              startIcon={<SendRoundedIcon />}
              type="submit"
              className="w-full bg-pink-500 text-white py-2 rounded font-bold mt-4"
              onClick={(event) => {
                event.preventDefault();
                addOrders();
              }}
            >
              ยืนยันการสั่งซื้อ
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CartPageComponent;
