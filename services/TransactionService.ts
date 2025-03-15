import type { FilterOnParams } from "@/model/common";
import { Service } from "./Service";
import type { ITransaction } from "@/model/transaction";
import type { RsData } from "@/model/interface";

export default class TransactionService extends Service {
    SERVICE_URL = this.BASE_URL + "/transaction";
    constructor() {
        super();
    }

    getLists(param: FilterOnParams, filter: any) {
        const URL = this.SERVICE_URL + "/list";
        return new Promise<RsData<ITransaction>>(async (resolve, reject) => {
            try {
                const response = await this.$AuthFetch<RsData<ITransaction>>(URL, {
                    method: "POST",
                    params: param,
                    body: JSON.stringify(filter)
                });
                resolve(response);
            } catch (error) {
                console.error("Failed to fetch transaction lists:", error);
                reject(error);
            }
        });
    }
}