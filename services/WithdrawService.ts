import type { FilterOnParams } from "@/model/common";
import { Service } from "./Service";
import type { RsData } from "@/model/interface";
import type { IWithdraw, WithdrawFilter } from "@/model/withdraw";

export default class WithdrawService extends Service {
    protected SERVICE_URL = this.BASE_URL + '/withdraw';
    constructor() {
        super();
    }
    
    list(params:FilterOnParams,filter:WithdrawFilter):Promise<RsData<IWithdraw>> {
        return new Promise( async(resolve, reject) => {
            try {
                const response = await this.$AuthFetch<RsData<IWithdraw>>(this.SERVICE_URL + '/list', {
                    method: 'POST',
                    params: params,
                    body: JSON.stringify(filter)
                });
                resolve(response);
            } catch (error) {
                reject(error);
            }
        })
    }
}