import { 
    USER_REPORT_PUBLICATIONS_REQUEST,
    USER_REPORT_PUBLICATIONS_SUCCESS,
    USER_REPORT_PUBLICATIONS_FAILURE,
    OBJECTSEARCH_REQUEST,
    OBJECTSEARCH_SUCCESS,
    OBJECTSEARCH_FAILURE,
    DOCUMENT_REQUEST,
    DOCUMENT_SUCCESS,
    DOCUMENT_FAILURE,
    SEARCH_CONFIG
} from './actionTypes';

import axios from 'axios';


const API_REPORT_PUBLICATIONS_URL = 'https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms';
const API_REPORT_OBJECT_URL = 'https://gateway.scan-interfax.ru/api/v1/objectsearch';
const API_DOCUMENT_URL = 'https://gateway.scan-interfax.ru/api/v1/documents';

export const loadReportPublications = (
        inputInn, 
        inputTon, 
        inputDoc,
        inputRangeFrom, 
        inputRangeTo, 
        checkFull, 
        checkRole, 
        checkRisk,
        checkTech,
        checkAnons,
        checkReport
    ) => {
    return async dispatch => {
        dispatch(loadReportPublicationsRequest(true));
        const userTocken = JSON.parse(localStorage.getItem('tokenData'));
        
        const requestConfig = {
            headers: {
                "Authorization": `Bearer ${userTocken.accessToken}`,
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        };

        const requestOptions = {
            "issueDateInterval": {
                "startDate": new Date(inputRangeFrom),
                "endDate": new Date(inputRangeTo)
            },
            "searchContext": {
                "targetSearchEntitiesContext": {
                "targetSearchEntities": [
                    {
                    "type": "company",
                    "sparkId": null,
                    "entityId": null,
                    "inn": Number(inputInn),
                    "maxFullness": checkFull,
                    "inBusinessNews": null
                    }
                ],
                "onlyMainRole": checkRole,
                "tonality": inputTon,
                "onlyWithRiskFactors": checkRisk,
                "riskFactors": {
                    "and": [],
                    "or": [],
                    "not": []
                },
                "themes": {
                    "and": [],
                    "or": [],
                    "not": []
                }
                },
                "themesFilter": {
                "and": [],
                "or": [],
                "not": []
                }
            },
            "searchArea": {
                "includedSources": [],
                "excludedSources": [],
                "includedSourceGroups": [],
                "excludedSourceGroups": []
            },
            "attributeFilters": {
                "excludeTechNews": checkTech,
                "excludeAnnouncements": checkAnons,
                "excludeDigests": checkReport
            },
            "similarMode": "duplicates",
            "limit": Number(inputDoc),
            "sortType": "sourceInfluence",
            "sortDirectionType": "desc",
            "intervalType": "month",
            "histogramTypes": [
                "totalDocuments",
                "riskFactors"
            ]
        };
        await axios
            .post(API_REPORT_PUBLICATIONS_URL, requestOptions, requestConfig)
            .then(res => {
                localStorage.removeItem('histogram');
                localStorage.setItem('histogram', JSON.stringify(res.data));
                dispatch(loadReportPublicationsSuccess(true));
            })
            .catch(err => {
                dispatch(loadReportPublicationsFailure(err.message));
            });
        // запрос массива id документов
        dispatch(loadObjectRequest(true));
        await axios
            .post(API_REPORT_OBJECT_URL, requestOptions, requestConfig)
            .then(res => {
                localStorage.removeItem('object');
                localStorage.setItem('object', JSON.stringify(res.data));
                dispatch(loadObjectSuccess(true));
            })
            .catch(err => {
                dispatch(loadObjectFailure(err.message));
            });
    };
};

//запрос документов
export const loadDocuments = () => {
    return async dispatch => {
        const itemDoc = JSON.parse(localStorage.getItem('object'));
        let itemDocs = [];
        for (let i=0; i <= itemDoc.items.length - 1; i++) {
            itemDocs[i] = itemDoc.items[i].encodedId;
        }
        if (itemDoc.items.length > 0) {
            dispatch(loadDocumentRequest(true));
            const userTocken = JSON.parse(localStorage.getItem('tokenData'));
            
            const requestConfig = {
                headers: {
                    "Authorization": `Bearer ${userTocken.accessToken}`,
                    "Content-type": "application/json",
                    "Accept": "application/json"
                }
            };
            const requestOptions = {
                "ids": itemDocs
            };
            await axios
                .post(API_DOCUMENT_URL, requestOptions, requestConfig)
                .then(res => {
                    localStorage.removeItem('documents');//так же очишаем документы
                    localStorage.setItem('documents', JSON.stringify(res.data));
                    dispatch(loadDocumentSuccess(true));
                })
                .catch(err => {
                    dispatch(loadDocumentFailure(err.message));
                });
        }
        
    };
};

export function loadReportPublicationsRequest(loadingData) {
    return {
        type: USER_REPORT_PUBLICATIONS_REQUEST,
        payload: {loadingData}
    };
};

export function loadReportPublicationsSuccess(isReport) {
    return {
        type: USER_REPORT_PUBLICATIONS_SUCCESS,
        payload: {isReport}
    };
};

export function loadReportPublicationsFailure(error) {
    return {
        type: USER_REPORT_PUBLICATIONS_FAILURE,
        payload: error
    };
};

export function loadObjectRequest(loadingObject) {
    return {
        type: OBJECTSEARCH_REQUEST,
        payload: {loadingObject}
    };
};

export function loadObjectSuccess(currentDoc) {
    return {
        type: OBJECTSEARCH_SUCCESS,
        payload: {currentDoc}
    };
};

export function loadObjectFailure(error) {
    return {
        type: OBJECTSEARCH_FAILURE,
        payload: error
    };
};

export function loadDocumentRequest(loadingDocument) {
    return {
        type: DOCUMENT_REQUEST,
        payload: {loadingDocument}
    };
};

export function loadDocumentSuccess(isDocument) {
    return {
        type: DOCUMENT_SUCCESS,
        payload: {isDocument}
    };
};

export function loadDocumentFailure(error) {
    return {
        type: DOCUMENT_FAILURE,
        payload: error
    };
};

export function setSearchConfig(searchConfig) {
    return {
        type: SEARCH_CONFIG,
        payload: searchConfig
    };
};