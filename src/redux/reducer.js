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

const initialState = {
    isLoggedIn: false,
    isLoading: false,
    token: null,
    allJobs: [],
    jobById: null,
    error: null,
    profile: null,
};

const reducer = ( state=initialState, action ) => {
    //console.log('state ::', state);
    //console.log('action', action);
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return{
                ...state,
                isLoading: true,
            };

        case FETCH_USER_SUCCESS:
            return{
                ...state,
                isLoading: false,
                isLoggedIn: true,
                token: action.payload['jwt_token'],
            };
    
        case FETCH_USER_FAILURE:
            return{
                ...state,
                isLoading: false,
                isLoggedIn: false,
                error: action.payload['error_msg'],
            };
    
        default:
            return state;
    }
};

export default reducer;