/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Webhook Endpoint
     * Check API health
     * @returns any Successful Response
     * @throws ApiError
     */
    public static cryptobotWebhookWebhookCryptobotPost(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/webhook/cryptobot',
        });
    }
}
