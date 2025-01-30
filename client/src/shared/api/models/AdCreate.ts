/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Categories } from './Categories';
import type { TransactionCurrencyType } from './TransactionCurrencyType';
export type AdCreate = {
    category: Categories;
    title: string;
    description: string;
    currency_type: TransactionCurrencyType;
    link_to_channel: string;
    maximum_traffic: number;
    price: number;
    guaranteed_traffic: boolean;
    minimum_traffic: number;
    conditions: string;
    is_paid_promotion: boolean;
};

