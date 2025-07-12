import { useState } from "react";
import AdminOrderComponent from "./order";
import AdminDashboardComponent from "./dashboard";

function AdminMainPageComponent() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="w-full min-h-screen bg-pink-50 text-gray-800">
      <nav className="flex gap-4 p-6 bg-white shadow rounded-b-lg">
        <button
          className={`px-4 py-2 rounded font-semibold transition ${
            page === "dashboard"
              ? "bg-pink-500 text-white"
              : "bg-pink-100 hover:bg-pink-200"
          }`}
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold transition ${
            page === "order"
              ? "bg-pink-500 text-white"
              : "bg-pink-100 hover:bg-pink-200"
          }`}
          onClick={() => setPage("order")}
        >
          Orders
        </button>
      </nav>
      <div className="p-4">
        {page === "dashboard" && <AdminDashboardComponent />}
        {page === "order" && <AdminOrderComponent />}
      </div>
    </div>
  );
}

export default AdminMainPageComponent;
