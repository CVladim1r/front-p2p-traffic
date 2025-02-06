/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdditionalService {
    /**
     * Get Transaction Currency Types
     * @returns string Successful Response
     * @throws ApiError
     */
    public static getTransactionCurrencyTypesApiV1P2POtherTransactionCurrencyTypesGet(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/p2p/other/transaction_currency_types',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get Categories
     * @returns string Successful Response
     * @throws ApiError
     */
    public static getCategoriesApiV1P2POtherCategoriesGet(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/p2p/other/categories',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get Categories
     * @returns string Successful Response
     * @throws ApiError
     */
    public static getCategoriesApiV1P2POtherUserAcquisitionTypeGet(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/p2p/other/user_acquisition_type',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
