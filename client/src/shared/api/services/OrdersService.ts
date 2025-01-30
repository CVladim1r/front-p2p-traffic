/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdCreate } from '../models/AdCreate';
import type { AdCreateOut } from '../models/AdCreateOut';
import type { AdOut } from '../models/AdOut';
import type { Categories } from '../models/Categories';
import type { DealCreate } from '../models/DealCreate';
import type { DealOut } from '../models/DealOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrdersService {
    /**
     * Create Ad
     * @param authorization
     * @param requestBody
     * @returns AdCreateOut Successful Response
     * @throws ApiError
     */
    public static createAdApiV1P2POrdersNewAdPost(
        authorization: string,
        requestBody: AdCreate,
    ): CancelablePromise<AdCreateOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/p2p/orders/new_ad',
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
    /**
     * Get Ads
     * @param category
     * @returns AdOut Successful Response
     * @throws ApiError
     */
    public static getAdsApiV1P2POrdersAdsGet(
        category?: Categories,
    ): CancelablePromise<Array<AdOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/p2p/orders/ads',
            query: {
                'category': category,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Ad
     * @param adUuid
     * @returns AdOut Successful Response
     * @throws ApiError
     */
    public static getAdApiV1P2POrdersAdsAdUuidGet(
        adUuid: string,
    ): CancelablePromise<AdOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/p2p/orders/ads/{ad_uuid}',
            path: {
                'ad_uuid': adUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Deal
     * @param tgId
     * @param requestBody
     * @returns DealOut Successful Response
     * @throws ApiError
     */
    public static createDealApiV1P2POrdersDealsPost(
        tgId: number,
        requestBody: DealCreate,
    ): CancelablePromise<DealOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/p2p/orders/deals',
            query: {
                'tg_id': tgId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get User Deals
     * @param tgId
     * @returns DealOut Successful Response
     * @throws ApiError
     */
    public static getUserDealsApiV1P2POrdersDealsGet(
        tgId: number,
    ): CancelablePromise<Array<DealOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/p2p/orders/deals',
            query: {
                'tg_id': tgId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Deal
     * @param dealUuid
     * @param tgId
     * @returns DealOut Successful Response
     * @throws ApiError
     */
    public static getDealApiV1P2POrdersDealsDealUuidGet(
        dealUuid: string,
        tgId: number,
    ): CancelablePromise<DealOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/p2p/orders/deals/{deal_uuid}',
            path: {
                'deal_uuid': dealUuid,
            },
            query: {
                'tg_id': tgId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
