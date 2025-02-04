/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DealStatus } from './DealStatus';
import type { TransactionCurrencyType } from './TransactionCurrencyType';
export type DealsOut = {
    uuid: string;
    ad_uuid: string;
    buyer_id: string;
    seller_id: string;
    status: DealStatus;
    price: string;
    currency: TransactionCurrencyType;
    is_frozen: boolean;
    support_request: boolean;
    created_at: string;
    updated_at: string;
};

