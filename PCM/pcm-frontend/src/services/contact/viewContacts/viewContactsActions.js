import { VIEW_CONTACTS_REQUEST, VIEW_CONTACTS_SUCCESS, VIEW_CONTACTS_FAILURE, VIEW_CONTACTS_CHECKED, VIEW_CONTACTS_CHECKED_ALL } from "./viewContactsTypes";
import { axiosPrivate, VIEW_CONTACTS_URL } from "../../../api/HomeAPI";
import { toast } from "react-toastify";

export const viewContacts = pageNo => {
    return dispatch => {
        dispatch(viewContactsRequest());
        
        axiosPrivate.get(VIEW_CONTACTS_URL + pageNo)
        .then(response => {
            dispatch(viewContactsSuccess(response?.data?.contacts?.content, response?.data?.totalContacts, response?.data?.page , response?.data?.totalPages));
        })
        .catch(error => {
            dispatch(viewContactsFailure(error?.response?.data?.message));
            toast.error(error?.response?.data?.message);
        })
    };
};

export const ContactsChecked = (id, checked) => {
    return dispatch => {
        dispatch(viewContactsChecked(id, checked));
    };
};

export const ContactsCheckedAll = checked => {
    return dispatch => {
        dispatch(viewContactsCheckedAll(checked));
    };
};

const viewContactsRequest = () => {
    return {
        type: VIEW_CONTACTS_REQUEST
    };
};

const viewContactsSuccess = (contacts, totalContacts, page, totalPages) => {
    return {
        type: VIEW_CONTACTS_SUCCESS,
        payload: contacts,
        totalContacts: totalContacts,
        page: page,
        totalPages: totalPages,
        error: ''
    };
};

const viewContactsFailure = error => {
    return {
        type: VIEW_CONTACTS_FAILURE,
        payload: [],
        totalContacts: 0,
        page: 0,
        totalPages: 0,
        error: error
    };
};

const viewContactsChecked = (id, checked) => {
    return {
        type: VIEW_CONTACTS_CHECKED,
        payload: id,
        checked: checked
    };
};

const viewContactsCheckedAll = checked => {
    return {
        type: VIEW_CONTACTS_CHECKED_ALL,
        checked: checked
    };
};