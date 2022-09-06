import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./registerTypes";
import axios, { SIGNUP_URL } from "../../../api/HomeAPI";
import { toast } from "react-toastify";

export const registerUser = user => {
    return dispatch => {
        dispatch(signupRequest());
        const toastLoading = toast.loading("Uploading data to the server");

        axios.post(SIGNUP_URL, user)
            .then(response => {
                dispatch(signupSuccess(true, response?.status));
                setTimeout(() => {
                    dispatch(signupSuccess(false, response?.status));
                }, 100);
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
                dispatch(signupFailure(error?.response?.status, error?.response?.data?.message));
                toast.update(
                    toastLoading,
                    {
                        render: error?.response?.data?.message,
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
            });
    };
};

const signupRequest = () => {
    return {
        type: SIGNUP_REQUEST,
    };
};

const signupSuccess = (isRegistered, status) => {
    return {
        type: SIGNUP_SUCCESS,
        payload: isRegistered,
        status: status,
        error: '',
    };
};

const signupFailure = (status, error) => {
    return {
        type: SIGNUP_FAILURE,
        payload: false,
        status: status,
        error: error,
    };
};