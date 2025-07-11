import { useState, useEffect, use } from "react";
import "./landingpage.css";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../../services/BadinService";

function LandingPageComponent({ cart, setCart }) {
  const InitBadins = [
    {
      name: "บดินถาด",
      size: "ใหญ่",
      image: "pictures/เหลี่ยมใหญ่.jpg",
      price: "180",
    },
    {
      name: "บดินถาด",
      size: "กลาง",
      image: "pictures/เหลี่ยมกลาง.jpg",
      price: "60",
    },
    {
      name: "บดินถาด",
      size: "เล็ก",
      image: "pictures/เหลี่ยมเล็ก.jpg",
      price: "40",
    },
    { name: "บดิน ถ้วย", image: "pictures/กลม.jpg", price: "20" },
    {
      name: "พายเรือ รสนม",
      image: "pictures/เรือนม.jpg",
      price: "20",
      bgcolor: "#fffaf6",
      nameColor: "black",
      priceColor: "#e60076",
    },
    {
      name: "พายเรือ รสกาแฟ",
      image: "pictures/เรือกาแฟ.jpg",
      price: "20",
      bgcolor: "#523a28",
      nameColor: "white",
      priceColor: "#e60076",
    },
    {
      name: "พายเรือ รสโกโก้",
      image: "pictures/เรือโกโก้.jpg",
      price: "20",
      bgcolor: "#a47551",
      nameColor: "white",
      priceColor: "black",
    },
    {
      name: "พายเรือ รสชาเขียว",
      image: "pictures/เรือชาเขียว.jpg",
      price: "20",
      bgcolor: "#8ba888",
      nameColor: "white",
      priceColor: "black",
    },
  ];
  const [menuOpen, setMenuOpen] = useState(false);
  const [Badins, setBadins] = useState([]);

  useEffect(() => {
    getAllProducts().then((data) => {
      const products = data || InitBadins;

      const updatedBadins = products.map((item) => {
        if (item.taste === "นม") {
          return {
            ...item,
            bgcolor: "#fffaf6",
            nameColor: "black",
            priceColor: "#e60076",
          };
        }
        if (item.taste === "กาแฟ") {
          return {
            ...item,
            bgcolor: "#523a28",
            nameColor: "white",
            priceColor: "#e60076",
          };
        }
        if (item.taste === "โกโก้") {
          return {
            ...item,
            bgcolor: "#a47551",
            nameColor: "white",
            priceColor: "black",
          };
        }
        if (item.taste === "ชาเขียว") {
          return {
            ...item,
            bgcolor: "#8ba888",
            nameColor: "white",
            priceColor: "black",
          };
        }
        return item;
      });

      setBadins(updatedBadins);
    });
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleAddToCart = (item) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (i) =>
          i.name === item.name && i.size === item.size && i.taste === item.taste
      );
      if (idx !== -1) {
        // Increase quantity
        return prev.map((i, j) =>
          j === idx ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
      }
      // Add new item with quantity 1
      return [...prev, { ...item, quantity: 1 }];
    });
  };
  return (
    <div className="w-full h-full bg-pink-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="text-3xl font-bold text-pink-600 md:text-6xl">
            Pie Badin ByDah
          </a>
          {/* Desktop Nav */}
          <nav className="space-x-6 hidden md:flex">
            <a href="#products" className="text-2xl">
              บดิน
            </a>
            <a href="#contact" className="text-2xl">
              ติดต่อ
            </a>
            {/* 3. Cart icon with count */}
            {/* Cart icon with count */}
            <Link to="/cart" className="relative ml-4">
              <svg
                className="w-8 h-8 inline"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full px-2 text-xs">
                  {cart.length}
                </span>
              )}
            </Link>
          </nav>
          {/* Mobile Nav */}
          <div className="flex gap-2 md:hidden">
            <Link to="/cart" className="relative ml-4">
              <svg
                className="w-8 h-8 inline"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full px-2 text-xs">
                  {cart.length}
                </span>
              )}
            </Link>
            {/* Hamburger Icon */}
            <button
              className="flex flex-col justify-center items-center w-8 h-8"
              onClick={toggleMenu}
              aria-label="Open menu"
            >
              <span
                className={`block h-1 w-6 bg-pink-600 rounded transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block h-1 w-6 bg-pink-600 rounded my-1 transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block h-1 w-6 bg-pink-600 rounded transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden bg-white px-4 pb-4 pt-2 shadow space-y-2 flex flex-col transition-all duration-600 text-2xl">
            <a href="#products" onClick={() => setMenuOpen(false)}>
              บดิน
            </a>
            {/* <a href="#about" onClick={() => setMenuOpen(false)}>
              เกี่ยวกับเรา
            </a> */}
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              ติดต่อ
            </a>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-pink-100 py-20 text-center">
        <h2 className="text-5xl font-bold mb-4">พายบดิน บายดะห์</h2>
        <div className="text-xl mx-4 md:mx-0">
          <p>ขนมอบ รูปเรือ หรือลูกค้าส่วนใหญ่จะเรียกว่า "พายเรือ"⛵</p>
          <p className="mb-6">
            รสชาติคล้ายบั้ตเตอร์เค้ก🍰 จะมีหลากหลายรสชาติ เช่น รสนม🥛 กาแฟ☕
            โกโก้🍫 ชาเขียว🍵
          </p>
        </div>
        <a
          href="#products"
          className="text-xl inline-block bg-pink-500 text-white px-6 py-3 rounded-full shadow hover:bg-pink-600 transition"
        >
          ดูสินค้าทั้งหมด
        </a>
      </section>

      {/* Product Preview */}
      <section id="products" className="py-16 max-w-6xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-10 title">บดิน</h3>
        <div className="grid gap-3 grid-cols-2 md:grid-cols-3 md:gap-8">
          {Badins.map((item, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition"
              style={{ backgroundColor: item.bgcolor || "#fce7f3" }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p
                className="text-xl font-semibold md:text-3xl"
                style={{ color: item.nameColor || "black" }}
              >
                {item.name} {item.size} {item.taste}
              </p>
              <p
                className="text-xl font-bold md:text-2xl"
                style={{ color: item.priceColor || "#e60076" }}
              >
                {item.price} บาท
              </p>
              <div className="flex flex-col items-center w-full md:flex-row justify-between">
                {/* 2. Add to cart button */}
                <button
                  className="text-xl mt-4 bg-pink-500 text-white px-4 py-2 rounded-full shadow hover:bg-pink-600 transition w-full md:w-auto"
                  onClick={() => handleAddToCart(item)}
                >
                  ใส่ตะกร้า
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      {/* <section id="about" className="bg-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold mb-4">เราใส่ใจในทุกคำ</h3>
          <p className="text-gray-600">
            SweetShop
            คือร้านขนมโฮมเมดที่เน้นวัตถุดิบคุณภาพและความใส่ใจในทุกขั้นตอนของการทำขนม
            เพราะเราเชื่อว่าทุกคำที่คุณกิน ควรเต็มไปด้วยความสุข
          </p>
        </div>
      </section> */}

      {/* Contact */}
      <section id="contact" className="bg-pink-100 py-16 px-4 text-center">
        <h3 className="text-3xl font-bold mb-6 title">ติดต่อเรา</h3>
        <div className="md:flex justify-center">
          {/* Map Embed */}
          <div className="flex justify-center mt-8 px-4">
            <div className="w-full max-w-3xl aspect-video rounded-lg shadow overflow-hidden">
              <iframe
                title="ร้านขนม BadinByDah"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.919474827317!2d100.4873018!3d13.723324900000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2990fb655b9e7%3A0xf26296645da08d47!2z4Lie4Liy4Lii4Lia4LiU4Li04LiZIOC4muC4suC4ouC4lOC4sOC4q-C5jA!5e0!3m2!1sen!2sth!4v1751458956797!5m2!1sen!2sth"
                width={"900"}
                height={"900"}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          {/* Details */}
          <div className="flex justify-center items-center px-4">
            <div className="text-xl flex flex-col items-start mt-8 space-y-4 text-start">
              <p className="text-gray-700">
                พิกัดร้าน:{" "}
                <a
                  className="text-pink-600 underline"
                  href="https://maps.app.goo.gl/DzssT5Vmggh9jEGb8"
                  target="_blank"
                >
                  383 ริมทางรถไฟวงเวียนใหญ่ แขวงบางยี่เรือ เขตธนบุรี
                  กรุงเทพมหานคร 10600
                </a>
              </p>
              <p className="text-gray-700">
                เพจเฟสบุ๊ค:{" "}
                <a
                  className="text-pink-600 underline"
                  href="https://www.facebook.com/share/16YTyNzETN/"
                  target="_blank"
                >
                  พายบดิน บายดะห์
                </a>
              </p>
              <p className="text-gray-700">
                เฟสบุ๊ค(ติดต่อโดยตรง):{" "}
                <a
                  className="text-pink-600 underline"
                  href="https://www.facebook.com/share/14KnZozyZk6/"
                  target="_blank"
                >
                  พายบดิน บายดะห์
                </a>
              </p>
              <p className="text-gray-700">
                ไอดีไลน์:{" "}
                <a href="https://line.me/ti/p/PjU4nAsiSc" target="_blank">
                  <span className="text-pink-600 underline">@badinbydah</span>
                </a>
              </p>
              <p className="text-gray-700">
                เบอร์โทรศัพท์:{" "}
                <a href="tel:0934286919">
                  <span className="text-pink-600 underline">093-428-6919</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} BadinByDah. All rights reserved.
      </footer>
    </div>
  );
}

export default LandingPageComponent;
