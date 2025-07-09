import { useState } from "react";
import { useNavigate } from "react-router-dom"; // เปลี่ยนตรงนี้

function CartPageComponent({ cart, setCart }) {
  const [customerName, setCustomerName] = useState("ไม่มีชื่อ");
  const [description, setDescription] = useState("ไม่มีรายละเอียด");
  const [address, setAddress] = useState("ไม่มีที่อยู่");
  const [paymentMethod, setPaymentMethod] = useState("ไม่มีการชำระเงิน");
  const [contactNumber, setContactNumber] = useState("ไม่มีเบอร์โทร");

  const navigate = useNavigate(); // เพิ่มตรงนี้

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
            </div>
            <div>
              <label className="block mb-1 font-medium">การชำระเงิน</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                placeholder="เช่น โอนเงิน/เก็บเงินปลายทาง"
                onChange={(event) => {
                  setPaymentMethod(event.target.value);
                }}
              />
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
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 rounded font-bold mt-4"
              onClick={(event) => {
                event.preventDefault();

                console.log("Order submitted:", {
                  customerName,
                  description,
                  address,
                  paymentMethod,
                  contactNumber,
                  cart,
                });
                alert("สั่งซื้อสำเร็จ! ขอบคุณที่ใช้บริการ");
                setCart([]);

                navigate("/");
              }}
            >
              ยืนยันการสั่งซื้อ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CartPageComponent;
