import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    FETCH_JOBS_REQUEST,
    FETCH_JOBS_SUCCESS,
    FETCH_JOBS_FAILURE,
    FETCH_JOB_BY_ID_REQUEST,
    FETCH_JOB_BY_ID_SUCCESS,
    FETCH_JOB_BY_ID_FAILURE,
    FETCH_PROFILE,
} from "./actionTypes";

const BASE_URL = 'https://apis.ccbp.in';

export const fetchUserRequest = () => {
    return{
        type: FETCH_USER_REQUEST,
    }
};

export const fetchUserSuccess = (token) => {
    return{
        type: FETCH_USER_SUCCESS,
        payload: token,
    }
};

export const fetchUserFailure = (error) => {
    return{
        type: FETCH_USER_FAILURE,
        payload: error
    }
};

export const fetchAllJobsRequest = () => {
    return{
        type: FETCH_JOBS_REQUEST,
    }
};

export const fetchAllJobsSuccess = (data) => {
    return{
        type: FETCH_JOBS_SUCCESS,
        payload: data,
    }
};

export const fetchAllJobsFailure = (data) => {
    return{
        type: FETCH_JOBS_FAILURE,
        payload: data,
    }
};

export const fetchJobRequest = () => {
    return{
        type: FETCH_JOB_BY_ID_REQUEST,
    }
};

export const fetchJobSuccess = (data) => {
    return{
        type: FETCH_JOB_BY_ID_SUCCESS,
        payload: data,
    }
};

export const fetchJobFailure = (data) => {
    return{
        type: FETCH_JOB_BY_ID_FAILURE,
        payload: data,
    }
};

export const fetchProfile = data => {
    return{
        type: FETCH_PROFILE,
        payload: data,
    }
}

export const fetchUser =  (data) => {
    //console.log('fetch user data ::', data);
    return async (dispatch) => {
        dispatch(fetchUserRequest());

        const url = `${BASE_URL}/login`
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
        };
        const response = await fetch(url, options);
        //console.log('API RES::', response);
        const data1 = await response.json()
        //console.log('API DATA :', data1);

        if (response.ok === true) {
            dispatch(fetchUserSuccess(data1));
        } else {
            dispatch(fetchUserFailure(data1));
        }
    }
}