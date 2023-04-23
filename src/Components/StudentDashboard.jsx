import React from "react";
import StudentForm from "./StudentForm";
const StudentDashboard = () => {
  return (
    <div className='min-w-screen min-h-screen flex flex-col justify-center items-center'>
      <div className='m-8'>
        <StudentForm />
      </div>
    </div>
  );
};

export default StudentDashboard;
