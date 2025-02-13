import type { OrderOverviewItem } from "~/model/interface";
import { Service } from "./Service";

export class OrderService extends Service {
    URL_SERVICE_BASE = this.BASE_URL + '/order';
    constructor() {
        super();
    }

    OverviewOrder(filter: {from_date_of_destination: string, to_date_of_destination: string}) {
        const url = this.URL_SERVICE_BASE + '/overview-by-date';
        return new Promise<OrderOverviewItem[]>(async (resolve, reject) => {
            try {
                const data = await this.$AuthFetch<OrderOverviewItem[]>(url, {
                    method: 'POST',
                    body: JSON.stringify(filter)
                })
                resolve(data);
            }
            catch (error) {
                reject(error);
            }
        });
    }
}