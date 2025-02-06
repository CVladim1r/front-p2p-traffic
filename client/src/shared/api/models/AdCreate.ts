/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoriesAds } from './CategoriesAds';
import type { TransactionCurrencyType } from './TransactionCurrencyType';
import type { TypeUserAcquisition } from './TypeUserAcquisition';
export type AdCreate = {
    category: CategoriesAds;
    ad_type: TypeUserAcquisition;
    title: string;
    description: string;
    currency_type: TransactionCurrencyType;
    user_currency_for_payment: TransactionCurrencyType;
    link_to_channel: string;
    maximum_traffic: number;
    price: number;
    guaranteed_traffic: boolean;
    minimum_traffic: number;
    conditions: string;
    is_paid_promotion: boolean;
};

