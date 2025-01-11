/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
import type { StartUserIn } from '../models/StartUserIn';
import type { StartUserOut } from '../models/StartUserOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Create User
     * @param authorization
     * @param requestBody
     * @returns StartUserOut Successful Response
     * @throws ApiError
     */
    public static createUserApiV1P2PUserCreateUserPost(
        authorization: string,
        requestBody: StartUserIn,
    ): CancelablePromise<StartUserOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/p2p/user/create_user',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
}