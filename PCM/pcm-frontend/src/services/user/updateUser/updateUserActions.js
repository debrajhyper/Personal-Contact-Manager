import { UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE } from './updateUserTypes';
import { axiosPrivate, UPDATE_USER_URL, config } from '../../../api/HomeAPI';
import { toast } from "react-toastify";
import { createFormData } from '../../../validation/FormData';

export const updateUser = (user) => {
    return dispatch => {
        dispatch(updateUserRequest());
        const toastLoading = toast.loading("Uploading data to the server...");

        const data = createFormData(user);
        let formObject = Object.fromEntries(data.entries());
        console.log('SENDING CONTACT DATA -> ', formObject);

        axiosPrivate.post(UPDATE_USER_URL, data, config)
        .then(response => {
            console.log('RESPONSE DATA -> ', response?.data);
            dispatch(updateUserSuccess(response?.data));
            setTimeout(() => {
                dispatch(updateUserFailure(''));
            }, 1000);
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
            console.log('ERROR DATA -> ', error?.response?.data);
            dispatch(updateUserFailure(error?.response?.data?.message));
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
}

const updateUserRequest = () => {
    return {
        type: UPDATE_USER_REQUEST
    }
};

const updateUserSuccess = (message) => {
    return {
        type: UPDATE_USER_SUCCESS,
        payload: message,
        error: ''
    }
};

const updateUserFailure = (error) => {
    return {
        type: UPDATE_USER_FAILURE,
        payload: '',
        error: error
    }
}