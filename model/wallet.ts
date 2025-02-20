import { subDays } from 'date-fns';
import type { Admin } from './interface';
import type { Partner } from './partner';


export interface IWallet {
    id: string;
    short_id: string;
    partner: Partner;
    partner_id?: string;
    affilate_id?: string;
    affilate?: Admin;
    balance: number;
    balance_hold: number;
    balance_available: number;
    status: boolean;
    limit_debit: number;
    created_at: string;
    wallet_deposit?: number;

}

export class Wallet implements IWallet {
    constructor(
        public id: string,
        public short_id: string,
        public partner: Partner,
        public partner_id: string,
        public balance: number,
        public balance_hold: number,
        public balance_available: number,
        public status: boolean,
        public limit_debit: number,
        public created_at: string
    ) { }
}

export class WalletFilter {
    from_date?: string;
    to_date?: string;
    isAffilate?: boolean | null;
    keyword?: string;
    constructor(initValue?: WalletFilter) {
        Object.assign(this, initValue);
        this.from_date = subDays(new Date(), 30).toISOString();
        this.to_date = new Date().toISOString();
    }
}