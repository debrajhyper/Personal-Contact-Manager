import { CONTACT_REQUEST, CONTACT_SUCCESS, CONTACT_FAILURE } from "./viewContactTypes";
import { axiosPrivate, VIEW_CONTACT_URL } from "../../../api/HomeAPI";
import { toast } from "react-toastify";

export const viewContact = (cId) => {
    return (dispatch) => {
        dispatch(viewContactRequest());

        axiosPrivate.get(VIEW_CONTACT_URL + cId)
        .then(response => {
            console.log('RESPONSE -> ', response.data);
            dispatch(viewContactSuccess(response?.data));
        })
        .catch(error => {
            console.log('ERROR -> ', error.response);
            dispatch(viewContactFailure(error?.response?.data?.message));
            toast.error(error?.response?.data?.message);
        })
    }
}

const viewContactRequest = () => {
    return {
        type: CONTACT_REQUEST
    }
};

const viewContactSuccess = (contact) => {
    return {
        type: CONTACT_SUCCESS,
        payload: contact,
        error: ''
    }
};

const viewContactFailure = (error) => {
    return {
        type: CONTACT_FAILURE,
        payload: {},
        error: error
    }
}