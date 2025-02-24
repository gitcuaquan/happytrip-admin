import type { RsData } from "~/model/interface";
import { Service } from "./Service";
import type { IWallet, WalletFilter } from "~/model/wallet";
import type { FilterOnParams } from "~/model/common";

export default class WalletService extends Service {
    SERVICE_URL = this.BASE_URL + "/wallet";

    getLists(param: FilterOnParams, filter: WalletFilter) {
        const URL = this.SERVICE_URL + "/list";
        return new Promise<RsData<IWallet>>(async (resolve, reject) => {
            try {
                const response = await this.$AuthFetch<RsData<IWallet>>(URL, {
                    method: "POST",
                    params: param,
                    body: JSON.stringify(filter)
                });
                resolve(response);
            } catch (error) {
                console.error("Failed to fetch wallet lists:", error);
                reject(error);
            }
        });
    }
}