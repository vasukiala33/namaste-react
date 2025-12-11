import React, { useState } from "react";
import api from "../api/axiosinstance";

const CreateCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const [inputcategory, setInputCategory] = useState({ name: "" });

  const handleCategoryData = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/v1/categories/create-categories", {
        name: inputcategory.name,
      });

      if (res.status === 201) {
        alert("Category created");
      }

      setInputCategory({ name: "" });
      setShowModal(false);
    } catch (err) {
      alert(err?.response?.data?.detail || "Failed to create");
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Centered Add Button */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition"
      >
        ➕ Add Category
      </button>

      {/* Modal Background Overlay */}
      {showModal && (
        <div
          className="fixed inset-0 bg-gray-300 transition-opacity duration-200  ease-in-out bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setShowModal(false)}
        >
          {/* Modal Box */}
          <div
            className="bg-white p-6 rounded-xl shadow-lg w-80"
            onClick={(e) => e.stopPropagation()} // prevent closing on inner click
          >
            <h2 className="text-xl font-semibold text-center mb-4">
              Create Category
            </h2>

            {/* Input */}
            <input
              type="text"
              className="border px-3 py-2 rounded w-full mb-4 outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter category name"
              value={inputcategory.name}
              onChange={(e) =>
                setInputCategory({ ...inputcategory, name: e.target.value })
              }
            />

            {/* Buttons */}
            <div className="flex justify-between gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="w-1/2 bg-gray-300 px-3 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={handleCategoryData}
                className="w-1/2 bg-gray-600 text-white px-3 py-2 rounded hover:bg-gray-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCategory;
