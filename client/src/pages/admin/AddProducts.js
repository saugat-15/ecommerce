import React, { useState } from "react";
import Nav from "../../components/Nav";
import { useFormik } from "formik";
import { message } from "antd";
// import 'antd/dist/antd.min.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AddProducts(props) {
  const { product } = useSelector((state) => state.product);
  const navigate = useNavigate();
  console.log(props.selectedItem);
  console.log(product);

  const initialValues = {
    productName: "",
    productType: "",
    price: "",
    description: "",
    id: "",
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
            console.log("**************");
            console.log(values);
            const formData = new FormData();
            if (productImage) {
              formData.append("image", productImage);
            }
            formData.append("productName", values.productName);
            formData.append("productType", values.productType);
            formData.append("price", values.price);
            formData.append("description", values.description);
            if (props.flag) {
              formData.append("id", product._id);
            }

            let requestOptions;

            if (props.flag) {
              if (productImage) {
                requestOptions = {
                  method: "PUT",
                  // headers: { "Content-Type": "multipart/form-data" },
                  body: formData,
                };
              } else {
                requestOptions = {
                  method: "PUT",
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    // productImage: formData,
                    productName: values.productName,
                    price: values.price,
                    productType: values.productType,

                    description: values.description,
                    _id: product._id,
                  }),
                };
              }
            } else {
              requestOptions = {
                method: "POST",
                // headers: { "Content-Type": "multipart/form-data" },
                body: formData,
              };
            }
            console.log(requestOptions);
            console.log("---------------->>>");

            const response = await fetch(
              "http://localhost:4000/products",
              requestOptions
            );

            const data = await response.json();

            if (data) {
              console.log(data);
              message.success(data.message);
              // action.resetForm();
              // props?.fetchData()
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
            <label htmlFor="decription">Product Description</label>
            <Field
              id="description"
              name="description"
              placeholder="Product Decription"
              type="text"
            />
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
