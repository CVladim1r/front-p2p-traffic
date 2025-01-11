/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthIn } from '../models/AuthIn';
import type { AuthOut } from '../models/AuthOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Post Auth
     * @param requestBody
     * @returns AuthOut Successful Response
     * @throws ApiError
     */
    public static postAuthApiV1P2PAuthPost(
        requestBody: AuthIn,
    ): CancelablePromise<AuthOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/p2p/auth',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
