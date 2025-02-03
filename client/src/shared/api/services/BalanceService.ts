/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserBalanceOut } from '../models/UserBalanceOut';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BalanceService {
    /**
     * Create Deposit
     * @param amount
     * @param authorization
     * @returns UserBalanceOut Successful Response
     * @throws ApiError
     */
    public static createDepositApiV1P2PBalanceDepositPost(
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
     * @param authorization
     * @returns UserBalanceOut Successful Response
     * @throws ApiError
     */
    public static withdrawFundsApiV1P2PBalanceWithdrawPost(
        amount: number,
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
            },
            errors: {
                400: `Bad Request`,
                422: `Validation Error`,
            },
        });
    }
}
