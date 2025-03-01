/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PrizeOutAddUUID } from '../models/PrizeOutAddUUID';
import type { PrizeType } from '../models/PrizeType';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PrizeService {
    /**
     * Get Active Bonuses
     * @param authorization
     * @param prizeType Фильтр по типу бонуса
     * @returns PrizeOutAddUUID Successful Response
     * @throws ApiError
     */
    public static getActiveBonusesApiV1P2PPrizeActiveBonusesGet(
        authorization: string,
        prizeType?: (PrizeType | null),
    ): CancelablePromise<Array<PrizeOutAddUUID>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/p2p/prize/active_bonuses',
            headers: {
                'Authorization': authorization,
            },
            query: {
                'prize_type': prizeType,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
