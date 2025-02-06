/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TransactionCurrencyType } from '../models/TransactionCurrencyType';
import type { UserBalanceOut } from '../models/UserBalanceOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BalanceService {
    /**
     * Create Deposit
     * @param currency
     * @param amount
     * @param authorization
     * @returns UserBalanceOut Successful Response
     * @throws ApiError
     */
    public static createDepositApiV1P2PBalanceDepositPost(
        currency: TransactionCurrencyType,
        amount: number,
        authorization: string,
    ): CancelablePromise<UserBalanceOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/p2p/balance/deposit',
            headers: {
                'Authorization': authorization,
            },
            query: {
                'currency': currency,
                'amount': amount,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Withdraw Funds
     * @param amount
     * @param currency
     * @param authorization
     * @returns UserBalanceOut Successful Response
     * @throws ApiError
     */
    public static withdrawFundsApiV1P2PBalanceWithdrawPost(
        amount: number,
        currency: TransactionCurrencyType,
        authorization: string,
    ): CancelablePromise<UserBalanceOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/p2p/balance/withdraw',
            headers: {
                'Authorization': authorization,
            },
            query: {
                'amount': amount,
                'currency': currency,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get All Checks
     * @param key
     * @param authorization
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getAllChecksApiV1P2PBalanceChecksGetAllChecksGet(
        key: string,
        authorization: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/p2p/balance/checks/get_all_checks',
            headers: {
                'Authorization': authorization,
            },
            query: {
                'key': key,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete All Checks
     * @param key
     * @param authorization
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteAllChecksApiV1P2PBalanceChecksDeleteAllChecksDelete(
        key: string,
        authorization: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/p2p/balance/checks/delete_all_checks',
            headers: {
                'Authorization': authorization,
            },
            query: {
                'key': key,
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
}
