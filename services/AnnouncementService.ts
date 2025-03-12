import type { FilterOnParams } from "@/model/common";
import { Service } from "./Service";
import type { IAnnouncement } from "@/model/announcement";
import type { RsData } from "@/model/interface";

export default class AnnouncementService extends Service {
    constructor() {
        super();
    }
    /**
     *  Tạo thông báo
     * @param announcement 
     * @returns 
     */
    public addAnnouncement(announcement: IAnnouncement) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await this.$AuthFetch<IAnnouncement>(`${this.BASE_URL}/announcements`, {
                    method: 'POST',
                    body: JSON.stringify(announcement)
                });
                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    }
    /**
     * Lấy thông báo
     * @param param 
     * @returns 
     */
    public getAnnouncements(param: FilterOnParams) {
        return new Promise<RsData<IAnnouncement>>(async (resolve, reject) => {
            try {
                const res = await this.$AuthFetch<RsData<IAnnouncement>>(`${this.BASE_URL}/announcements`, {
                    method: 'GET',
                    params: {
                        ...param
                    }
                });
                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    }
}