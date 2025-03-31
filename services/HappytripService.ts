import type { RsData } from "@/model/interface";
import { Service } from "./Service";
import type { IHappytripService } from "@/model/happytrip";

export default class HappytripService extends Service {
    URL_SERVICE_BASE = this.BASE_URL + '/service';
    constructor() {
        super();
    }
    getList() {
        const url = this.URL_SERVICE_BASE + '/list';
        return new Promise<RsData<IHappytripService>>(async (resolve, reject) => {
            try {
                const data = await this.$AuthFetch<RsData<IHappytripService>>(url, {
                    method: 'POST',
                    params: {
                        fields:'id,name,description,transport_type,prices,service_name'
                    },
                    body: JSON.stringify({})
                })
                resolve(data);
            }
            catch (error) {
                reject(error);
            }
        });
    }

}