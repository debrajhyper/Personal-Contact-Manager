import { CONTACT_REQUEST, CONTACT_SUCCESS, CONTACT_FAILURE } from "./contactTypes";
import { axiosPrivate, ADD_CONTACT_URL } from "../../api/HomeAPI";
import { toast } from "react-toastify";
import axios from "axios";

const config = {
    headers: {
        'content-type': 'multipart/form-data; boundary=<calculated when request is sent>'
    }
}

export const addContact = (contact) => {
    return dispatch => {
        dispatch(contactRequest());
        const toastLoading = toast.loading("Uploading data to the server")


        const data = new FormData();
        data.append('profilePic', contact.profilePic);
        data.append('name', contact.name);
        data.append('email', contact.email);
        // data.append('favorite', contact.favorite);
        
        // data.append('nickName', contact.nickName);
        // data.append('title', contact.title);
        // data.append('company', contact.company);
        
        // data.append('mobileNumber', contact.mobileNumber);
        // Object.entries(contact.telephoneNumber).map(([key, value]) => {
        //     console.log(key, value)
        //     data.append(`telephoneNumber[${key}]`, value)}
        // );
        // data.append('Contact', JSON.stringify(contact));
        // data.append('country', contact.country);
        // data.append('dateOfBirth', contact.dateOfBirth);
        // data.append('address', contact.address);
        // data.append('relationship', contact.relationship);
        // data.append('zodiacSign', contact.zodiacSign);
        // data.append('tags', contact.tags);
        // data.append('website', contact.website);
        // data.append('socialLinks', contact.socialLinks);
        // data.append('description', contact.description);
        let formObject = Object.fromEntries(data.entries())


        // const createFormData = (data) => {
        //     console.log(data)
        //     return Object.keys(data).reduce((formData, key) => {
        //         console.log(key, data[key])
        //     formData.append(key, data[key]);
        //     return formData;
        //     }, new FormData());
        // };
        // const data = createFormData(contact);
        console.log('DATA ->', formObject)


        axiosPrivate.post(ADD_CONTACT_URL, data, config)
        // axios.post("http://localhost:1010/add-contact", contact, config)
        .then(response => {
            dispatch(contactSuccess(response?.data));
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
            dispatch(contactFailure(error?.response?.data?.message));
            const errorMessage = error?.response?.data?.message?.length > 100 ? 'Something went wrong' : error?.response?.data?.message;
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

const contactRequest = () => {
    return {
        type: CONTACT_REQUEST
    }
};

const contactSuccess = (contact) => {
    return {
        type: CONTACT_SUCCESS,
        payload: contact,
        error: ''
    }
};

const contactFailure = (error) => {
    return {
        type: CONTACT_FAILURE,
        payload: {},
        error: error
    }
}