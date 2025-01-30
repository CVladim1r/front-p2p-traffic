/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DealStatus } from './DealStatus';
export type DealOut = {
    uuid: string;
    ad_uuid: string;
    buyer_id: number;
    seller_id: number;
    status: DealStatus;
    is_frozen: boolean;
    support_request: boolean;
    created_at: string;
    updated_at: string;
};

