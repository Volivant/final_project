import { 
    USER_AUTH_SUCCESS, 
    USER_AUTH_REQUEST, 
    USER_AUTH_FAILURE, 
    USER_INFO_COMPANY_COUNT_SUCCESS,
    USER_INFO_COMPANY_LIMIT_SUCCESS,
    USER_REPORT_PUBLICATIONS_REQUEST,
    USER_REPORT_PUBLICATIONS_SUCCESS,
    USER_REPORT_PUBLICATIONS_FAILURE,
    OBJECTSEARCH_REQUEST,
    OBJECTSEARCH_SUCCESS,
    OBJECTSEARCH_FAILURE,
    DOCUMENT_REQUEST,
    DOCUMENT_SUCCESS,
    DOCUMENT_FAILURE,
    SEARCH_CONFIG,
    USER_LOGOUT
} from '../actions/actionTypes';


export default function rootReducer (state = [], action) {
    switch (action.type) {
        case USER_AUTH_REQUEST:
            return {
                ...state,
                loadingUser: true,
                error: null,
            };
        case USER_AUTH_SUCCESS:
            return {
                ...state,
                isAuth: true,
            };
        case USER_AUTH_FAILURE:
            return {
                ...state,
                loadingUser: false,
                error: action.payload,
            };
        case USER_INFO_COMPANY_COUNT_SUCCESS:
            return {
                ...state,
                usedCompanyCount: action.payload,
            };
        case USER_INFO_COMPANY_LIMIT_SUCCESS:
            return {
                ...state,
                loadingUser: false,
                companyLimit: action.payload,
            };
        case USER_REPORT_PUBLICATIONS_REQUEST:
            return {
                ...state,
                loadingData: true,
                isReport: false,
                error: null,
            };
        case USER_REPORT_PUBLICATIONS_SUCCESS:
            return {
                ...state,
                loadingData: false,
                isReport: true,
            };
        case USER_REPORT_PUBLICATIONS_FAILURE:
            return {
                ...state,
                loadingData: false,
                error: action.payload,
            };
        case OBJECTSEARCH_REQUEST:
            return {
                ...state,
                loadingObject: true,
                isObject: false,
                error: null,
            };
        case OBJECTSEARCH_SUCCESS:
            return {
                ...state,
                loadingObject: false,
                isObject: true,
                currentDoc: 0
            };
        case OBJECTSEARCH_FAILURE:
            return {
                ...state,
                loadingObject: false,
                error: action.payload,
            };
        case DOCUMENT_REQUEST:
            return {
                ...state,
                loadingDocument: true,
                isDocument: false,
                error: null,
            };
        case DOCUMENT_SUCCESS:
            return {
                ...state,
                loadingDocument: false,
                isDocument: true,
                currentDoc: state.currentDoc + 2
            };
        case DOCUMENT_FAILURE:
            return {
                ...state,
                loadingDocument: false,
                error: action.payload,
                
            };
        case SEARCH_CONFIG:
            return {
                ...state,
                searchConfig: action.payload,
            };
        case USER_LOGOUT:
            return {
                ...state,
                isAuth: false,
            };
        default:
            return state;
    }
};