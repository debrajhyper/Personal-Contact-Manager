import { CONTACT_REQUEST, CONTACT_SUCCESS, CONTACT_FAILURE } from "./deleteContactTypes";
import { axiosPrivate, DELETE_CONTACT_URL } from "../../../api/HomeAPI";
import { toast } from "react-toastify";


export const deleteContact = (cId) => {
    return (dispatch) => {
        dispatch(deleteContactRequest());

        axiosPrivate.delete(DELETE_CONTACT_URL + cId)
        .then(response => {
            console.log('RESPONSE -> ', response.data);
            dispatch(deleteContactSuccess(response?.data));
            toast.success(response.data);
        })
        .catch(error => {
            console.log('ERROR -> ', error.response);
            dispatch(deleteContactFailure(error?.response?.data?.message));
            toast.error(error?.response?.data?.message);
        })
    }
}

const deleteContactRequest = () => {
    return {
        type: CONTACT_REQUEST
    }
}

const deleteContactSuccess = (status) => {
    return {
        type: CONTACT_SUCCESS,
        payload: status,
        error: ''
    }
}

const deleteContactFailure = (error) => {
    return {
        type: CONTACT_FAILURE,
        payload: '',
        error: error
    }
}