import React, { useState } from "react";
import Nav from "../../components/Nav";
import { useFormik } from "formik";
import { message } from "antd";
// import 'antd/dist/antd.min.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Navigate, useNavigate } from "react-router-dom";

function AddProducts(props) {
  const navigate = useNavigate();
  console.log(props.flag);

  const initialValues = {
    productName: "",
    productType: "",
    price: "",
    // foodCategory: "",
  };
  const [productImage, setProductImage] = useState("");
  return (
    <>
      {/* <Nav /> */}
      <div>
        <Formik
          initialValues={props?.selectedItem || initialValues}
          enableReinitialize={true}
          onSubmit={async (values, action) => {
            const formData = new FormData();
            formData.append("file", productImage);
            formData.append("productName", values.productName);
            formData.append("productType", values.productType);
            formData.append("price", values.price);

            const requestOptions = {
              method: props.flag ? "PUT" : "POST",
              // headers: { "Content-Type": "application/json" },
              body: formData,
            };

            const response = await fetch(
              "http://localhost:5000/products",
              requestOptions
            );

            const data = await response.json();

            if (data) {
              console.log(data);
              message.success(data.message);
              action.resetForm();

              navigate("/admin");
            }
            // action.resetForm()
          }}
        >
          <Form className="form">
            <label htmlFor="productName">Product Name</label>
            <Field id="productName" name="productName" placeholder="Jane" />

            <label htmlFor="productType">Product Type</label>
            <Field id="productType" name="productType" placeholder="Doe" />

            <label htmlFor="price">Price</label>
            <Field id="price" name="price" placeholder="$450" type="text" />
            <input
              type="file"
              onChange={(e) => setProductImage(e.target.files[0])}
            />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default AddProducts;