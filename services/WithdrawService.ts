import type { FilterOnParams } from "@/model/common";
import { Service } from "./Service";

export default class WithdrawService extends Service {
    protected SERVICE_URL = this.BASE_URL + '/withdraw';
    constructor() {
        super();
    }
    
    list(params:FilterOnParams,filter:any){
        return new Promise( async(resolve, reject) => {
            try {
                const response = await this.$AuthFetch(this.SERVICE_URL,{
                    method: 'POST',
                    params: params,
                    data: JSON.stringify(filter)
                });
                resolve(response);
            } catch (error) {
                reject(error);
            }
        })
    }
}