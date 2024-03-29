import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { addContact, updateContact, updateUser } from '../services/index';

import { submitErrorFields } from "./validationMsg";

import { toast } from "react-toastify";

const useForm = validate => {
    const { currentUser } = useSelector(state => state.currentUser);
    const { contact } = useSelector(state => state.viewContact);
    
    const dispatch = useDispatch();
    const location = useLocation();
    const { cid } = useParams();
    // console.log("URL LOCATION -> ", cid, location.pathname);

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
        country: {
            code: "",
            name: "",
            no: "",
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
    const [profileEdit, setProfileEdit] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(false);
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});

    
    useEffect(() => {
        setErrors(validate(values));
    }, [values, validate]);

    useEffect(() => {
        if (cid && contact) {
            setValues({
                cId: contact?.cid,
                profilePic: '',
                profilePicURL: contact?.image ?? '',
                favorite: contact?.favorite ?? false,
                name: contact?.name ?? '',
                nickName: contact?.nickName ?? '',
                title: contact?.title ?? '',
                company: contact?.company ?? '',
                email: contact?.email ?? '',
                mobileNumber: {
                    code: contact?.mobileNumber?.code ?? '',
                    number: contact?.mobileNumber?.number ?? ''
                },
                telephoneNumber: {
                    code: contact?.telephoneNumber?.code ?? '',
                    number: contact?.telephoneNumber?.number ?? ''
                },
                country: {
                    code: contact?.country?.code ?? '',
                    name: contact?.country?.name ?? '',
                    no: contact?.country?.no ?? ''
                },
                // country: contact?.country ?? '',
                dateOfBirth: contact?.dateOfBirth ?? '',
                address: contact?.address ?? '',
                relationship: contact?.relationship ?? '',
                zodiacSign: contact?.zodiacSign ?? '',
                tags: contact?.tags ?? [],
                website: contact?.website ?? '',
                socialLinks: {
                    facebook: contact?.socialLinks?.facebook ?? '',
                    twitter: contact?.socialLinks?.twitter ?? '',
                    linkedIn: contact?.socialLinks?.linkedIn ?? '',
                    instagram: contact?.socialLinks?.instagram ?? '',
                    youtube: contact?.socialLinks?.youtube ?? ''
                },
                description: contact?.description ?? '',
            });
            setUploadedFile(true);
        } 
        else {
            handleReset();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cid, contact]);

    useEffect(() => {
        if (profileEdit && currentUser && location.pathname.includes("profile")) {
            setValues({
                id: currentUser?.id,
                agreement: currentUser?.agreement ?? true,
                password: currentUser?.password ?? null,
                profilePic: '',
                profilePicURL: currentUser?.image ?? '',
                name: currentUser?.name ?? '',
                email: currentUser?.email ?? '',
                mobileNumber: {
                    code: currentUser?.mobileNumber?.code ?? '',
                    number: currentUser?.mobileNumber?.number ?? ''
                },
                country: {
                    code: currentUser?.country?.code ?? '',
                    name: currentUser?.country?.name ?? '',
                    no: currentUser?.country?.no ?? ''
                },
                // country: currentUser?.country ?? '',
                dateOfBirth: currentUser?.dateOfBirth ?? '',
                zodiacSign: currentUser?.zodiacSign ?? '',
                website: currentUser?.website ?? '',
                socialLinks: {
                    facebook: currentUser?.socialLinks?.facebook ?? '',
                    twitter: currentUser?.socialLinks?.twitter ?? '',
                    linkedIn: currentUser?.socialLinks?.linkedIn ?? '',
                    instagram: currentUser?.socialLinks?.instagram ?? '',
                    youtube: currentUser?.socialLinks?.youtube ?? ''
                },
                description: currentUser?.description ?? '',
            })
            setUploadedFile(true);
        } 
        else {
            handleReset();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profileEdit, currentUser, location.pathname]);

    // console.log('values ->', values);
    // console.log('touched ->', touched);









    const handleClick = (e) => {
        setValues({
            ...values,
            favorite: !values.favorite
        })
    };

    const handleEnter = event => {
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
                [name]: '',
                profilePicURL: ''
            });
        }
    };
    const handleChangeFileCancel = () => {
        if (location.pathname === "/profile") {
            setValues({
                ...values,
                profilePic: '',
                profilePicURL: currentUser?.image ?? '',
            });
        }
        else {
            setValues({
                ...values,
                profilePic: "",
                profilePicURL: contact?.image ?? ''
            });
        }
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
        if (name === 'country') {
            setValues({
                ...values,
                // [name]: value,
                country: {
                    ...values.country,
                    code: value.code ?? '',
                    name: value.name ?? '',
                    no: value.no ?? ''
                },
                mobileNumber: {
                    ...values.mobileNumber,
                    code: value.no ?? '',
                },
                telephoneNumber: {
                    ...values.telephoneNumber,
                    code: value.no ?? '',
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
        if (profileEdit) {
            setValues({
                ...values,
                profilePic: '',
                profilePicURL: '',
                name: '',
                email: '',
                mobileNumber: {
                    code: '',
                    number: ''
                },
                country: {
                    code: '',
                    name: '',
                    no: ''
                },
                // country: '',
                dateOfBirth: '',
                zodiacSign: '',
                website: '',
                socialLinks: {
                    facebook: '',
                    twitter: '',
                    linkedIn: '',
                    instagram: '',
                    youtube: ''
                },
                description: '',
            })
        }
        else {
            setValues({
                ...values,
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
                country: {
                    code: '',
                    name: '',
                    no: ''
                },
                // country: "",
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
                    youtube: ""
                },
                description: "",
            });
        }
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

        const PLEASE = "please";
        // console.log(Object.keys(errors))
        if (Object.keys(errors).length === 1 && Object.keys(errors?.socialLinks).length === 0) {
            if (location.pathname.includes("add")) {
                dispatch(addContact(values));
            }
            if (location.pathname.includes("edit")) {
                dispatch(updateContact(values));
            }
            if (location.pathname.includes("profile")) {
                dispatch(updateUser(values));
            }
        }
        else if (errors?.name?.split(' ')?.[0].toLowerCase() === PLEASE
            || errors?.email?.split(' ')?.[0].toLowerCase() === PLEASE
            || errors?.mobileNumber?.split(' ')?.[0].toLowerCase() === PLEASE) {
            toast.warning("Please fill all the required fields");
        }
        else if (Object.keys(errors).length > 1) {
            toast.warning(`A problem exists with the ${submitErrorFields(Object.keys(errors)[1])} field`);
        }
        else {
            toast.warning("There are errors in some fields");
        }
    };






    return {
        values, setValues,
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
        uploadedFile, touched, errors,
        profileEdit, setProfileEdit
    }
};

export default useForm;