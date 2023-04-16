import React from "react";
import { useState } from "react";
import { Table, TextInput, Label, Button } from "flowbite-react";

const StudentDashboard = () => {
  const [students, setStudents] = useState([]); // initializing an empty array of objects

  // defining object for a new student
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    rollNumber: "",
    cgpa: "",
  });

  const [editMode, setEditMode] = useState(false); // state to determine if the user is in edit mode
  const [editStudent, setEditStudent] = useState({}); // initializing the student to be edited as an empty object

  // function to handle changes in input feilds while filling up the form
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (editMode) {
      setEditStudent({ ...editStudent, [name]: value }); // while editing existing student
    } else setNewStudent({ ...newStudent, [name]: value }); // while adding a new student
  };

  //function to add a new student
  const handleAddStudent = (e) => {
    e.preventDefault();
    setStudents([...students, newStudent]);
    console.log(newStudent);
    setNewStudent({
      firstName: "",
      lastName: "",
      rollNumber: "",
      cgpa: "",
    });
  };

  //function to delete an existing student
  const handleOnDelete = (rollNumber) => {
    setStudents(
      students.filter((student) => student.rollNumber !== rollNumber)
    );
    console.log("delete student with roll number :", rollNumber);
  };

  // fucntion to update an existing student
  const handleUpdateStudent = (e) => {
    e.preventDefault();
    let newDataSet = students;
    for (let index = 0; index <= newDataSet.length; index++) {
      let currStudent = newDataSet[index];
      if (currStudent.rollNumber === editStudent.rollNumber) {
        newDataSet[index].firstName = editStudent.firstName;
        newDataSet[index].lastName = editStudent.lastName;
        newDataSet[index].cgpa = editStudent.cgpa;
        break;
      }
    }
    setStudents(newDataSet);
    setEditMode(false);
  };

  // function to trigger student updation
  const handleOnEdit = (rollNumber) => {
    const currStudent = students.find((student) => {
      return student.rollNumber === rollNumber;
    });
    setEditMode(true);
    setEditStudent(currStudent);
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
          onSubmit={editMode ? handleUpdateStudent : handleAddStudent}>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='firstName' value='First Name' />
            </div>
            <TextInput
              id='firstName'
              name='firstName'
              type='text'
              placeholder='Enter your First Name'
              onChange={handleOnChange}
              value={editMode ? editStudent.firstName : newStudent.firstName}
              required={true}
            />
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
              onChange={handleOnChange}
              value={editMode ? editStudent.lastName : newStudent.lastName}
              required={true}
            />
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
              onChange={handleOnChange}
              value={editMode ? editStudent.rollNumber : newStudent.rollNumber}
              required={true}
              disabled={editMode ? true : false}
            />
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
              onChange={handleOnChange}
              value={editMode ? editStudent.cgpa : newStudent.cgpa}
              required={true}
            />
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
