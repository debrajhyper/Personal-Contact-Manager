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
        axiosPrivate.post(ADD_CONTACT_URL, contact, config)
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