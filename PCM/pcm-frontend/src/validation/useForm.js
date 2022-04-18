import { useState, useEffect } from "react";

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
            Facebook: "",
            Twitter: "",
            LinkedIn: "",
            Instagram: "",
            YouTube: "",
        },
        website: "",
        note: "",
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
            [name]: value
        });
    };

    const handleChangeFile = e => {
        const { name, files } = e.target;
        const file = files[0];

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



    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmit(true);

        console.log(values)
    };


    return { values, handleClick, handleChange, handleChangeSelect, handleChangeFile, handleChangeFileCancel, handleChangeFileUpload, handleChangeRemoveTags, handleChangeAddTags, handleChangeSocial, handleChangeNote, handleBlur, handleBlurSocial, handleReset, handleSubmit, uploadedFile, touched, errors, isSubmit }
};

export default useForm;