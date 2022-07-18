import { CONTACT_REQUEST, CONTACT_SUCCESS, CONTACT_FAILURE } from "./viewContactsTypes";
import { axiosPrivate, VIEW_CONTACTS_URL } from "../../../api/HomeAPI";

export const viewContacts = (pageNo) => {
    return (dispatch) => {
        dispatch(viewContactsRequest());
        
        axiosPrivate.get(VIEW_CONTACTS_URL + pageNo)
        .then(response => {
            console.log('RESPONSE -> ', response.data);
            dispatch(viewContactsSuccess(response?.data?.contacts?.content, response?.data?.totalContacts, response?.data?.page , response?.data?.totalPages));
        })
        .catch(error => {
            console.log('ERROR -> ', error);
            dispatch(viewContactsFailure(error?.response?.data?.message));
        })
    }
}

const viewContactsRequest = () => {
    return {
        type: CONTACT_REQUEST
    }
};

const viewContactsSuccess = (contacts, totalContacts, page, totalPages) => {
    return {
        type: CONTACT_SUCCESS,
        payload: contacts,
        totalContacts: totalContacts,
        page: page,
        totalPages: totalPages,
        error: ''
    }
};

const viewContactsFailure = (error) => {
    return {
        type: CONTACT_FAILURE,
        payload: [],
        totalContacts: 0,
        page: 0,
        totalPages: 0,
        error: error
    }
}