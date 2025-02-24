import type { FilterOnParams } from "@/model/common";
import { Service } from "./Service";
import type { RsData } from "@/model/interface";
import type { OrderCancelItem, OrderFilter } from "@/model/order";

export default class OrderCancelService extends Service {

    private URL_SERVICE_BASE = this.BASE_URL + '/order_cancel';

    constructor() {
        super();
    }

    async getOrderCancelList(params: FilterOnParams, filter: OrderFilter) {
        try {
            const URL = this.URL_SERVICE_BASE + '/history-cancel';
            const response = await this.$AuthFetch<RsData<OrderCancelItem>>(URL, {
                method: "POST",
                params: params,
                body: JSON.stringify(filter)
            });
            return response;
        } catch (error) {
            console.error("Error fetching order cancel list:", error);
            throw error;
        }
    }

}