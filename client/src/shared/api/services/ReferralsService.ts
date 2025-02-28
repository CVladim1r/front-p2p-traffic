/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReferralStatsOut } from '../models/ReferralStatsOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReferralsService {
    /**
     * Get Referrals Stats
     * @param authorization
     * @returns ReferralStatsOut Successful Response
     * @throws ApiError
     */
    public static getReferralsStatsApiV1P2PReferralsReferralsGet(
        authorization: string,
    ): CancelablePromise<ReferralStatsOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/p2p/referrals/referrals',
            headers: {
                'Authorization': authorization,
            },
            errors: {
                401: `Unauthorized`,
                422: `Validation Error`,
            },
        });
    }
}
