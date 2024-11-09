import { Formik } from "formik";
import React from "react";

interface FromDataProps {
  onSubmit: (data: object) => void;
  initialValues?: object;
  children: React.ReactNode;
}

function FormDataRoot({
  children,
  onSubmit,
  initialValues = {},
}: FromDataProps) {
  return (
    <div id="select">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(data) => {
          console.log(data);
          onSubmit(data);
        }}
      >
        {({ isSubmitting, handleChange, values }) => children}
      </Formik>
    </div>
  );
}

export default FormDataRoot;
