import { Service } from "./Service";

export class PartnerService extends Service {
    URL_SERVICE_BASE = this.BASE_URL + '/partner';
    constructor() {
        super();
    }
    getListPartner(filter:any,params:any) {
        const url = this.URL_SERVICE_BASE + '/list';
        return new Promise<any[]>(async (resolve, reject) => {
            try {
                const data = await this.$AuthFetch<any[]>(url, {
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