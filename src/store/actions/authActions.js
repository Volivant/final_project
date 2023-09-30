import { 
    USER_AUTH_SUCCESS, 
    USER_AUTH_REQUEST, 
    USER_AUTH_FAILURE, 
    USER_INFO_COMPANY_COUNT_SUCCESS,
    USER_INFO_COMPANY_LIMIT_SUCCESS,
    USER_LOGOUT
} from './actionTypes';

import axios from 'axios';


const API_USER_URL = 'https://gateway.scan-interfax.ru/api/v1/account/login';
const API_USER_INFO_URL = 'https://gateway.scan-interfax.ru/api/v1/account/info';

export const userAuth = (loginUser, passwordUser) => {
    return async dispatch => {
        dispatch(userAuthRequest(true));
        const requestOptions = {
                "login": loginUser,
                "password": passwordUser
        };
        await axios
            .post(API_USER_URL, requestOptions)
            .then(res => {
                dispatch(userAuthSuccess(true));
                localStorage.clear();
                localStorage.setItem('tokenData', JSON.stringify(res.data));
                
            })
            .catch(err => {
                dispatch(userAuthFailure(err.message));
            });
        dispatch(userAuthRequest(true));
        const userTocken = JSON.parse(localStorage.getItem('tokenData'));
        
        const requestOptionsInfo = {
            headers: {
                "Authorization": `Bearer ${userTocken.accessToken}`
            }
        };
        await axios
            .get(API_USER_INFO_URL, requestOptionsInfo)
            .then(res => {
                dispatch(userInfoCompanyCountSuccess(res.data.eventFiltersInfo.usedCompanyCount));
                dispatch(userInfoCompanyLimitSuccess(res.data.eventFiltersInfo.companyLimit));
                // window.location.href = '/faq';
            })
            .catch(err => {
                dispatch(userAuthFailure(err.message));
            });
    };
};

export function userAuthSuccess(isAuth) {
    return {
        type: USER_AUTH_SUCCESS,
        payload: {isAuth}
    };
};

export function userAuthRequest(loadingUser) {
    return {
        type: USER_AUTH_REQUEST,
        payload: {loadingUser}
    };
};

export function userAuthFailure(error) {
    return {
        type: USER_AUTH_FAILURE,
        payload: error
    };
};

export function userInfoCompanyCountSuccess(usedCompanyCount) {
    return {
        type: USER_INFO_COMPANY_COUNT_SUCCESS,
        payload: usedCompanyCount
    };
};

export function userInfoCompanyLimitSuccess(companyLimit) {
    return {
        type: USER_INFO_COMPANY_LIMIT_SUCCESS,
        payload: companyLimit
    };
};

export function userLogout(isAuth) {
    return {
        type: USER_LOGOUT,
        payload: {isAuth}
    };
};