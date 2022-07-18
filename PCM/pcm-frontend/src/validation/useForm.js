import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../services/index';
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const useForm = validate => {
    const [values, setValues] = useState({
        profilePic: "",
        profilePicURL: "",
        favorite: false,
        name: "",
        nickName: "",
        title: "",
        company: "",
        email: "",
        mobileNumber: {
            code: "",
            number: ""
        },
        telephoneNumber: {
            code: "",
            number: ""
        },
        country: "",
        dateOfBirth: "",
        address: "",
        relationship: "",
        zodiacSign: "",
        tags: [],
        website: "",
        socialLinks: {
            facebook: "",
            twitter: "",
            linkedIn: "",
            instagram: "",
            youtube: "",
        },
        description: "",
    });

    const [touched, setTouched] = useState({});
    const [uploadedFile, setUploadedFile] = useState(false);
    const [errors, setErrors] = useState({});
    const excluded = [null, undefined, "null", "undefined", ""];
    const mandatoryFields = ["name", "email", "mobileNumber"];
    const dispatch = useDispatch();
    const { cid } = useParams();
    const contact = useSelector(state => state.viewContact.contact);

    useEffect(() => {
        setErrors(validate(values));
    }, [values, validate]);

    useEffect(() => {
        if (cid && contact) {
            setValues(contact);
        } else {
            handleReset();
        }
    }, [cid, contact]);

    // console.log('values ->', values);
    // console.log('touched ->', touched);









    const handleClick = (e) => {
        setValues({
            ...values,
            favorite: !values.favorite
        })
    };

    const handleEnter = (event) => {
        if (event.key.toLowerCase() === "enter") {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleChangeFile = e => {
        const { name, files } = e.target;
        const file = files[0];
        if (file !== undefined) {
            setValues({
                ...values,
                [name]: file,
                profilePicURL: URL.createObjectURL(file)
            });
        } else {
            setValues({
                ...values,
                [name]: "",
                profilePicURL: ""
            });
        }
    };
    const handleChangeFileCancel = () => {
        setValues({
            ...values,
            profilePic: "",
            profilePicURL: ""
        });
    };
    const handleChangeFileUpload = () => {
        setUploadedFile(true);
    };
    
    const handleChangeMobileNumber = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            mobileNumber: {
                ...values.mobileNumber,
                [name]: value
            }
        });
    }
    
    const handleChangeTelephoneNumber = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            telephoneNumber: {
                ...values.telephoneNumber,
                [name]: value
            }
        });
    }

    const handleChangeSelect = (name, value) => {
        console.log('name ->', name, 'value ->', value);
        if (name === 'country') {
            setValues({
                ...values,
                [name]: value,
                mobileNumber: {
                    ...values.mobileNumber,
                    code: value.no,
                },
                telephoneNumber: {
                    ...values.telephoneNumber,
                    code: value.no,
                },
            })
        }
        else {
            setValues({
                ...values,
                [name]: value,
            });
        }
    };

    const handleChangeAddTags = e => {
        const { value } = e.target;
        if (value !== '') {
            setValues({
                ...values,
                tags: [...values.tags, value]
            });
            e.target.value = "";
        }
    };
    const handleChangeRemoveTags = indexToRemove => {
        setValues({
            ...values,
            tags: [...values.tags.filter((_, index) => index !== indexToRemove)]
        });
    };

    const handleChangeSocial = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            socialLinks: {
                ...values.socialLinks,
                [name]: value
            }
        });
    };

    const handleChangeNote = value => {
        setValues({
            ...values,
            description: value
        });
    }








    
    const handleBlur = e => {
        const { name } = e.target;
        setTouched({
            ...touched,
            [name]: true
        });
    };

    const handleBlurMobileNumber = e => {
        const { name } = e.target;
        setTouched({
            ...touched,
            mobileNumber: {
                ...touched.mobileNumber,
                [name]: true
            }
        })
    }
    
    const handleBlurTelephoneNumber = e => {
        const { name } = e.target;
        setTouched({
            ...touched,
            telephoneNumber: {
                ...touched.telephoneNumber,
                [name]: true
            }
        })
    }

    const handleBlurSocial = e => {
        const { name } = e.target;
        setTouched({
            ...touched,
            socialLinks: {
                ...touched.socialLinks,
                [name]: true
            }
        })
    };








    const handleReset = () => {
        setValues({
            profilePic: "",
            profilePicURL: "",
            favorite: false,
            name: "",
            nickName: "",
            title: "",
            company: "",
            email: "",
            mobileNumber: {
                code: "",
                number: ""
            },
            telephoneNumber: {
                code: "",
                number: ""
            },
            country: "",
            dateOfBirth: "",
            address: "",
            relationship: "",
            zodiacSign: "",
            tags: [],
            website: "",
            socialLinks: {
                facebook: "",
                twitter: "",
                linkedIn: "",
                instagram: "",
                youtube: "",
            },
            description: "",
        });
        setTouched({});
        setUploadedFile(false);
        setErrors({});
    }






    

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values));
        setTouched({
            ...touched,
            name: true,
            email: true,
            mobileNumber: {
                code: true,
                number: true
            },
        });

        const mandatoryCheck = Object.keys(errors).filter(key => mandatoryFields.includes(key));

        if(Object.keys(errors).length === 1 && Object.keys(errors.socialLinks).length === 0) {
            dispatch(addContact(values));
            handleReset();
        } else if(mandatoryCheck.length !== 0) {
            toast.warning("Please fill all the required fields");
        } else {
            toast.warning("Some fields have errors");
        }
    };






    return { 
        values, setValues, 
        excluded, 
        handleClick, 
        handleEnter, 
        handleChange, 
        handleChangeFile, handleChangeFileCancel, handleChangeFileUpload, 
        handleChangeMobileNumber, 
        handleChangeTelephoneNumber, 
        handleChangeSelect, 
        handleChangeAddTags, handleChangeRemoveTags, 
        handleChangeSocial, 
        handleChangeNote, 

        handleBlur, 
        handleBlurMobileNumber, 
        handleBlurTelephoneNumber, 
        handleBlurSocial, 

        handleReset, 
        handleSubmit, 
        uploadedFile, touched, errors }
};

export default useForm;