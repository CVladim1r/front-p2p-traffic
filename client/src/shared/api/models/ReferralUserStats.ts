/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ReferralUserStats = {
    uuid: string;
    username: (string | null);
    profile_photo: (string | null);
    rating: (number | null);
    is_vip: boolean;
    completed_buys_count: number;
    total_buys_amount: string;
    completed_sales_count: number;
    total_sales_amount: string;
    /**
     * Сумма заработанная от реферала
     */
    total_earned: string;
};

