
import type { IOrder, IOrderOverviewItem, OrderFilter } from "@/model/order";
import { Service } from "./Service";
import type { FilterOnParams } from "@/model/common";
import type { RsData } from "@/model/interface";

export default class OrderService extends Service {
    URL_SERVICE_BASE = this.BASE_URL + '/order';
    constructor() {
        super();
    }

    OverviewOrder(filter: { from_date_of_destination: string, to_date_of_destination: string }) {
        const url = this.URL_SERVICE_BASE + '/overview-by-date';
        return new Promise<IOrderOverviewItem[]>(async (resolve, reject) => {
            try {
                const data = await this.$AuthFetch<IOrderOverviewItem[]>(url, {
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

    async list(params:FilterOnParams,filter:OrderFilter) {
        try {
            
            const url = this.URL_SERVICE_BASE + '/list';
            const data = await this.$AuthFetch<RsData<IOrder>>(url, {
                method: 'POST',
                params: params,
                body: JSON.stringify(filter)
            });
            return data;
        } catch (error) {
            console.error("Error fetching order list:", error);
            throw error;
        }
    }
}