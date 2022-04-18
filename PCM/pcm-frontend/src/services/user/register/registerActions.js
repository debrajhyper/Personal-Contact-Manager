import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./registerTypes";
import axios from "../../../api/HomeAPI";
import { SIGNUP_URL } from "../../../api/HomeAPI";
import { toast } from "react-toastify";

export const registerUser = (user) => {
    return dispatch => {
        dispatch(signupRequest());
        const toastLoading = toast.loading("Uploading data to the server")
        axios.post(SIGNUP_URL, user)
        .then(response => {
            dispatch(signupSuccess(true, response?.status));
            toast.update(
                toastLoading,
                {
                    render: "Successfully Registered",
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
            dispatch(signupFailure(false, error?.response?.status, error?.response?.data?.message));
            toast.update(
                toastLoading,
                {
                    render: "Something went wrong",
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
        payload: '',
        status: null,
        error: ''
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

const signupFailure = (isRegistered, status, error) => {
    return {
        type: SIGNUP_FAILURE,
        payload: isRegistered,
        status: status,
        error: error,
    };
};