import React, { useContext, useEffect, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const Login = () => {
  let { userLogin, setuserLogin } = useContext(UserContext);
  let [errMsg, seterrMsg] = useState(null);
  let [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();
  function submitForm(val) {
    setisLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", val)
      .then(({ data }) => {
        setisLoading(false);
        console.log(data?.token);

        if (data.message == "success") {
          localStorage.setItem("userToken", data.token);
          setuserLogin(data.token);
          navigate("/");
        }
      })
      .catch((error) => {
        setisLoading(false);
        console.log(error?.response?.data?.message);
        seterrMsg(error?.response?.data?.message);
      });
  }
  let validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(3, "Password must be at least 3 characters")
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{4,10}$/,
        "must be start with capital letter and lowercase letters and numbers"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitForm,
  });
  useEffect(() => {}, []);

  return (
    <>
      <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-white shadow-md rounded-md p-6">
            <img
              className="mx-auto h-12 w-auto"
              src="https://www.svgrepo.com/show/499664/user-happy.svg"
              alt="user icon"
            />
            <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-green-700">
              Login Now
            </h2>
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-6"
              method="POST"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>

              {formik.errors.email && formik.touched.email ? (
                <div className="bg-red-200 px-6 py-4 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg">
                  <svg
                    viewBox="0 0 24 24"
                    className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                  >
                    <path
                      fill="currentColor"
                      d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
                    />
                  </svg>
                  <span className="text-red-800">{formik.errors.email}</span>
                </div>
              ) : null}

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>

              {formik.errors.password && formik.touched.password ? (
                <div className="bg-red-200 px-6 py-4 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg">
                  <svg
                    viewBox="0 0 24 24"
                    className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                  >
                    <path
                      fill="currentColor"
                      d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
                    />
                  </svg>
                  <span className="text-red-800">{formik.errors.password}</span>
                </div>
              ) : null}

              <div>
                <button
                  type="submit"
                  className="flex cursor-pointer w-full justify-center rounded-md border border-transparent bg-green-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                >
                  {isLoading ? (
                    <i className="fas fa-spinner fa-spin "></i>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>

              {/* error alert */}
              {errMsg ? (
                <div className="bg-red-200 px-6 py-4 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg">
                  <svg
                    viewBox="0 0 24 24"
                    className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
                  >
                    <path
                      fill="currentColor"
                      d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
                    />
                  </svg>
                  <span className="text-red-800">{errMsg}</span>
                </div>
              ) : null}

              <div>
                <Link to="/forgetPassword">Forget Password ?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
