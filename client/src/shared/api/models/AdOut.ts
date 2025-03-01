/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdStatus } from './AdStatus';
import type { CategoriesAds } from './CategoriesAds';
import type { TransactionCurrencyType } from './TransactionCurrencyType';
import type { TypeUserAcquisition } from './TypeUserAcquisition';
export type AdOut = {
    uuid: string;
    category: CategoriesAds;
    title: string;
    description: string;
    price: (number | null);
    guaranteed_traffic: number;
    minimum_traffic: (number | null);
    maximum_traffic: (number | null);
    currency_type: (TransactionCurrencyType | null);
    link_to_channel: (string | null);
    conditions: string;
    is_paid_promotion: boolean;
    status: AdStatus;
    ad_type: TypeUserAcquisition;
    user: string;
    user_name: string;
    user_photo_url: string;
    user_deals: number;
    user_rating: number;
    user_vip: boolean;
};

