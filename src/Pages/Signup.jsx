import React, { useState } from "react";
import { BGLOGIN_URL, API_URL } from "../utils/constants";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import axios from "axios";
import Alert from "../utils/alert";

const Signup = () => {
  const [alertMessage, setAlerMessage] = useState("");
  const navigate = useNavigate();
  const validations = Yup.object({
    name: Yup.string().required("please enter the name"),
    email: Yup.string()
      .required("mail id required")
      .email('"please enter valid mail id'),
    password: Yup.string()
      .required("password is required")
      .min(6, "min 6 character")
      .max(10, "min 10 character"),
  });

  const signUpData = async (values) => {
    try {
      const res = await axios.post(`${API_URL}/api/v1/auth/signup`, values);
      if (res.status === 201) {
        formik.resetForm();
        setAlerMessage("Created Succesfully");
      }
    } catch (error) {
      console.log("error", error);
      setAlerMessage("failed to create");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validations,
    onSubmit: signUpData,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  const handleSignup = () => {
    navigate("/login");
  };
  return (
    <div
      className="w-screen h-screen flex justify-center items-center  bg-gray-50 bg-center bg-cover bg-no-repeat relative"
      style={{ backgroundImage: `url(${BGLOGIN_URL})` }}
    >
      <div className="border w-1/3 rounded-3xl px-12 py-15 bg-gray-100 shadow-lg backdrop-blur-sm ">
        <h1 className="text-2xl mb-10 text-center font-semibold ">
          Please Sign Up
        </h1>
        <form
          className="flex flex-col w-full gap-4 max-w-sm mx-auto"
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col gap-1">
            <label className="text-lg font-medium">Name</label>
            <input
              type="name"
              name="name"
              className="border rounded w-full p-1.5"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-700">{formik.errors.name}</div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="border rounded w-full p-1.5"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-600">{formik.errors.email}</div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="border rounded w-full p-1.5"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-600">{formik.errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="border cursor-pointer rounded-2xl bg-green-800 w-full  text-white py-1.5 text-lg mt-4  hover:bg-green-900 hover:scale-104 transition-all duration-900 ease-in-out"
          >
            Sign Up
          </button>
          <p>
            already have a account?
            <span onClick={handleSignup} className="cursor-pointer">
              Sign In
            </span>
          </p>
        </form>
      </div>
      {alertMessage && (
        <Alert message={alertMessage} onClose={() => setAlerMessage("")} />
      )}
    </div>
  );
};

export default Signup;
