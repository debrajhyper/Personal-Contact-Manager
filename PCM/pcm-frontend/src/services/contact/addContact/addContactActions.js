import { CONTACT_REQUEST, CONTACT_SUCCESS, CONTACT_FAILURE } from "./addContactTypes";
import { axiosPrivate, ADD_CONTACT_URL } from "../../../api/HomeAPI";
import { toast } from "react-toastify";

const config = {
    headers: {
        'content-type': 'multipart/form-data; boundary=<calculated when request is sent>'
    }
}

export const addContact = (contact) => {
    return dispatch => {
        dispatch(addContactRequest());
        const toastLoading = toast.loading("Uploading data to the server")

        const data = createFormData(contact);
        let formObject = Object.fromEntries(data.entries());
        console.log('SENDING CONTACT DATA -> ', formObject);

        axiosPrivate.post(ADD_CONTACT_URL, data, config)
        .then(response => {
            dispatch(addContactSuccess(response?.data));
            toast.update(
                toastLoading,
                {
                    render: "Contact saved successfully",
                    type: "success",
                    position: "top-right",
                    isLoading: false,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    closeButton: null,
                    delay: 1000,
                }
            );
        })
        .catch(error => {
            dispatch(addContactFailure(error?.response?.data?.message));
            const errorMessage = error?.response?.data?.errors ? error?.response?.data?.errors?.[0]?.defaultMessage : error?.response?.data?.message?.length > 100 ? 'Something went wrong' : error?.response?.data?.message;
            toast.update(
                toastLoading,
                {
                    render: errorMessage,
                    type: "error",
                    position: "top-right",
                    isLoading: false,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    closeButton: null,
                    delay: 1000,
                }
            );
        })
    }
};

const addContactRequest = () => {
    return {
        type: CONTACT_REQUEST
    }
};

const addContactSuccess = (contact) => {
    return {
        type: CONTACT_SUCCESS,
        payload: contact,
        error: ''
    }
};

const addContactFailure = (error) => {
    return {
        type: CONTACT_FAILURE,
        payload: {},
        error: error
    }
}

const createFormData = (data) => {
    return Object.keys(data).reduce((formData, key) => {
        // console.log(key, data[key])
        if(key === 'country'){
            Object.entries(data[key]).map(([key, value]) => {
                return formData.append(`country.${key}`, value)
            });
        }
        else if(key === 'mobileNumber'){
            Object.entries(data[key]).map(([key, value]) => {
                return formData.append(`mobileNumber.${key}`, value)
            });
        }
        else if(key === 'socialLinks'){
            Object.entries(data[key]).map(([key, value]) => {
                return formData.append(`socialLinks.${key}`, value)
            });
        }
        else if(key === 'telephoneNumber'){
            Object.entries(data[key]).map(([key, value]) => {
                return formData.append(`telephoneNumber.${key}`, value)
            });
        }
        // else if(key === 'zodiacSign'){
        //     formData.append('zodiacSign', data[key].name)
        // }
        // else if(key === 'dateOfBirth'){
        //     formData.append(key, data[key].split('-').reverse().join('-'))
        // }
        else {
            formData.append(key, data[key]);
        }
        return formData;
    }, new FormData());
};