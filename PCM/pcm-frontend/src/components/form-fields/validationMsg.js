import { CountryDetails } from "../misc/CountryDetails";

export const signupValidate = values => {
    const errors = {};
    const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!values.name) {
        errors.name = "Please Provide Your Name";
    } else if (values.name.length > 15) {
        errors.name = "Must be 15 characters or less";
    }

    if (!values.email) {
        errors.email = "Please Provide your Email Address";
    } else if (!email_pattern.test(values.email)) {
        errors.email = "Email Address Is Invalid";
    }

    if (!values.password) {
        errors.password = "Please Provide your Password";
    } else if (values.password.length < 8) {
        errors.password = "Atleast 8 Characters";
    }

    if(!values.agreement) {
        errors.agreement = "Accept Terms & Conditions"
    }

    return errors;
};






export const loginValidate = values => {
    const errors = {};
    const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!values.username) {
        errors.username = "Please Provide your Email Address";
    } else if (!email_pattern.test(values.username)) {
        errors.username = "Email Address Is Invalid";
    }

    if (!values.password) {
        errors.password = "Please Provide your Password";
    } else if (values.password.length < 8) {
        errors.password = "Atleast 8 Characters";
    }

    return errors;
};




export const contactValidate = values => { 
    
    const errors = {};
    const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const phoneNo_pattern = /^(\+\d{1,3}[- ]?)?\d{10}$/gm;

    if (!values.name) {
        errors.name = "Please Provide Name";
    } else if (values.name.length > 30) {
        errors.name = "Must be 30 characters or less";
    }

    if (!values.email) {
        errors.email = "Please Provide Email Address";
    } else if (!email_pattern.test(values.email)) {
        errors.email = "Email Address Is Invalid";
    }

    if(!values.mobileNo) {
        errors.mobileNo = "Please Provide Mobile Number";
    } else if (!values.mobileNo.match(phoneNo_pattern)) {
        errors.mobileNo = "Invalid Mobile Number";
    }

    console.log("-------------------",values)

    if(values.profilePic.size > 5242880) {
        errors.profilePic = "File size must be less than 5MB";
    } else if (!values?.profilePic?.name?.match(/\.(jpg|jpeg|png|gif)$/)) {
        errors.profilePic = "File must be jpeg or png";
    }

    return errors;
};
