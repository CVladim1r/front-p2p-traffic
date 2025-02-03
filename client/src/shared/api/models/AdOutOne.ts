/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdStatus } from './AdStatus';
import type { Categories } from './Categories';
import type { TransactionCurrencyType } from './TransactionCurrencyType';
export type AdOutOne = {
    uuid: string;
    category: Categories;
    title: string;
    description: string;
    price: (number | null);
    guaranteed_traffic: boolean;
    minimum_traffic: (number | null);
    maximum_traffic: (number | null);
    currency_type: (TransactionCurrencyType | null);
    link_to_channel: (string | null);
    conditions: string;
    is_paid_promotion: boolean;
    status: AdStatus;
};

