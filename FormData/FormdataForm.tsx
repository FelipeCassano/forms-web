import React from "react";
import { Form, Field } from "formik";
import { twMerge } from "tailwind-merge";

interface FromDataProps {
  columns: Col[];
  id?: any;
  className?: string;
  children?: React.ReactNode;
}
interface Col {
  type?: string;
  name: string;
  placeholder: string;
  component: any;
  options?: string[];
}

function FormdataForm({ columns, id, className, children }: FromDataProps) {
  return (
    <Form className="w-full" id={id}>
      <div className={twMerge("flex flex-col", className)}>
        {columns.map((col: Col, index) => (
          <div key={index} className="mt-2 mb-2">
            {
              <Field
                type={col.type}
                name={col.name}
                label={col.placeholder}
                component={col.component}
                options={col.options}
              ></Field>
            }
          </div>
        ))}
        {children}
      </div>
    </Form>
  );
}

export default FormdataForm;
