/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DealStatus } from './DealStatus';
import type { TransactionCurrencyType } from './TransactionCurrencyType';
export type DealOutCOMPLETE = {
    uuid: string;
    status: DealStatus;
    price: string;
    currency: TransactionCurrencyType;
    is_frozen: boolean;
    support_request: boolean;
};

