export interface RsData<T> {
    data: T[];
    pagination: Pagination;
}

export interface Pagination {
    count: number
    limit: number
    page: number
    total_page: number
}

export interface Admin {
    id: string;
    password: string;
    last_name: string;
    first_name: string;
    full_name: string;
    email: string;
    phone: string;
    create_date: string; // ISO Date string
}

export interface Transport {
    name: string;
    type: number;
    type_name: string;
    license_plate: string;
    hang_xe: string;
    ten_xe: string;
    created_year: string;
}

export interface Service {
    id: string;
    name: string;
    short_id: string;
    description: string;
    service_type: number;
    service_name: string;
    transport_type: number;
    transport_name: string;
    price_system: number;
    includes_transport: Transport[];
    is_show: boolean;
    image_url: string;
}

export interface Customer {
    id: string;
    full_name: string;
    short_id: string;
    service: Service;
    phone: string;
    created_at: string; // ISO Date string
}

export interface ReportItem {
    id: string;
    admin: Admin;
    customer: Customer;
    type: number;
    type_value: string;
    request_date: string; // ISO Date string
    format: number;
    format_value: string;
    status: number;
    status_value: string;
    errors: string[];
    time_process: number;
    fileDataBase64: string;
    progress: number;
}
