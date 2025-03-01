/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_update_user_photo_api_v1_p2p_user_update_user_photo_post } from '../models/Body_update_user_photo_api_v1_p2p_user_update_user_photo_post';
import type { PrizeOutAddUUID } from '../models/PrizeOutAddUUID';
import type { StartUserIn } from '../models/StartUserIn';
import type { StartUserOut } from '../models/StartUserOut';
import type { TransactionCurrencyType } from '../models/TransactionCurrencyType';
import type { UserData } from '../models/UserData';
import type { UserMainPageOut } from '../models/UserMainPageOut';
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
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get User Main Data
     * @param authorization
     * @returns UserMainPageOut Successful Response
     * @throws ApiError
     */
    public static getUserMainDataApiV1P2PUserMainDataGet(
        authorization: string,
    ): CancelablePromise<UserMainPageOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/p2p/user/main_data',
            headers: {
                'Authorization': authorization,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get User Data
     * @param userTgId
     * @returns UserData Successful Response
     * @throws ApiError
     */
    public static getUserDataApiV1P2PUserGetUserDataGet(
        userTgId: number,
    ): CancelablePromise<UserData> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/p2p/user/get_user_data',
            query: {
                'user_tg_id': userTgId,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update User Photo
     * @param authorization
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static updateUserPhotoApiV1P2PUserUpdateUserPhotoPost(
        authorization: string,
        requestBody: Body_update_user_photo_api_v1_p2p_user_update_user_photo_post,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/p2p/user/update_user_photo',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update User Vip
     * @param authorization
     * @param currentlyType
     * @returns any Successful Response
     * @throws ApiError
     */
    public static updateUserVipApiV1P2PUserUpdateUserVipPost(
        authorization: string,
        currentlyType?: TransactionCurrencyType,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/p2p/user/update_user_vip',
            headers: {
                'Authorization': authorization,
            },
            query: {
                'currently_type': currentlyType,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Active Prize
     * @param authorization
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getActivePrizeApiV1P2PUserActivePrizeGet(
        authorization: string,
    ): CancelablePromise<(PrizeOutAddUUID | null)> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/p2p/user/active_prize',
            headers: {
                'Authorization': authorization,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }
}
