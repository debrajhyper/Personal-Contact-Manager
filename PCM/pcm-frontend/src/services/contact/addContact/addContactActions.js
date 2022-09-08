import { ADD_CONTACT_REQUEST, ADD_CONTACT_SUCCESS, ADD_CONTACT_FAILURE } from "./addContactTypes";
import { axiosPrivate, ADD_CONTACT_URL, config } from "../../../api/HomeAPI";
import { createFormData } from "../../../validation/FormData";
import { toast } from "react-toastify";

export const addContact = contact => {
    return dispatch => {
        dispatch(addContactRequest());
        const toastLoading = toast.loading("Uploading data to the server");

        const data = createFormData(contact);
        // let formObject = Object.fromEntries(data.entries());
        // console.log('SENDING CONTACT DATA -> ', formObject);

        axiosPrivate.post(ADD_CONTACT_URL, data, config)
            .then(response => {
                dispatch(addContactSuccess(response?.data));
                toast.update(
                    toastLoading,
                    {
                        render: response?.data,
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
    };
};

const addContactRequest = () => {
    return {
        type: ADD_CONTACT_REQUEST
    };
};

const addContactSuccess = message => {
    return {
        type: ADD_CONTACT_SUCCESS,
        payload: message,
        error: ''
    };
};

const addContactFailure = error => {
    return {
        type: ADD_CONTACT_FAILURE,
        payload: '',
        error: error
    };
};