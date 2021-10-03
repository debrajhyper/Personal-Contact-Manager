import { useState } from "react";

const useForm = validate => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        about: "",
        agreement: false
    });
    const [errors, setErrors] = useState({
        nameError: "",
        emailError: "",
        passwordError: ""
    });
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = e => {
        const { name, value, checked } = e.target;
        setValues({
            ...values,
            [name]: value,
            agreement: checked
        });
        //setErrors(validate(values, name));
        const {nameMsg, emailMsg, passwordMsg} = validate(values, name)

        if(!!nameMsg) {
            setErrors({
                ...errors,
                nameError: nameMsg
            })
        }
        else if(!!emailMsg) {
            setErrors({
                ...errors,
                emailError: emailMsg
            })
        }
        else if (!!passwordMsg) {
            setErrors({
                ...errors,
                passwordError: passwordMsg
            })
        }
        
        console.log(values.name, values.email, values.password)

        console.log(nameMsg, emailMsg, passwordMsg)

        //console.log(validate(values, name))

        // setErrors({
        //     ...errors
        // }, ()=> {
        //     validate(values, errors, name)
        // })

        console.log(errors)
    };


    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmit(true);

        console.log(values)
    };


    return {values, handleChange, handleSubmit, errors}
};

//export default useForm;