import { object, string, array, number } from 'yup';



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

    education: array(object({
        institution: string().min(2, 'enter a valid institution name'),
        degree: string().min(2)
    })).min(1, 'minimum one educational qualification is required').max(4, 'enter only your latest 4 educational qualifications at max'),

    workExperience: array(object({
        comapny: string().min(2, 'enter a valid company name'),
        role: string().min(2, 'enter a valid role')
    })).max(4, 'mention your 4 most recent experiences at max')

})