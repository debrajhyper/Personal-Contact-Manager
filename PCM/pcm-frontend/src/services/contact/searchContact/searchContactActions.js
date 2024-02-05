import { CONTACT_REQUEST, CONTACT_SUCCESS, CONTACT_FAILURE } from "./searchContactTypes";
import { axiosPrivate, SEARCH_CONTACT_URL } from "../../../api/HomeAPI";

export const searchContact = query => {
    return dispatch => {
        const abortController = new AbortController();
        const config = {
            signal: abortController.signal,
        };

        dispatch(searchContactRequest());

        axiosPrivate.get(`${SEARCH_CONTACT_URL}${query}`, config)
            .then(response => {
                dispatch(searchContactSuccess(response?.data));
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    dispatch(searchContactFailure("Request time out"));
                } else {
                    dispatch(searchContactFailure(error?.response?.data?.message));
                }
            })
    };
};

    const searchContactRequest = () => {
        return {
            type: CONTACT_REQUEST
        };
    };

    const searchContactSuccess = searchedContacts => {
        return {
            type: CONTACT_SUCCESS,
            payload: searchedContacts,
            error: ''
        };
    };

    const searchContactFailure = error => {
        return {
            type: CONTACT_FAILURE,
            payload: {},
            error: error
        };
    };