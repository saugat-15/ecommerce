import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { updateUsers } from "../../reducersSlice/userSlice";
const Basic = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = async (values) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    };

    const response = await fetch("http://localhost:5000/login", requestOptions);
    const data = await response.json();

    if (data) {
      console.log(data);
      data.detail.token = data.token;
      dispatch(updateUsers(data.detail));
      if (data.detail.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    }
  };
  return (
    <div className="form">
      <h1>Login!</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          userLogin(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form style={{ margin: "1rem auto" }}>
            <label>Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <label>Password</label>

            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <span>
              Don't have an account? <Link to="/register">SignUp</Link>
            </span>

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Basic;
