import { object, string, number } from 'yup';



export const studentSchema = object().shape({

    firstName: string()
        .matches(/^[A-Za-z ]*$/, 'Please enter valid first name')
        .min(2, 'First name cannot be less than 2 characters')
        .max(40, 'First name cannot be more than 40 characters')
        .required("Please enter you first name"),

    lastName: string()
        .matches(/^[A-Za-z ]*$/, 'Please enter valid last name')
        .min(2, 'Last name cannot be less than 2 characters')
        .max(40, 'Last name cannot be more than 40 characters')
        .required("Please enter you last name"),

    email: string()
        .email('please enter a valid email')
        .required('email cannot be empty'),

    phoneNumber: string()
        .matches(/^[+][0-9]{1,3}[ ][0-9]{3,14}$/, 'Invalid phone number')
        .required('Phone number is required'),

    rollNumber: number()
        .required('please enter your roll number')
        .positive('roll number cannot be less than 1')
        .integer(),

    cgpa: number()
        .positive('CGPA must be greater than 0')
        .max(9.999, 'CGPA must be less than 10')
        .required('Please eneter your CGPA'),
})