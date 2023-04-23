import React from "react";
import { Field } from "formik";

const InputField = ({
  name,
  placeholder,
  label,
  type,
  error,
  isMulti,
  component,
  options,
  isTouched,
}) => {
  return (
    <div className='flex flex-col gap-2 py-2'>
      <label htmlFor={name}>{label}</label>
      <Field
        name={name}
        className='border-2 border-gray-500 rounded-md  focus:border-emerald-600 p-2 '
        placeholder={placeholder}
        component={component}
        isMulti={isMulti}
        options={options}
      />
      {isTouched && error ? (
        <p className='text-rose-600 font-semibold'>{error}</p>
      ) : null}
    </div>
  );
};

export default InputField;
