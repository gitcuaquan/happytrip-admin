export interface IUserReceiving {
    user_id: string;
    user_phone: string;
    user_full_name: string;
    user_name: string;
    user_type: string;
}

export interface ITransaction {
    id: string;
    code: string;
    partner_id: string;
    wallet_id: string;
    wallet_short_id: string;
    user_receiving: IUserReceiving;
    name: string;
    desciption: string;
    amount: number;
    status: number;
    status_value: string;
    method: string;
    created_at: string;
    balance_after: number;
    balance_before: number;
    object_id: string;
    object_type: number;
    object_name: string;
    note?: string;
}