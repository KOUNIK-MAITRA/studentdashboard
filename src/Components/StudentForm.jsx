import React from "react";
import { Formik, Form, FieldArray, Field } from "formik";
import InputField from "./InputField";
import { studentInitial } from "../Utilities/StudentInitial";
import { studentSchema } from "../Validations/StudentValidation";
import Button from "./Button";
import MultiSelect from "./MultiSelect";
const StudentForm = () => {
  return (
    <div className='w-[50rem] font-mono'>
      <Formik
        initialValues={studentInitial}
        validationSchema={studentSchema}
        onSubmit={(values) => {
          console.log(values);
        }}>
        {({ values, errors, isSubmitting, touched }) => (
          <Form
            autoComplete='off'
            className='bg-white p-8 border shadow-lg rounded-md'>
            <p className='text-center uppercase font-extrabold text-4xl underline underline-offset-8'>
              STUDENT DETAILS
            </p>
            <div className='py-6'>
              <div className='personalDetails py-4'>
                <h1 className='font-bold text-2xl py-4 underline underline-offset-8'>
                  Personal Details
                </h1>
                <div className='pb-4 grid md:grid-cols-2 gap-4'>
                  <InputField
                    name='firstName'
                    label='First Name'
                    placeholder='Enter your First Name'
                    error={errors.firstName}
                    isTouched={touched.firstName}
                  />
                  <InputField
                    name='lastName'
                    label='Last Name'
                    placeholder='Enter your Last Name'
                    error={errors.lastName}
                    isTouched={touched.lastName}
                  />
                  <InputField
                    name='email'
                    label='Email'
                    placeholder='Enter your Email'
                    error={errors.email}
                    isTouched={touched.email}
                  />
                  <InputField
                    name='phoneNumber'
                    label='Phone Number'
                    placeholder='Enter your Phone Number'
                    error={errors.phoneNumber}
                    isTouched={touched.phoneNumber}
                  />
                  <InputField
                    name='rollNumber'
                    label='Roll Number'
                    placeholder='Enter your Roll Number'
                    error={errors.rollNumber}
                    isTouched={touched.rollNumber}
                  />

                  <InputField
                    name='skills'
                    label='Skills'
                    placeholder='Enter your skills'
                    isMulti={true}
                    component={MultiSelect}
                    options={[
                      { value: "html", label: "HTML" },
                      { value: "css", label: "CSS" },
                      { value: "javascript", label: "Javascript" },
                      { value: "java", label: "Java" },
                      { value: "reactjs", label: "React Js" },
                      { value: "nextjs", label: "Next Js" },
                      { value: "nodejs", label: "Node Js" },
                      { value: "expressjs", label: "Express Js" },
                      { value: "mongodb", label: "MongoDb" },
                    ]}
                    isTouched={touched.skills}
                  />
                </div>
              </div>
              <hr />
              <div className='Education py-4'>
                <p className='font-bold text-2xl py-4 underline underline-offset-8'>
                  Education
                </p>
                <FieldArray name='education'>
                  {({ insert, push, remove }) => (
                    <>
                      {values.education.length > 0 &&
                        values.education.map((education, index) => (
                          <div className='w-full p-4' key={index}>
                            <InputField
                              label='Institute'
                              name={`education[${index}].institution`}
                              placeholder='Enter the name of your institution'
                              type='text'
                            />

                            <InputField
                              label='Degree'
                              name={`education[${index}].degree`}
                              placeholder='Enter your Degree'
                              type='text'
                            />
                            <div className='w-full flex justify-end py-6'>
                              <Button
                                text='Remove'
                                color='danger'
                                onClick={() => remove(index)}></Button>
                            </div>
                            <hr />
                          </div>
                        ))}
                      <div className='flex justify-end py-8'>
                        <Button
                          color='success'
                          onClick={() => push({ institution: "", degree: "" })}
                          text='Add Education'></Button>
                      </div>
                    </>
                  )}
                </FieldArray>
              </div>
              <hr />
              <div className='Work Experience py-4'>
                <p className='font-bold text-2xl py-4 underline underline-offset-8'>
                  Work Experience
                </p>
                <FieldArray name='workExperience'>
                  {({ insert, push, remove }) => (
                    <>
                      {values.workExperience.length > 0 &&
                        values.workExperience.map((experience, index) => (
                          <div className='w-full p-4' key={index}>
                            <InputField
                              label='Company'
                              name={`workExperience[${index}].company`}
                              placeholder='Enter the name of your company'
                              type='text'
                            />

                            <InputField
                              label='Role'
                              name={`workExperience[${index}].role`}
                              placeholder='Enter the name of your role'
                              type='text'
                            />

                            <div className='w-full flex justify-end py-6'>
                              <Button
                                color='danger'
                                text='Remove'
                                onClick={() => remove(index)}></Button>
                            </div>
                            <hr />
                          </div>
                        ))}
                      <div className='flex justify-end py-8'>
                        <Button
                          color='success'
                          text='Add Experience'
                          onClick={() => push({ company: "", role: "" })}>
                          Add Experience
                        </Button>
                      </div>
                    </>
                  )}
                </FieldArray>
              </div>
            </div>
            <div>
              <button
                disabled={isSubmitting}
                className='w-full text-white font-semibold text-2xl bg-gradient-to-r from-emerald-500 to-cyan-600 py-2 px-6 rounded-lg hover:opacity-90'
                type='submit'>
                {" "}
                {isSubmitting ? "Submitting" : "Submit"}
              </button>
            </div>

            <pre className='m-8 border-2 border-gray-200 min-w-max p-8 flex justify-center items-center'>
              {JSON.stringify({ values, errors, touched }, null, 4)}
            </pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StudentForm;
