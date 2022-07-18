import { CONTACT_REQUEST, CONTACT_SUCCESS, CONTACT_FAILURE } from "./searchContactTypes";
import { axiosPrivate, SEARCH_CONTACT_URL } from "../../../api/HomeAPI";

export const searchContact = (quarry) => {
    return (dispatch) => {
        dispatch(searchContactRequest());

        axiosPrivate.get(SEARCH_CONTACT_URL + quarry)
        .then(response => {
            dispatch(searchContactSuccess(response?.data));
        })
        .catch(error => {
            dispatch(searchContactFailure(error?.response?.data?.message));
        })
    }
}

const searchContactRequest = () => {
    return {
        type: CONTACT_REQUEST
    }
}

const searchContactSuccess = (contact) => {
    return {
        type: CONTACT_SUCCESS,
        payload: contact,
        error: ''
    }
}

const searchContactFailure = (error) => {
    return {
        type: CONTACT_FAILURE,
        payload: {},
        error: error
    }
}