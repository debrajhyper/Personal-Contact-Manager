export const signupValidate = values => {
    const errors = {};
    let email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

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
    let email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

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
