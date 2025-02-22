import type { FilterOnParams } from "~/model/common";
import { Service } from "./Service";
import type { City, ResponeDistricts } from "~/model/address";
import type { ResponeData } from "~/model/interface";


class AddressService extends Service {
    SERVICE_URL = this.BASE_URL.concat('/city');
    listCity(params: FilterOnParams) {
        return new Promise<City[]>( async(resolve, reject) => {
            const URL = this.SERVICE_URL.concat('/list');
            try {
                const data = await this.$AuthFetch<City[]>(URL,
                    {
                        method: 'POST',
                        params: params,
                        body: JSON.stringify({
                            status:true
                        }),
                    }
                );
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    }

    getDetailCity(id: string) {
        return new Promise<ResponeDistricts>(async (resolve, reject) => {
            const URL = this.SERVICE_URL.concat(`/${id}`);
            try {
                const data = await this.$AuthFetch<ResponeDistricts>(URL, {
                    method: 'GET'
                });
                resolve(data);
            } catch (error) {
                reject(error);
                
            }
        });
    }
}
export default  AddressService;