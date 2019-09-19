import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const OnboardingForm = ({ values, errors, touched, status }) => {
  const [forms, setForms] = useState([]);
  useEffect(() => {
    if (status) {
      setForms([...forms, status]);
    }
  }, [status]);

  return (
    <div className="onboard-form">
      <Form>
        <Field type="text" name="name" placeholder="Your Name" />
        {touched.name && errors.name && <p className="error">{errors.name}</p>}

        <Field type="text" name="email" placeholder="Your Email" />
        {touched.email && errors.email && (
          <p className="error">{errors.email} </p>
        )}

        <Field type="text" name="password" placeholder="Your Password" />
        {touched.email && errors.email && (
          <p className="error">{errors.password} </p>
        )}

        <label>
          Terms of Service
          <Field type="checkbox" name="terms" checked={values.terms} />
        </label>
        <button>Submit</button>
      </Form>
      {forms.map(form => (
        <ul key={form.name}>
          <li>Email:{form.email}</li>
          <li>Password:{form.password}</li>
        </ul>
      ))}
    </div>
  );
};

//This is the higher order function

const FormikForm = withFormik({
  mapPropsToValues({ name, email, password, terms }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      terms: terms || ""
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("You must enter your full name "),
    email: Yup.string().required("Enter a valid email"),
    password: Yup.string().required("Enter you valid password")
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.res));
  }
})(OnboardingForm);

console.log(" Test higher order function", FormikForm);
export default FormikForm;

// export default Form;
