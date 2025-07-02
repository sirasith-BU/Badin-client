import { useState } from "react";
import "./landingpage.css";

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="w-full h-full bg-pink-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-pink-600 uppercase md:text-6xl">
            Badin By Dah
          </h1>
          {/* Desktop Nav */}
          <nav className="space-x-6 hidden md:flex text-lg xl:text-xl">
            <a href="#products">บดิน</a>
            {/* <a href="#">สั่งขนม</a> */}
            <a href="#contact">ติดต่อ</a>
          </nav>
          {/* Hamburger Icon */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8"
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
        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="md:hidden bg-white px-4 pb-4 pt-2 shadow space-y-2 flex flex-col transition-all duration-600 text-xl">
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
        <h2 className="text-4xl font-bold mb-4">พายบดิน บายดะห์</h2>
        <p className="text-lg">
          ขนมอบ รูปเรือ หรือลูกค้าส่วนใหญ่จะเรียกว่า "พายเรือ"
        </p>
        <p className="text-lg mb-6">
          รสชาติคล้ายบั้ตเตอร์เค้ก จะมีหลากหลายรสชาติ เช่น รสนม โกโก้ กาแฟ
          ชาเขียว
        </p>
        <a
          href="#products"
          className="inline-block bg-pink-500 text-white px-6 py-3 rounded-full shadow hover:bg-pink-600 transition"
        >
          ดูสินค้าทั้งหมด
        </a>
      </section>

      {/* Product Preview */}
      <section id="products" className="py-16 max-w-6xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-10 title">
          บดินทั้งหมด
        </h3>
        <div className="grid gap-8 grid-cols-2 md:grid-cols-3">
          {[
            {
              name: "บดิน ถาดใหญ่",
              image: "pictures/เหลี่ยมใหญ่.jpg",
              price: "180 บาท",
            },
            {
              name: "บดิน ถาดกลาง",
              image: "pictures/เหลี่ยมกลาง.jpg",
              price: "60 บาท",
            },
            {
              name: "บดิน ถาดเล็ก",
              image: "pictures/เหลี่ยมเล็ก.jpg",
              price: "40 บาท",
            },
            { name: "บดิน ถ้วย", image: "pictures/กลม.jpg", price: "20 บาท" },
            {
              name: "พายเรือ รสนม🥛",
              image: "pictures/เรือนม.jpg",
              price: "20 บาท",
              bgcolor: "#fffaf6",
              nameColor: "black",
              priceColor: "#e60076",
            },
            {
              name: "พายเรือ รสกาแฟ☕",
              image: "pictures/เรือกาแฟ.jpg",
              price: "20 บาท",
              bgcolor: "#523a28",
              nameColor: "white",
              priceColor: "#e60076",
            },
            {
              name: "พายเรือ รสโกโก้🍫",
              image: "pictures/เรือโกโก้.jpg",
              price: "20 บาท",
              bgcolor: "#a47551",
              nameColor: "white",
              priceColor: "black",
            },
            {
              name: "พายเรือ รสชาเขียว🍵",
              image: "pictures/เรือชาเขียว.jpg",
              price: "20 บาท",
              bgcolor: "#8ba888",
              nameColor: "white",
              priceColor: "black",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition"
              style={{ backgroundColor: item.bgcolor || "#fce7f3" }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p
                className="text-xl font-semibold md:text-3xl"
                style={{ color: item.nameColor || "black" }}
              >
                {item.name}
              </p>
              <p
                className="text-xl font-bold md:text-2xl"
                style={{ color: item.priceColor || "#e60076" }}
              >
                {item.price}
              </p>
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
                โปรไฟล์เฟสบุ๊ค(ติดต่อโดยตรง):{" "}
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

export default LandingPage;
