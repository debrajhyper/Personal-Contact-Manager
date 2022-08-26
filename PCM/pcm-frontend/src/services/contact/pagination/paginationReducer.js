import { PAGINATION_REQUEST, PAGINATION_SUCCESS, PAGINATION_FAILURE } from "./paginationTypes";

const initialState = {
    loading: false,
    success: false,
    itemPerPage: 10,
    pageNumberLimit: 3,
    minPageNumberLimit: 0,
    maxPageNumberLimit: 3
}

const paginationReducer = (state = initialState, action) => {
    switch(action.type) {
        case PAGINATION_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PAGINATION_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                minPageNumberLimit: action.minPageNumberLimit,
                maxPageNumberLimit: action.maxPageNumberLimit
            }
        case PAGINATION_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                minPageNumberLimit: action.minPageNumberLimit,
                maxPageNumberLimit: action.maxPageNumberLimit
            }
        default:
            return state;
    }
}

export default paginationReducer;