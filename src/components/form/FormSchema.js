import * as yup from 'yup';
import { emailValidation, firstNameValidation, lastNameValidation, passwordValidation, userNameValidation } from "../dashboard/CommonFunction";

export const loginSchema = yup.object().shape({
    email: emailValidation,
    password: passwordValidation,
});

export const registrationSchema = yup.object().shape({
    firstName: firstNameValidation,
    lastName: lastNameValidation,
    username: userNameValidation,
    email: emailValidation,
    password: passwordValidation,
});
