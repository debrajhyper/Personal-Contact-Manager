import { CONTACT_REQUEST, CONTACT_SUCCESS, CONTACT_FAILURE } from "./deleteContactTypes";
import { axiosPrivate, DELETE_CONTACT_URL, DELETE_SELECTED_CONTACTS_URL } from "../../../api/HomeAPI";
import { toast } from "react-toastify";


export const deleteContact = (cId) => {
    return dispatch => {
        dispatch(deleteContactRequest());

        axiosPrivate.delete(DELETE_CONTACT_URL + cId)
        .then(response => {
            dispatch(deleteContactSuccess(response?.data, 1));
            setTimeout(() => {
                dispatch(deleteContactFailure(''));
            }, 1000);
            toast.success(response?.data);
        })
        .catch(error => {
            dispatch(deleteContactFailure(error?.response?.data?.message));
            toast.error(error?.response?.data?.message);
        })
    }
}

export const deleteSelectedContacts = (deleteIds) => {
    return (dispatch) => {
        dispatch(deleteContactRequest());

        axiosPrivate.delete(DELETE_SELECTED_CONTACTS_URL + deleteIds)
        .then(response => {
            console.log('RESPONSE -> ', response.data, deleteIds.length);
            dispatch(deleteContactSuccess(response?.data, deleteIds.length));
            setTimeout(() => {
                dispatch(deleteContactFailure(''));
            }, 1000);
            toast.success(response?.data);
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

const deleteContactSuccess = (message, allDeleted) => {
    return {
        type: CONTACT_SUCCESS,
        allDeleted: allDeleted,
        payload: message,
        error: ''
    }
}

const deleteContactFailure = (error) => {
    return {
        type: CONTACT_FAILURE,
        allDeleted: 0,
        payload: '',
        error: error
    }
}