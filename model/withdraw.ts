import type { IUserInformation } from "./order";

export enum eWithdrawStatus {
    WAITING,
    COMPLETED,
    CANCELLED
}

export interface IWithdraw {
  id?: string;
  short_id?: string;
  creator?:IUserInformation;
  wallet_id?: string;
  price?: number;
  created_at?: string;
  status?: eWithdrawStatus;
  status_value?: string;
  acceptor?: IUserInformation;
  accepted_at?: string;
  transaction_id?: string;
}

export class WithdrawFilter {
    id?: string;
    short_id?: string;
    creator?:IUserInformation;
    wallet_id?: string;
    price?: number;
    created_at?: string;
    status?: eWithdrawStatus;
    status_value?: string;
    acceptor?: IUserInformation;
    accepted_at?: string;
    transaction_id?: string;
    from_create_at?: string;
    to_create_at?: string;
    keyword?: string;
    withdraw_status?: eWithdrawStatus;
    constructor(initValue?: WithdrawFilter) {
        Object.assign(this, initValue);
    }
}