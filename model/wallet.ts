import { format, subDays } from 'date-fns';
import type { Admin } from './interface';

export interface ITransport {
    type: number;
    type_name: string;
    license_plate: string;
    hang_xe: string;
    ten_xe: string;
    created_year: string;
}

export interface IPartner {
    id: string;
    full_name: string;
    phone: string;
    password: string;
    transport: ITransport;
    status_type: number;
    status_name: string;
}

export interface IWallet {
    id: string;
    short_id: string;
    partner: IPartner;
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

export class Transport implements ITransport {
    constructor(
        public type: number,
        public type_name: string,
        public license_plate: string,
        public hang_xe: string,
        public ten_xe: string,
        public created_year: string
    ) { }
}

export class Partner implements IPartner {
    constructor(
        public id: string,
        public full_name: string,
        public phone: string,
        public password: string,
        public transport: ITransport,
        public status_type: number,
        public status_name: string
    ) { }
}

export class Wallet implements IWallet {
    constructor(
        public id: string,
        public short_id: string,
        public partner: IPartner,
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