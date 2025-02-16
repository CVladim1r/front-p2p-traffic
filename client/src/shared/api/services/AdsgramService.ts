/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PrizeOut } from '../models/PrizeOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdsgramService {
    /**
     * Spin Roulette
     * @param userid User's Telegram ID (tg_id)
     * @returns PrizeOut Successful Response
     * @throws ApiError
     */
    public static spinRouletteApiV1P2PAdsgramSpinRouletteGet(
        userid: number,
    ): CancelablePromise<PrizeOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/p2p/adsgram/spin_roulette',
            query: {
                'userid': userid,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }
}
