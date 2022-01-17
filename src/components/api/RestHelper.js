import { apiBaseUrl } from './ApiConfigs';
// import { Authenticator } from './authorisation.js.bakup';
/**
 * Fetch helper utility class
 */
class FetchHelperComponent {

    /**
     * Default constructor
     * @param {String} apiBaseUrlValue is the base url of the API.  ex: http://hostname:port/api/module/v1.0
     */
    constructor(apiBaseUrlValue) {
        this.apiBaseUrl = apiBaseUrlValue;
        this.accessToken = null;
    }

    auth0Client = null;

    /**
     * Utility method to make a GET API request
     * @param {String} url is the API URL. This URL will be appended to the baseUrl define in this instance
     */
    get(url) {
        const fullUrl = this.apiBaseUrl + url;
        return this.genericGet(fullUrl);
    }

    put(url, obj) {
        const fullUrl = this.apiBaseUrl + url;
        return this.genericPut(fullUrl, { 'Content-Type': 'application/json' }, obj);
    }

    post(url, obj) {
        const fullUrl = this.apiBaseUrl + url;
        return this.genericPost(fullUrl, { 'Content-Type': 'application/json' }, obj);
    }

    genericPost(url, headersValue = {}, obj = {}) {
        return this.genericCall(url, Method.POST, headersValue, obj);
    }

    genericPut(url, headersValue = {}, obj = {}) {
        return this.genericCall(url, Method.PUT, headersValue, obj);
    }

    /**
     * Generic GET call
     * @param {String} url is the API URL. This URL will be appended to the baseUrl define in this instance
     * @param {Object} headersValue headers to be sent as part of this request.  No default headers are provided
     */
    genericGet(url, headersValues = {}) {
        return this.genericCall(url, Method.GET, headersValues);
    }

    /**
     * 
     * @param {String} urlValue is the API URL. This URL will be appended to the baseUrl define in this instance
     * @param {String} methodValue is the HTTP method to use
     * @param {Object} headersValue are the headers to add as part of this request.  key paired value object only.
     */
    async genericCall(urlValue, methodValue, headersValue, bodyObj) {
        //Build headers
        const aggregatedHeaders = {
            "Accept": "application/json",
            ...headersValue
        }

        return fetch(urlValue, {
            body: bodyObj ? JSON.stringify(bodyObj) : null,
            method: methodValue,
            headers: aggregatedHeaders,
            mode: 'cors'
            //credentials: 'same-origin'
        }).then(async (resp) => {
            // const apiResponse = new ApiResponse(resp.status, resp.statusText, resp.url, await resp.json());
            if (resp.ok) { // HTTP code in rage between 200 to 299
                return Promise.resolve(new ApiResponse(resp.status, resp.statusText, resp.url, await resp.json()));
            } if (resp.status === 401) {
                return Promise.reject(new ApiResponse(resp.status, resp.statusText, resp.url));
            }
            return Promise.reject(new ApiResponse(resp.status, resp.statusText, resp.url, await resp.json()));
        }).catch((error) => {
            return Promise.reject(error);
        });
    }
}

/**
 * Holds used REST Methods for our APIs
 */
export class Method {
    static GET = 'GET';  //Read
    static POST = 'POST'; // Create
    static PUT = 'PUT'; // Update an existing one, by replacing its full content
    static PATCH = 'PATCH' // Partially update a resource
}

/**
 * Represents a HTTP response from the server request
 */
export class ApiResponse {

    /**
     * 
     * @param {number} status is the HTTP returned code as received from the server
     * @param {string} statusTxt is the status text corresponding to the HTTP numeric code value
     * @param {string} url is the URL that this response came from
     * @param {object} payload is the actual payload
     */
    constructor(status, statusTxt, url, payload) {
        this.status = status;
        this.statusText = statusTxt;
        this.urlPath = url;
        this.dataObject = payload;
    }

    /**
     * Returns if this api response is considered OK based on HTTP codes.
     * @returns {boolean} true when the status is in the 200 range, otherwise false
     */
    isOk() {
        return this.status >= HTTPStatusCode.SUCCESS_OK && this.status < HTTPStatusCode.REDIRECT_MultipleChoice;
    }
}

export class HTTPStatusCode {
    static CLIENT_ERROR_BadRequest = 400;
    static CLIENT_ERROR_NotFound = 404;
    static SUCCESS_OK = 200;
    static SUCCESS_Created = 201;
    static SUCCESS_PartialContent = 206;
    static REDIRECT_MultipleChoice = 300;
    static ERROR_ServerError = 500;

    static isNotFound(error) {
        return error && error.status === HTTPStatusCode.NotFound;
    }

    static isOK(error) {
        return error === HTTPStatusCode.SUCCESS_OK;
    }

    static isSuccess(error) {
        return error >= this.SUCCESS_OK && error < this.REDIRECT_MultipleChoice;
    }

    static isError(error) {
        return error >= this.CLIENT_ERROR_BadRequest;
    }

}

export const ApiHelper = new FetchHelperComponent(apiBaseUrl);