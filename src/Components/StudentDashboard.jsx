import React from "react";
import { useState } from "react";
import { Table, TextInput, Label, Button } from "flowbite-react";
import { useFormik } from "formik";
import { studentSchema } from "../Validations/StudentValidation";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  rollNumber: "",
  cgpa: "",
};

const StudentDashboard = () => {
  const [students, setStudents] = useState([]); // initializing an empty array of objects

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: studentSchema,
      onSubmit: (values, { resetForm }) => {
        if (editMode) {
          let newDataSet = students;
          for (let index = 0; index <= newDataSet.length; index++) {
            let currStudent = newDataSet[index];
            if (currStudent.rollNumber === editStudent.rollNumber) {
              newDataSet[index].firstName = editStudent.firstName;
              newDataSet[index].lastName = editStudent.lastName;
              newDataSet[index].email = editStudent.email;
              newDataSet[index].phoneNumber = editStudent.phoneNumber;
              newDataSet[index].cgpa = editStudent.cgpa;
              break;
            }
          }

          setStudents(newDataSet);

          setEditMode(false);
        } else {
          setStudents([...students, values]);
        }
      },
    });

  const [editMode, setEditMode] = useState(false); // state to determine if the user is in edit mode
  const [editStudent, setEditStudent] = useState({}); // initializing the student to be edited as an empty object

  //function to delete an existing student
  const handleOnDelete = (rollNumber) => {
    setStudents(
      students.filter((student) => student.rollNumber !== rollNumber)
    );
    console.log("delete student with roll number :", rollNumber);
  };

  // function to trigger student updation
  const handleOnEdit = (rollNumber) => {
    const currStudent = students.find((student) => {
      return student.rollNumber === rollNumber;
    });
    setEditMode(true);
    setEditStudent(currStudent);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditStudent({ ...editStudent, [name]: value }); // while editing existing student
  };

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center px-8 md:px-28'>
      <h1 className='text-4xl md:text-8xl font-extrabold'>
        {" "}
        Student Dashboard
      </h1>
      <div className='container'>
        <form
          className='flex flex-col gap-4 py-8'
          onSubmit={(values) => handleSubmit(values)}>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='firstName' value='First Name' />
              </div>
              <TextInput
                id='firstName'
                name='firstName'
                type='text'
                placeholder='Enter your First Name'
                onChange={editMode ? handleEditChange : handleChange}
                onBlur={handleBlur}
                value={editMode ? editStudent.firstName : values.firstName}
              />
              {!editMode && errors.firstName && touched.firstName ? (
                <p className='text-rose-600 font-semibold'>
                  {errors.firstName}
                </p>
              ) : null}
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='lastName' value='Last Name' />
              </div>
              <TextInput
                id='lastName'
                name='lastName'
                type='text'
                placeholder='Enter your Last Name'
                onChange={editMode ? handleEditChange : handleChange}
                value={editMode ? editStudent.lastName : values.lastName}
              />
              {!editMode && errors.lastName && touched.lastName ? (
                <p className='text-rose-600 font-semibold'>{errors.lastName}</p>
              ) : null}
            </div>

            <div>
              <div className='mb-2 block'>
                <Label htmlFor='email' value='Email' />
              </div>
              <TextInput
                id='email'
                name='email'
                type='email'
                placeholder='Enter your email address'
                onChange={editMode ? handleEditChange : handleChange}
                onBlur={handleBlur}
                value={editMode ? editStudent.email : values.email}
              />
              {!editMode && errors.email && touched.email ? (
                <p className='text-rose-600 font-semibold'>{errors.email}</p>
              ) : null}
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='phoneNumber' value='Phone Number' />
              </div>

              <TextInput
                id='phoneNumber'
                name='phoneNumber'
                type='text'
                placeholder='Enter your Phone Number'
                onChange={editMode ? handleEditChange : handleChange}
                onBlur={handleBlur}
                value={editMode ? editStudent.phoneNumber : values.phoneNumber}
              />
              {!editMode && errors.phoneNumber && touched.phoneNumber ? (
                <p className='text-rose-600 font-semibold'>
                  {errors.phoneNumber}
                </p>
              ) : null}
            </div>

            <div>
              <div className='mb-2 block'>
                <Label htmlFor='rollNumber' value='Roll Number' />
              </div>
              <TextInput
                id='rollNumber'
                name='rollNumber'
                type='text'
                placeholder='Enter your Roll Number'
                onChange={editMode ? handleEditChange : handleChange}
                onBlur={handleBlur}
                value={editMode ? editStudent.rollNumber : values.rollNumber}
                disabled={editMode ? true : false}
              />
              {!editMode && errors.rollNumber && touched.rollNumber ? (
                <p className='text-rose-600 font-bold'>{errors.rollNumber}</p>
              ) : null}
            </div>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='cgpa' value='CGPA' />
              </div>
              <TextInput
                id='cgpa'
                name='cgpa'
                type='text'
                placeholder='Enter your CGPA'
                onChange={editMode ? handleEditChange : handleChange}
                onBlur={handleBlur}
                value={editMode ? editStudent.cgpa : values.cgpa}
              />
              {!editMode && errors.cgpa && touched.cgpa ? (
                <p className='text-rose-600 font-semibold'>{errors.cgpa}</p>
              ) : null}
            </div>
          </div>
          <Button
            type='submit'
            gradientDuoTone='cyanToBlue'
            className='max-w-max'>
            {editMode ? "Edit Student" : "Add Student"}
          </Button>
        </form>
        <Table striped={true}>
          <Table.Head>
            <Table.HeadCell>First name</Table.HeadCell>
            <Table.HeadCell>Last Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone Number</Table.HeadCell>
            <Table.HeadCell>Roll Number</Table.HeadCell>
            <Table.HeadCell>CGPA</Table.HeadCell>
            <Table.HeadCell>
              <span className='sr-only'>Edit</span>
            </Table.HeadCell>
            <Table.HeadCell>
              <span className='sr-only'>Delete</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {students.map((Student) => (
              <Table.Row
                key={Student.rollNumber}
                id={Student.rollNumber}
                className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {Student.firstName}
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {Student.lastName}
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {Student.email}
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {Student.phoneNumber}
                </Table.Cell>
                <Table.Cell>{Student.rollNumber}</Table.Cell>
                <Table.Cell>{Student.cgpa}</Table.Cell>
                <Table.Cell>
                  <button
                    className='font-medium text-blue-600 hover:underline dark:text-blue-500'
                    onClick={() => handleOnEdit(Student.rollNumber)}>
                    Edit
                  </button>
                </Table.Cell>
                <Table.Cell>
                  <button
                    className='font-medium text-rose-600 hover:underline dark:text-rose-500'
                    onClick={() => handleOnDelete(Student.rollNumber)}>
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default StudentDashboard;
