import { USER_REQUEST, USER_SUCCESS, USER_FAILURE } from "./userTypes";

const initialState = {
    loading: false,
    currentUser: {},
    currentUserError: '',
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case USER_SUCCESS:
            return {
                loading: false,
                currentUser: action.payload,
                currentUserError: action.error
            };
        case USER_FAILURE:
            return {
                loading: false,
                currentUser: action.payload,
                currentUserError: action.error
            };
        default:
            return state;
    }
}

export default userReducer;