/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DealStatus } from './DealStatus';
import type { TransactionCurrencyType } from './TransactionCurrencyType';
export type DealOut = {
    uuid: string;
    buyer_id: string;
    seller_id: string;
    status: DealStatus;
    price: string;
    currency: TransactionCurrencyType;
    is_frozen: boolean;
    buyer_confirms: boolean;
    seller_confirms: boolean;
    buyer_review: boolean;
    seller_review: boolean;
    support_request: boolean;
};

