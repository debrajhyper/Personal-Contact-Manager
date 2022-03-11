import { useState } from "react";

const useForm = validate => {
    const [values, setValues] = useState({
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
            facebook: "",
            twitter: "",
            linkedin: "",
            instagram: "",
            youtube: "",
        },
        website: "",
        note: "",
    });

    const [touched, setTouched] = useState({});
    const [uploadedFile, setUploadedFile] = useState(false);

    console.log('values ->', values);

    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    console.log('errors ->', errors);

    const handleChange = e => {
        const { name, value } = e.target;
        
        setValues({
            ...values,
            [name]: value
        });
        setErrors(validate(values));
    };

    const handleChangeSelect = (name, value) => {
        setValues({
            ...values,
            [name]: value
        });
        setErrors(validate(values));
    }

    const handleChangeFile = e => {
        const { name, files } = e.target;
        setValues({
            ...values,
            [name]: files[0],
            profilePicURL: URL.createObjectURL(files[0])
        });

        console.log(values?.profilePic?.name?.match(/\.(jpg|jpeg|png|gif)$/))
        // const reader = new FileReader();
        // reader.onload = () => {
        //     if (reader.readyState === 2) {
        //         console.log(reader)
        //         setValues({
        //             ...values,
        //             // [name]: reader.result,
        //             profilePicURL: reader.result
        //         });
        //     }
        // }
        // reader.readAsDataURL(files[0]);

        setErrors(validate(values));
    }

    const handleChangeFileCancel = () => {
        setValues({
            ...values,
            profilePic: "",
            profilePicURL: ""
        });
    }

    const handleChangeFileUpload = () => {
        setUploadedFile(true);
        setErrors(validate(values));
    }

    const handleBlur = e => {
        const { name } = e.target;
        setTouched({
            ...touched,
            [name]: true
        });
        setErrors(validate(values));
    }

    


    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmit(true);

        console.log(values)
    };


    return { values, handleChange, handleChangeSelect, handleChangeFile, handleChangeFileCancel, handleChangeFileUpload, handleBlur, handleSubmit, uploadedFile, touched, errors }
};

export default useForm;