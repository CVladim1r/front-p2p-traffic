/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Root Endpoint
     * Check API health
     * @param authorization
     * @returns any Successful Response
     * @throws ApiError
     */
    public static rootGet(
        authorization: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
            headers: {
                'Authorization': authorization,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
