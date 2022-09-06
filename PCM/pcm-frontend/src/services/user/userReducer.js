import { USER_REQUEST, USER_SUCCESS, USER_FAILURE } from "./userTypes";

const initialState = {
    loading: false,
    currentUser: {},
    error: '',
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case USER_SUCCESS:
            return {
                loading: false,
                currentUser: action.payload,
                error: action.error
            };
        case USER_FAILURE:
            return {
                loading: false,
                currentUser: action.payload,
                error: action.error
            };
        default:
            return state;
    }
}

export default userReducer;