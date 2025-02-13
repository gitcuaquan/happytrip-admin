import type { FilterOnParams } from "~/model/common";
import { Service } from "./Service";
import type {ReportItem,  ResponeData} from "~/model/interface";

export class ReportService extends Service {
    URL_SERVICE_BASE = this.BASE_URL + '/report';
    constructor() {
        super();
    }

    public get(params: FilterOnParams, filter: any) {
        const url = this.URL_SERVICE_BASE + '/list';
        return new Promise<ResponeData<ReportItem>>(async (resolve, reject) => {
            try {

                const data = await this.$AuthFetch<ResponeData<ReportItem>>(url, {
                    method: 'POST',
                    params: params,
                    body: JSON.stringify(filter || {})
                })
                resolve(data);
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
