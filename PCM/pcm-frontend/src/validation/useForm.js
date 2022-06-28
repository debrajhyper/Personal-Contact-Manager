import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { addContact } from '../services/index';

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
        mobileNumber: [
            {
                code: "",
                number: ""
            }
        ],
        telephoneNumber: {
            code: "",
            number: ""
        },
        country: {
            code: "",
            name: "",
            no: ""
        },
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
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        setErrors(validate(values));
    }, [values, validate]);


    // console.log('values ->', values);
    // console.log('errors ->', errors);

    const handleClick = (e) => {
        setValues({
            ...values,
            favorite: !values.favorite
        })
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleChangeSelect = (name, value) => {
        setValues({
            ...values,
            [name]: value,
            telephoneNumber: {
                ...values.telephoneNumber,
                code: value.no,
            }
        });
    };

    const handleChangeFile = e => {
        const { name, files } = e.target;
        const file = files[0];
        console.log('file ->', files[0]);

        if(file !== undefined) {
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

    const handleChangeRemoveTags = indexToRemove => {
        setValues({
            ...values,
            tags: [...values.tags.filter((_, index) => index !== indexToRemove)]
        });
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

    const handleChangeNote = value => {
        setValues({
            ...values,
            note: value
        });
    }

    const handleBlur = e => {
        const { name } = e.target;
        setTouched({
            ...touched,
            [name]: true
        });
    };

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


    const handleReset = () => {
        setValues({
            name: "",
            nickName: "",
            title: "",
            company: "",
            email: "",
            telephoneNo: "",
            mobileNo: "",
            address: "",
            profilePic: "",
            profilePicURL: "",
            country: "",
            dob: "",
            zodiacSign: "",
            relationship: "",
            tags: [],
            favorite: false,
            socialLinks: {
                Facebook: "",
                Twitter: "",
                LinkedIn: "",
                Instagram: "",
                YouTube: "",
            },
            website: "",
            note: "",
        });
        setTouched({});
        setUploadedFile(false);
        setErrors({});
    }

    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmit(true);

        console.log(values)
        dispatch(addContact(values));
    };


    return { values, handleClick, handleChange, handleChangeSelect, handleChangeFile,handleChangeTelephoneNumber, handleBlurTelephoneNumber, handleChangeFileCancel, handleChangeFileUpload, handleChangeRemoveTags, handleChangeAddTags, handleChangeSocial, handleChangeNote, handleBlur, handleBlurSocial, handleReset, handleSubmit, uploadedFile, touched, errors, isSubmit }
};

export default useForm;