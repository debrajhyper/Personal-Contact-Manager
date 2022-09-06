import { CountryDetails } from "../components/misc/CountryDetails";
import { RelationshipDetails } from "../components/misc/RelationshipDetails";
import { zodiacDetails } from "../components/misc/ZodiacDetails";

export const excluded = [null, undefined, "null", "undefined", "", " "];


export const loginValidate = values => {
    const errors = {};
    const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!values.email) {
        errors.email = "Please Provide your Email Address";
    } 
    else if (!email_pattern.test(values.email)) {
        errors.email = "Email Address Is Invalid";
    }

    if (!values.password) {
        errors.password = "Please Provide your Password";
    } 
    else if (values.password.length < 8) {
        errors.password = "Atleast 8 Characters";
    }

    return errors;
};




export const ForgotPasswordValidate = values => {
    const errors = {};
    const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!values.email) {
        errors.email = "Please Provide your Email Address";
    } 
    else if (!email_pattern.test(values.email)) {
        errors.email = "Email Address Is Invalid";
    }

    return errors;
};




export const OtpValidate = values => {
    const errors = {};

    if (!values.otp) {
        errors.otp = "Please provide the OTP";
    } 
    else if (values.otp.toString().length < 6 || values.otp.toString().length > 6) {
        errors.otp = "Invalid OTP";
    }

    return errors;
}




export const passwordValidation = values => {
    const errors = {};

    if (!values.password) {
        errors.password = "Please Provide your Password";
    } else if (values.password.length < 8) {
        errors.password = "Atleast 8 Characters";
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = "Please Provide your Password Confirmation";
    } 
    else if (values.confirmPassword.length < 8) {
        errors.confirmPassword = "Atleast 8 Characters";
    } 
    else if (values.password === '' & values.confirmPassword !== '') {
        errors.confirmPassword = "Please Provide your Password";
    } 
    else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Password does not match";
    }

    return errors;
}




export const signupValidate = values => {
    const errors = {};
    const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!values.name) {
        errors.name = "Please Provide Your Name";
    } 
    else if (values.name.length > 15) {
        errors.name = "Must be 15 characters or less";
    }

    if (!values.email) {
        errors.email = "Please Provide your Email Address";
    } 
    else if (!email_pattern.test(values.email)) {
        errors.email = "Email Address Is Invalid";
    }

    if (!values.password) {
        errors.password = "Please Provide your Password";
    } 
    else if (values.password.length < 8) {
        errors.password = "Atleast 8 Characters";
    }

    if (!values.agreement) {
        errors.agreement = "Accept Terms & Conditions"
    }

    return errors;
};




export const contactValidate = values => {
    const errors = {
        socialLinks: {},
    };
    const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const phoneNo_pattern = /^(\+\d{1,3}[- ]?)?\d{10}$/gm;
    const dateOfBirth_pattern = /^\d{4}-\d{2}-\d{2}$/;
    // eslint-disable-next-line no-useless-escape
    const url_pattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&\/=]*)$/gm
    // console.log("-------------------> ",values)

    if (!values.name) {
        errors.name = "Please Provide Name";
    } 
    else if (values.name.length > 30) {
        errors.name = "Must be 30 characters or less";
    }

    if (!values.email) {
        errors.email = "Please Provide Email Address";
    } 
    else if (!email_pattern.test(values.email)) {
        errors.email = "Email Address Is Invalid";
    }

    if (!values.mobileNumber?.number) {
        errors.mobileNumber = "Please Provide Mobile Number";
    } 
    else if (!values.mobileNumber.number?.match(phoneNo_pattern)) {
        errors.mobileNumber = "Invalid Mobile Number";
    }

    if (!excluded.includes(values?.country)) {
        if (!CountryDetails.filter(country => country.name.toLocaleLowerCase() === values.country?.name?.toLocaleLowerCase()).length > 0) {
            errors.country = "Country Not Found";
        }
    }

    if (!excluded.includes(values?.dateOfBirth)) {
        if (!values.dateOfBirth?.match(dateOfBirth_pattern)) {
            errors.dateOfBirth = "Invalid Date Format";
        } 
        else {
            const date = new Date(values.dateOfBirth);
            const today = new Date();
            if (date > today) {
                errors.dateOfBirth = "Date is in Future";
            }
        }
    }

    if (!excluded.includes(values?.relationship)) {
        if (!RelationshipDetails.filter(relationship => relationship.name.toLocaleLowerCase() === values.relationship.toLocaleLowerCase()).length > 0) {
            errors.relationship = "Relationship does not exist";
        }
    }

    if (!excluded.includes(values?.zodiacSign)) {
        if (!zodiacDetails.filter(zodiacSign => zodiacSign.name.toLocaleLowerCase() === values.zodiacSign.toLocaleLowerCase()).length > 0) {
            errors.zodiacSign = "Zodiac Name does not exist";
        }
    }

    if (!excluded.includes(values?.profilePic)) {
        if (values.profilePic?.size > 5242880) {
            errors.profilePic = "File size must be less than 5MB";
        } 
        else if (!values.profilePic?.name?.match(/\.(jpg|jpeg|png|gif)$/)) {
            errors.profilePic = "Invalid File Format";
        }
    }

    if (!excluded.includes(values?.website)) {
        if (!values.website?.match(url_pattern)) {
            errors.website = "Invalid URL";
        }
    }

    if (!excluded.includes(values?.socialLinks?.facebook)) {
        if (!values.socialLinks.facebook?.match(url_pattern)) {
            errors.socialLinks.facebook = "Invalid Facebook URL";
        }
    }

    if (!excluded.includes(values?.socialLinks?.twitter)) {
        if (!values.socialLinks.twitter?.match(url_pattern)) {
            errors.socialLinks.twitter = "Invalid Twitter URL";
        }
    }

    if (!excluded.includes(values?.socialLinks?.linkedIn)) {
        if (!values.socialLinks.linkedIn?.match(url_pattern)) {
            errors.socialLinks.linkedIn = "Invalid LinkedIn URL";
        }
    }

    if (!excluded.includes(values?.socialLinks?.instagram)) {
        if (!values.socialLinks.instagram?.match(url_pattern)) {
            errors.socialLinks.instagram = "Invalid Instagram URL";
        }
    }

    if (!excluded.includes(values?.socialLinks?.youtube)) {
        if (!values.socialLinks.youtube?.match(url_pattern)) {
            errors.socialLinks.youtube = "Invalid Youtube URL";
        }
    }


    return errors;
};




export const submitErrorFields = fieldName => {
    switch (fieldName) {
        case "name":
            return "Name";
        case "email":
            return "Email";
        case "password":
            return "Password";
        case "mobileNumber":
            return "Mobile Number";
        case "country":
            return "Country";
        case "dateOfBirth":
            return "Birth Date";
        case "relationship":
            return "Relationship";
        case "zodiacSign":
            return "Zodiac Sign";
        case "profilePic":
            return "Profile Picture";
        case "website":
            return "Website";
        case "socialLinks":
            return "Social Links";
        default:
            return "";
    }
}




export const userValidate = values => {
    const errors = {
        socialLinks: {},
    };
    const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const phoneNo_pattern = /^(\+\d{1,3}[- ]?)?\d{10}$/gm;
    const dateOfBirth_pattern = /^\d{4}-\d{2}-\d{2}$/;
    // eslint-disable-next-line no-useless-escape
    const url_pattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&\/=]*)$/gm
    // console.log("-------------------> ",values)

    if (!values.name) {
        errors.name = "Please Provide Name";
    } 
    else if (values.name.length > 30) {
        errors.name = "Must be 30 characters or less";
    }

    if (!values.email) {
        errors.email = "Please Provide Email Address";
    } 
    else if (!email_pattern.test(values.email)) {
        errors.email = "Email Address Is Invalid";
    }

    if (!excluded.includes(values?.mobileNumber?.number)) {
        if (!values.mobileNumber?.number?.match(phoneNo_pattern)) {
            errors.mobileNumber = "Invalid Mobile Number";
        }
    }

    if (!excluded.includes(values?.country)) {
        if (!CountryDetails.filter(country => country.name.toLocaleLowerCase() === values.country?.name?.toLocaleLowerCase()).length > 0) {
            errors.country = "Country Not Found";
        }
    }

    if (!excluded.includes(values?.dateOfBirth)) {
        if (!values.dateOfBirth?.match(dateOfBirth_pattern)) {
            errors.dateOfBirth = "Invalid Date Format";
        } 
        else {
            const date = new Date(values.dateOfBirth);
            const today = new Date();
            if (date > today) {
                errors.dateOfBirth = "Date is in Future";
            }
        }
    }

    if (!excluded.includes(values?.zodiacSign)) {
        if (!zodiacDetails.filter(zodiacSign => zodiacSign.name.toLocaleLowerCase() === values.zodiacSign.toLocaleLowerCase()).length > 0) {
            errors.zodiacSign = "Zodiac Name does not exist";
        }
    }

    if (!excluded.includes(values?.profilePic)) {
        if (values.profilePic?.size > 5242880) {
            errors.profilePic = "File size must be less than 5MB";
        } 
        else if (!values.profilePic?.name?.match(/\.(jpg|jpeg|png|gif)$/)) {
            errors.profilePic = "Invalid File Format";
        }
    }

    if (!excluded.includes(values?.website)) {
        if (!values.website?.match(url_pattern)) {
            errors.website = "Invalid URL";
        }
    }

    if (!excluded.includes(values?.socialLinks?.facebook)) {
        if (!values.socialLinks.facebook?.match(url_pattern)) {
            errors.socialLinks.facebook = "Invalid Facebook URL";
        }
    }

    if (!excluded.includes(values?.socialLinks?.twitter)) {
        if (!values.socialLinks.twitter?.match(url_pattern)) {
            errors.socialLinks.twitter = "Invalid Twitter URL";
        }
    }

    if (!excluded.includes(values?.socialLinks?.linkedIn)) {
        if (!values.socialLinks.linkedIn?.match(url_pattern)) {
            errors.socialLinks.linkedIn = "Invalid LinkedIn URL";
        }
    }

    if (!excluded.includes(values?.socialLinks?.instagram)) {
        if (!values.socialLinks.instagram?.match(url_pattern)) {
            errors.socialLinks.instagram = "Invalid Instagram URL";
        }
    }

    if (!excluded.includes(values?.socialLinks?.youtube)) {
        if (!values.socialLinks.youtube?.match(url_pattern)) {
            errors.socialLinks.youtube = "Invalid Youtube URL";
        }
    }


    return errors;
}