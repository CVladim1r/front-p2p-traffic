/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdCreate } from '../models/AdCreate';
import type { AdCreateOut } from '../models/AdCreateOut';
import type { AdOut } from '../models/AdOut';
import type { AdOutOne } from '../models/AdOutOne';
import type { CategoriesAds } from '../models/CategoriesAds';
import type { ChatAllOut } from '../models/ChatAllOut';
import type { ChatMessage } from '../models/ChatMessage';
import type { ChatMessageCreate } from '../models/ChatMessageCreate';
import type { ChatOut } from '../models/ChatOut';
import type { ChatPinOut } from '../models/ChatPinOut';
import type { DealCreate } from '../models/DealCreate';
import type { DealOut } from '../models/DealOut';
import type { DealOutCOMPLETE } from '../models/DealOutCOMPLETE';
import type { DealsOut } from '../models/DealsOut';
import type { PinChatRequest } from '../models/PinChatRequest';
import type { ReviewCreate } from '../models/ReviewCreate';
import type { ReviewOut } from '../models/ReviewOut';
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
        category?: CategoriesAds,
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
     * @returns AdOutOne Successful Response
     * @throws ApiError
     */
    public static getAdApiV1P2POrdersAdsAdUuidGet(
        adUuid: string,
    ): CancelablePromise<AdOutOne> {
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
     * @param authorization
     * @param requestBody
     * @param bonusId UUID бонуса для использования при создании сделки
     * @returns DealsOut Successful Response
     * @throws ApiError
     */
    public static createDealApiV1P2POrdersDealsPost(
        authorization: string,
        requestBody: DealCreate,
        bonusId?: (string | null),
    ): CancelablePromise<DealsOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/p2p/orders/deals',
            headers: {
                'Authorization': authorization,
            },
            query: {
                'bonus_id': bonusId,
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
     * @param authorization
     * @returns DealsOut Successful Response
     * @throws ApiError
     */
    public static getUserDealsApiV1P2POrdersDealsGet(
        authorization: string,
    ): CancelablePromise<Array<DealsOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/p2p/orders/deals',
            headers: {
                'Authorization': authorization,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Deal
     * @param dealUuid
     * @returns DealOut Successful Response
     * @throws ApiError
     */
    public static getDealApiV1P2POrdersDealsDealUuidGet(
        dealUuid: string,
    ): CancelablePromise<DealOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/p2p/orders/deals/{deal_uuid}',
            path: {
                'deal_uuid': dealUuid,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Confirm Deal
     * @param dealUuid
     * @param authorization
     * @returns DealOutCOMPLETE Successful Response
     * @throws ApiError
     */
    public static confirmDealApiV1P2POrdersDealsDealUuidConfirmPost(
        dealUuid: string,
        authorization: string,
    ): CancelablePromise<DealOutCOMPLETE> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/p2p/orders/deals/{deal_uuid}/confirm',
            path: {
                'deal_uuid': dealUuid,
            },
            headers: {
                'Authorization': authorization,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Chat
     * @param dealUuid
     * @param authorization
     * @returns ChatOut Successful Response
     * @throws ApiError
     */
    public static getChatApiV1P2POrdersDealsDealUuidChatGet(
        dealUuid: string,
        authorization: string,
    ): CancelablePromise<ChatOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/p2p/orders/deals/{deal_uuid}/chat',
            path: {
                'deal_uuid': dealUuid,
            },
            headers: {
                'Authorization': authorization,
            },
            errors: {
                403: `Forbidden`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Send Chat Message
     * @param dealUuid
     * @param authorization
     * @param requestBody
     * @returns ChatMessage Successful Response
     * @throws ApiError
     */
    public static sendChatMessageApiV1P2POrdersDealsDealUuidChatMessagesPost(
        dealUuid: string,
        authorization: string,
        requestBody: ChatMessageCreate,
    ): CancelablePromise<ChatMessage> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/p2p/orders/deals/{deal_uuid}/chat/messages',
            path: {
                'deal_uuid': dealUuid,
            },
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Pin Chat
     * @param chatUuid
     * @param authorization
     * @param requestBody
     * @returns ChatPinOut Successful Response
     * @throws ApiError
     */
    public static pinChatApiV1P2POrdersDealsChatUuidChatPinPatch(
        chatUuid: string,
        authorization: string,
        requestBody: PinChatRequest,
    ): CancelablePromise<ChatPinOut> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/p2p/orders/deals/{chat_uuid}/chat/pin',
            path: {
                'chat_uuid': chatUuid,
            },
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get All Chats
     * @param authorization
     * @returns ChatAllOut Successful Response
     * @throws ApiError
     */
    public static getAllChatsApiV1P2POrdersChatsGet(
        authorization: string,
    ): CancelablePromise<Array<ChatAllOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/p2p/orders/chats',
            headers: {
                'Authorization': authorization,
            },
            errors: {
                403: `Forbidden`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Review
     * @param dealUuid
     * @param authorization
     * @param requestBody
     * @returns ReviewOut Successful Response
     * @throws ApiError
     */
    public static createReviewApiV1P2POrdersDealsDealUuidReviewsPost(
        dealUuid: string,
        authorization: string,
        requestBody: ReviewCreate,
    ): CancelablePromise<ReviewOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/p2p/orders/deals/{deal_uuid}/reviews',
            path: {
                'deal_uuid': dealUuid,
            },
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
}
