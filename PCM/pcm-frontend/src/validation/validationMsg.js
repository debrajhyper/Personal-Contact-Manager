import { CountryDetails } from "../components/misc/CountryDetails";
import { RelationshipDetails } from "../components/misc/RelationshipDetails";
import { zodiacDetails } from "../components/misc/ZodiacDetails";

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

    return errors;
};




export const contactValidate = values => { 
    const errors = {
        socialLinks: [],
    };
    const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const phoneNo_pattern = /^(\+\d{1,3}[- ]?)?\d{10}$/gm;
    const url_pattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&\/=]*)$/gm

    // console.log("-------------------> ",values)

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

    if(!values.mobileNumber.number) {
        errors.mobileNumber = "Please Provide Mobile Number";
    } else if (!values.mobileNumber.number?.match(phoneNo_pattern)) {
        errors.mobileNumber = "Invalid Mobile Number";
    }

    if(values.country.name !== '') {
        if (!CountryDetails.filter(country => country.name.toLocaleLowerCase() === values.country?.name?.toLocaleLowerCase()).length > 0) {
            errors.country = "Country Not Found";
        }
    }

    if(values.relationship !== '') {
        if (!RelationshipDetails.filter(relationship => relationship.name.toLocaleLowerCase() === values.relationship.toLocaleLowerCase()).length > 0) {
            errors.relationship = "Relationship does not exist";
        }
    }

    if(values.zodiacSign !== '') {
        if (!zodiacDetails.filter(zodiac => zodiac.name.toLocaleLowerCase() === values.zodiacSign?.name?.toLocaleLowerCase()).length > 0) {
            errors.zodiacSign = "Zodiac Name does not exist";
        }
    }

    if(values.profilePic !== '') {
        if(values.profilePic.size > 5242880) {
            errors.profilePic = "File size must be less than 5MB";
        } else if (!values.profilePic.name?.match(/\.(jpg|jpeg|png|gif)$/)) {
            errors.profilePic = "Invalid File Format";
        }
    }

    if(values.website !== '') {
        if(!values.website?.match(url_pattern)) {
            errors.website = "Invalid URL";
        }
    }

    // if(values.socialLinks.Facebook !== '') {
    //     if(!values.socialLinks.Facebook?.match(url_pattern)) {
    //         errors.socialLinks.Facebook = "Invalid Facebook URL";
    //     }
    // }

    // if(values.socialLinks.Twitter !== '') {
    //     if(!values.socialLinks.Twitter?.match(url_pattern)) {
    //         errors.socialLinks.Twitter = "Invalid Twitter URL";
    //     }
    // }

    // if(values.socialLinks.LinkedIn !== '') {
    //     if(!values.socialLinks.LinkedIn?.match(url_pattern)) {
    //         errors.socialLinks.LinkedIn = "Invalid LinkedIn URL";
    //     }
    // }

    // if(values.socialLinks.Instagram !== '') {
    //     if(!values.socialLinks.Instagram?.match(url_pattern)) {
    //         errors.socialLinks.Instagram = "Invalid Instagram URL";
    //     }
    // }

    // if(values.socialLinks.YouTube !== '') {
    //     if(!values.socialLinks.YouTube?.match(url_pattern)) {
    //         errors.socialLinks.YouTube = "Invalid YouTube URL";
    //     }
    // }


    return errors;
};
