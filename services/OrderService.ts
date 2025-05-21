
import type { IOrder, IOrderCreate, IOrderOverviewItem, Order, OrderFilter, OrderPreview } from "@/model/order";
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

    async Preview(data: IOrderCreate) {
        try {
            const url = this.URL_SERVICE_BASE + '/calc-order';
            const response = await this.$AuthFetch<Partial<Order>>(url, {
                method: 'POST',
                body: JSON.stringify(data)
            });
            return response;
        } catch (error) {
            console.error("Error fetching order preview:", error);
            throw error;
        }
    }
    /**
     * @description: Tạo đơn hàng
     * @param data : Order - thông tin đơn hàng
     * @returns Promise<Order> - thông tin đơn hàng vừa tạo
     */
    async Create(data: Order) {
        return new Promise<Order>(async (resolve, reject) => {
            try {
                const url = this.URL_SERVICE_BASE.concat('/by-ajax');
                const response = await this.$AuthFetch<Order>(url, {
                    method: 'POST',
                    body: JSON.stringify(data)
                });
                resolve(response);
            } catch (error: any) {
                reject(error);
            }
        })
    }
    /**
     * @description: Lấy thông tin chi tiết đơn hàng
     * @param id  : string - id đơn hàng
     * @returns Promise<Order> - thông tin chi tiết đơn hàng
     */
    Detail(id: string) {
        return new Promise<Order>(async (resolve, reject) => {
            try {
                const url = this.URL_SERVICE_BASE + '/' + id;
                const response = await this.$AuthFetch<Order>(url, {
                    method: 'GET'
                });
                resolve(response);
            } catch (error) {
                reject(error);
            }
        })
    }
    /**
     * @description: Cập nhật thông tin đơn hàng
     * @param data : Order - thông tin đơn hàng
     * @returns Promise<Order> - thông tin đơn hàng vừa cập nhật
     */
    Update(data: Order) {
        return new Promise<Order>(async (resolve, reject) => {
            try {
                const url = this.URL_SERVICE_BASE + '/' + data.id;
                const response = await this.$AuthFetch<Order>(url, {
                    method: 'PUT',
                    body: JSON.stringify(data)
                });
                resolve(response);
            } catch (error) {
                reject(error);
            }
        })
    }
    Delete(id: string) {
        return new Promise<Order>(async (resolve, reject) => {
            try {
                const url = this.URL_SERVICE_BASE + '/' + id;
                const response = await this.$AuthFetch<Order>(url, {
                    method: 'DELETE'
                });
                resolve(response);
            } catch (error) {
                reject(error);
            }
        })
    }
    async list(params: FilterOnParams, filter: OrderFilter) {
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