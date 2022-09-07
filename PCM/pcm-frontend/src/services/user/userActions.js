import { USER_REQUEST, USER_SUCCESS, USER_FAILURE } from "./userTypes";
import { axiosPrivate, CURRENT_USER_URL } from "../../api/HomeAPI";
import { toast } from "react-toastify";

export const getCurrentUser = () => {
    return dispatch => {
        dispatch(userRequest());
        
        axiosPrivate.get(CURRENT_USER_URL)
        .then(response => {
            dispatch(userSuccess(response?.data));
        })
        .catch(error => {
            dispatch(userFailure(error?.response?.data?.message));
            toast.error(error?.response?.data?.message);
        });
    };
};

const userRequest = () => {
    return {
        type: USER_REQUEST,
    };
};

const userSuccess = user => {
    return {
        type: USER_SUCCESS,
        payload: user,
        error: '',
    };
};

const userFailure = error => {
    return {
        type: USER_FAILURE,
        payload: {},
        error: error,
    };
};