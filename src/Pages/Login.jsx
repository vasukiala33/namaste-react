import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BGLOGIN_URL } from "../utils/constants";

const Login = () => {
  const [toggleLogin, setToggleLogin] = useState(true);

  const validations = Yup.object({
    name: Yup.lazy(() =>
      !toggleLogin
        ? Yup.string().required("name is required")
        : Yup.string().notRequired()
    ),
    email: Yup.string()
      .required("mail id is required")
      .email("please enter valid mail id"),
    password: Yup.string()
      .required("password is required")
      .min(6, "min 6 characters")
      .max(10, "max 10 characters"),
  });

  const initialValues = toggleLogin
    ? { email: "", password: "" }
    : { name: "", email: "", password: "" };

  const formik = useFormik({
    initialValues,
    validationSchema: validations,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      formik.resetForm();
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  const handleSignup = () => {
    setToggleLogin(!toggleLogin);
  };

  return (
    <div
      className="w-screen h-screen flex justify-center items-center  bg-gray-50 bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${BGLOGIN_URL})` }}
    >
      <div className="border w-1/3 rounded-3xl px-12 py-15 bg-gray-100 shadow-lg backdrop-blur-sm ">
        <h1 className="text-2xl mb-10 text-center font-semibold ">
          {!toggleLogin ? "Please Sign Up" : "Please Sign In"}
        </h1>
        <form
          className="flex flex-col w-full gap-4 max-w-sm mx-auto"
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          {!toggleLogin && (
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
          )}
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
            {!toggleLogin ? "Sign Up" : "Sign In"}
          </button>
          <p>
            {toggleLogin ? "New user ?" : "already have a account?"}
            <span onClick={handleSignup} className="cursor-pointer">
              {toggleLogin ? "Sign Up" : "Sign In"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
