/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MetricsService {
    /**
     * Create Metric
     * @param eventType
     * @param authorization
     * @param userId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createMetricApiV1P2PMetricsCreateMetricPost(
        eventType: string,
        authorization: string,
        userId?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/p2p/metrics/create_metric',
            headers: {
                'Authorization': authorization,
            },
            query: {
                'event_type': eventType,
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
