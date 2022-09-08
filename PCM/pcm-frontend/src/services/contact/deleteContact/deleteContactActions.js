import { DELETE_CONTACT_REQUEST, DELETE_CONTACT_CLEAR, DELETE_CONTACT_SUCCESS, DELETE_CONTACT_FAILURE } from "./deleteContactTypes";
import { axiosPrivate, DELETE_CONTACT_URL, DELETE_SELECTED_CONTACTS_URL } from "../../../api/HomeAPI";
import { toast } from "react-toastify";

export const deleteContact = (cId, contactsLength) => {
    return dispatch => {
        dispatch(deleteContactRequest());

        axiosPrivate.delete(DELETE_CONTACT_URL + cId)
        .then(response => {
            dispatch(deleteContactSuccess(response?.data, contactsLength === 1 ? 1 : 0));
            setTimeout(() => {
                dispatch(deleteContactClear());
            }, 1000);
            toast.success(response?.data);
        })
        .catch(error => {
            dispatch(deleteContactFailure(error?.response?.data?.message));
            toast.error(error?.response?.data?.message);
        })
    };
};

export const deleteSelectedContacts = deleteIds => {
    return dispatch => {
        dispatch(deleteContactRequest());

        axiosPrivate.delete(DELETE_SELECTED_CONTACTS_URL + deleteIds)
        .then(response => {
            dispatch(deleteContactSuccess(response?.data, deleteIds.length));
            setTimeout(() => {
                dispatch(deleteContactClear());
            }, 1000);
            toast.success(response?.data);
        })
        .catch(error => {
            dispatch(deleteContactFailure(error?.response?.data?.message));
            toast.error(error?.response?.data?.message);
        })
    };
};

const deleteContactRequest = () => {
    return {
        type: DELETE_CONTACT_REQUEST
    };
};

const deleteContactClear = () => {
    return {
        type: DELETE_CONTACT_CLEAR
    };
};

const deleteContactSuccess = (message, allDeleted) => {
    return {
        type: DELETE_CONTACT_SUCCESS,
        allDeleted: allDeleted,
        payload: message,
        error: ''
    };
};

const deleteContactFailure = error => {
    return {
        type: DELETE_CONTACT_FAILURE,
        allDeleted: 0,
        payload: '',
        error: error
    };
};