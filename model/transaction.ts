export interface IUserReceiving {
    user_id: string;
    user_phone: string;
    user_full_name: string;
    user_name: string;
    user_type: string;
}

export interface ITransaction {
    id?: string;
    code?: string;
    partner_id?: string;
    wallet_id?: string;
    wallet_short_id?: string;
    user_receiving?: IUserReceiving;
    name?: string;
    desciption?: string;
    amount?: number;
    status?: number;
    status_value?: string;
    method?: string;
    created_at?: string;
    balance_after?: number;
    balance_before?: number;
    object_id?: string;
    object_type?: number;
    object_name?: string;
    note?: string;
}
export interface ITransactionFilter extends ITransaction {
    from_date?: string;
    to_date?: string;
    keyword?: string;
}

export class TransactionFilter implements ITransactionFilter {
    id?: string;
    code?: string;
    partner_id?: string;
    wallet_id?: string;
    wallet_short_id?: string;
    user_receiving?: IUserReceiving;
    name?: string;
    desciption?: string;
    amount?: number;
    status?: number;
    status_value?: string;
    method?: string;
    created_at?: string;
    balance_after?: number;
    balance_before?: number;
    object_id?: string;
    object_type?: number;
    object_name?: string;
    note?: string;
    from_date?: string;
    to_date?: string;
    keyword?: string;

    constructor(data?: ITransactionFilter) {
        this.id = data?.id;
        this.code = data?.code;
        this.partner_id = data?.partner_id;
        this.wallet_id = data?.wallet_id;
        this.wallet_short_id = data?.wallet_short_id;
        this.user_receiving = data?.user_receiving;
        this.name = data?.name;
        this.desciption = data?.desciption;
        this.amount = data?.amount;
        this.status = data?.status;
        this.status_value = data?.status_value;
        this.method = data?.method;
        this.created_at = data?.created_at;
        this.balance_after = data?.balance_after;
        this.balance_before = data?.balance_before;
        this.object_id = data?.object_id;
        this.object_type = data?.object_type;
        this.object_name = data?.object_name;
        this.note = data?.note;
        this.from_date = data?.from_date;
        this.to_date = data?.to_date;
        this.keyword = data?.keyword;
    }
}