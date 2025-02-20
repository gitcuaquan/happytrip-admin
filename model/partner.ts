import type { Transport } from "./interface";

type StatusName = "Kích hoạt" | "Chờ kích hoạt" ;

export interface Partner {
    id: string;
    full_name: string;
    phone: string;
    password: string;
    transport: Transport;
    status_type: number;
    status_name: StatusName;
    created_at: string;
}
