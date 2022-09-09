import { UPDATE_CONTACT_REQUEST, UPDATE_CONTACT_CLEAR, UPDATE_CONTACT_SUCCESS, UPDATE_CONTACT_FAILURE } from "./updateContactTypes";
import { axiosPrivate, UPDATE_CONTACT_URL, config } from "../../../api/HomeAPI";
import { toast } from "react-toastify";
import { createFormData } from "../../../validation/FormData";

export const updateContact = contact => {
    return dispatch => {
        dispatch(updateContactRequest());
        const toastLoading = toast.loading("Uploading data to the server");

        const data = createFormData(contact);
        // let formObject = Object.fromEntries(data.entries());
        // console.log('SENDING CONTACT DATA -> ', formObject);

        axiosPrivate.post(UPDATE_CONTACT_URL, data, config)
        .then(response => {
            dispatch(updateContactSuccess(response?.data));
            setTimeout(() => {
                dispatch(updateContactClear());
            }, 1000);
            toast.update(
                toastLoading,
                {
                    render: "Contact Updated successfully.",
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
            dispatch(updateContactFailure(error?.response?.data?.message));
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

const updateContactRequest = () => {
    return {
        type: UPDATE_CONTACT_REQUEST
    };
};

const updateContactClear = () => {
    return {
        type: UPDATE_CONTACT_CLEAR
    };
};

const updateContactSuccess = message => {
    return {
        type: UPDATE_CONTACT_SUCCESS,
        payload: message,
        error: ''
    };
};

const updateContactFailure = error => {
    return {
        type: UPDATE_CONTACT_FAILURE,
        payload: '',
        error: error
    };
};