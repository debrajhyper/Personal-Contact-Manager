import { VIEW_CONTACT_REQUEST, VIEW_CONTACT_SUCCESS, VIEW_CONTACT_FAILURE } from "./viewContactTypes";
import { axiosPrivate, VIEW_CONTACT_URL } from "../../../api/HomeAPI";
import { toast } from "react-toastify";

export const viewContact = cId => {
    return dispatch => {
        dispatch(viewContactRequest());

        axiosPrivate.get(VIEW_CONTACT_URL + cId)
        .then(response => {
            dispatch(viewContactSuccess(response?.data));
        })
        .catch(error => {
            dispatch(viewContactFailure(error?.response?.data?.message));
            toast.error(error?.response?.data?.message);
        })
    };
};

const viewContactRequest = () => {
    return {
        type: VIEW_CONTACT_REQUEST
    };
};

const viewContactSuccess = contact => {
    return {
        type: VIEW_CONTACT_SUCCESS,
        payload: contact,
        error: ''
    };
};

const viewContactFailure = error => {
    return {
        type: VIEW_CONTACT_FAILURE,
        payload: {},
        error: error
    };
};