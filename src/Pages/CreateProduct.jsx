import React, { useState, useEffect } from "react";
import api from "../api/axiosinstance";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateProduct = () => {
  const [listData, setListData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  // console.log(listData);
  const listCategory = async () => {
    const res = await api.get("/api/v1/categories/");
    setListData(res?.data);
    // console.log(res.data);
  };

  useEffect(() => {
    listCategory();
  }, []);

  const validations = Yup.object({
    name: Yup.string().required("required"),
    description: Yup.string().required("required"),
    stock: Yup.number().required("required"),
    price: Yup.number().required("required"),
    images: Yup.array().min(1, "at least one img is required"),
    category_id: Yup.string().required("required"),
  });

  const createProduct = async (values) => {
    console.log("values:", values);
    const formatData = new FormData();
    formatData.append("name", values.name);
    formatData.append("description", values.description);
    formatData.append("stock", values.stock);
    formatData.append("price", values.price);
    formatData.append("image", values.images);
    // values.image.forEach((file) => formatData.append("image", file));

    formatData.append("category_id", values.category_id);
    const res = await api.post("/api/v1/products/seller", formatData);
    console.log(res);
    setShowPopup(false); // close on success
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      stock: "",
      price: "",
      images: [],
      category_id: "",
    },
    validationSchema: validations,
    onSubmit: createProduct,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <div>
      {/* Open Popup Button */}
      <button
        className="px-4 py-2 bg-gray-800 text-white rounded"
        onClick={() => setShowPopup(true)}
      >
        ➕ Create Product
      </button>

      {/* Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-white p-8 rounded-xl shadow-xl w-[400px] animate-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold mb-4">Create Product</h2>

            <form
              className="flex flex-col gap-6"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-col">
                <label className="font-medium">Product Title</label>
                <input
                  name="name"
                  className="border-b"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-600">{formik.errors.name}</div>
                )}
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Description</label>
                <input
                  name="description"
                  className="border-b"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="text-red-600">
                    {formik.errors.description}
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Stock</label>
                <input
                  type="number"
                  name="stock"
                  className="border-b"
                  value={formik.values.stock}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.stock && formik.errors.stock && (
                  <div className="text-red-600">{formik.errors.stock}</div>
                )}
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  className="border-b"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.price && formik.errors.price && (
                  <div className="text-red-600">{formik.errors.price}</div>
                )}
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Images</label>
                <input
                  type="file"
                  name="images"
                  className="border-b"
                  onChange={(e) => {
                    formik.setFieldValue("images", Array.from(e.target.files));
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.images && formik.errors.images && (
                  <div className="text-red-600">{formik.errors.images}</div>
                )}
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Category</label>
                <select
                  name="category_id"
                  className="border p-2 mt-4"
                  value={formik.values.category_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option>Select category</option>
                  {listData &&
                    listData.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                </select>
                {formik.touched.category_id && formik.errors.category_id && (
                  <div className="text-red-600">
                    {formik.errors.category_id}
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-600 text-white rounded"
                >
                  Add
                </button>
              </div>
            </form>
          </div>

          <style>{`
            @keyframes popup {
              0% { opacity: 0; transform: scale(0.7); }
              100% { opacity: 1; transform: scale(1); }
            }
            .animate-popup {
              animation: popup 0.3s ease-out forwards;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default CreateProduct;
