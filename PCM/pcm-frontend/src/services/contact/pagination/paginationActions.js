import { PAGINATION_REQUEST, PAGINATION_SUCCESS } from "./paginationTypes";

export const setMinMaxPageNumberLimit = (minPageNumberLimit, maxPageNumberLimit) => {
    return dispatch => {
        dispatch(paginationRequest());
        dispatch(paginationSuccess(minPageNumberLimit, maxPageNumberLimit));
    };
};

const paginationRequest = () => {
    return {
        type: PAGINATION_REQUEST
    };
};

const paginationSuccess = (minPageNumberLimit, maxPageNumberLimit) => {
    return {
        type: PAGINATION_SUCCESS,
        minPageNumberLimit: minPageNumberLimit,
        maxPageNumberLimit: maxPageNumberLimit
    };
};

// const paginationFailure = (minPageNumberLimit, maxPageNumberLimit) => {
//     return {
//         type: PAGINATION_FAILURE,
//         minPageNumberLimit: minPageNumberLimit,
//         maxPageNumberLimit: maxPageNumberLimit
//     };
// };