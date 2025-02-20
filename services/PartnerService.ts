import type { FilterOnParams } from "~/model/common";
import { Service } from "./Service";
import type { ResponeData } from "~/model/interface";
import type { Partner } from "~/model/partner";

export default class PartnerService extends Service {
    URL_SERVICE_BASE = this.BASE_URL + '/partner';
    constructor() {
        super();
    }
    getListPartner(filter:any, params:FilterOnParams) {
        const url = this.URL_SERVICE_BASE + '/list';
        return new Promise<ResponeData<Partner>>(async (resolve, reject) => {
            try {
                const data = await this.$AuthFetch<ResponeData<Partner>>(url, {
                    method: 'POST',
                    body: JSON.stringify(filter),
                    params: params
                })
                resolve(data);
            }
            catch (error) {
                reject(error);
            }
        });
    }

}