
interface IOrderOverviewItem {
    total_price: number;
    total_order: number;
    date: string; // ISO Date string
}

// Interface cho Address
interface IAddress {
    address_1?: string;
    address_2?: string;
    district?: string;
    city?: string;
}

// Interface cho BankInfo
interface IBankInfo {
    name?: string;
    bank_card?: string;
    bank_name?: string;
}

// Enum cho PartnerStatus
enum ePartnerStatus {
    STATUS_0,
    STATUS_1,
    STATUS_2,
}

// Interface cho Transport
interface ITransport {
    name?: string;
    type?: eTransportType;
    type_name?: string;
    license_plate?: string;
    hang_xe?: string;
    ten_xe?: string;
    created_year?: string;
}

// Interface cho Partner
interface IPartner {
    id?: string;
    full_name?: string;
    phone?: string;
    password?: string;
    transport?: ITransport;
    status_type?: ePartnerStatus;
    bank_info?: IBankInfo;
    status_name?: string;
    created_at?: string;
    isFreezen?: boolean;
    otp_sms?: string;
}

// Interface cho City
interface ICity {
    name?: string;
    code?: string;
    status?: boolean;
    id?: string;
    districts?: IDistrict[];
}

// Interface cho District
interface IDistrict {
    name?: string;
    code?: string;
    status?: boolean;
}

// Enum cho ServiceType
enum eServiceType {
    TYPE_0,
    TYPE_1,
    TYPE_2,
}

// Enum cho TransportType
enum eTransportType {
    TYPE_0,
    TYPE_1,
    TYPE_2,
    TYPE_3,
}

// Interface cho Service
interface IService {
    id?: string;
    name?: string;
    short_id?: string;
    description?: string;
    service_type?: eServiceType;
    service_name?: string;
    transport_type?: eTransportType;
    transport_name?: string;
    price_system?: number;
    includes_transport?: ITransport[];
    is_show?: boolean;
    image_url?: string;
}

// Interface cho SubFee
interface ISubFee {
    id?: string;
    short_id?: string;
    name_display?: string;
    name?: string;
    status?: boolean;
    dates?: string[];
    destination?: ICity;
    depature?: ICity;
    service?: IService;
    price?: number;
    value?: number;
    value_type?: string;
    created_at?: string;
}

// Interface cho SubFeeOrder
interface ISubFeeOrder {
    sub_fee_price?: number;
    sub_fees?: ISubFee[];
}

// Interface cho Customer
interface ICustomer {
    id?: string;
    full_name?: string;
    short_id?: string;
    service?: IService;
    phone?: string;
    created_at?: string;
}

// Enum cho OrderStatus
enum eOrderStatus {
    WAITING, // Chờ xác nhận
    ACCEPTED, // Đã xác nhận
    COMPLETED, // Đã hoàn thành
    CANCELLED, // Đã hủy
}

// Interface cho UserInformation
interface IUserInformation {
    user_id?: string;
    user_phone?: string;
    user_full_name?: string;
    user_name?: string;
    user_type?: string;
}

// Interface cho Order
interface IOrder {
    id?: string;
    short_id?: string;
    id_service?: string;
    name_service?: string;
    departure?: IAddress;
    destination?: IAddress;
    date_of_destination?: string;
    partner?: IPartner;
    quantity?: number;
    price?: number;
    price_after?: number;
    price_guest_after?: number;
    price_guest?: number| string;
    price_system?: number;
    net_profit?: number;
    distance?: number;
    sub_fees?: ISubFeeOrder;
    created?: string;
    customer?: ICustomer;
    status_type?: eOrderStatus;
    status_name?: string;
    total_transaction?: number;
    creator?: IUserInformation;
    note?: string;
}

class OrderPreview {
    date_of_destination?: string;
    id_service?: string;
    quantity?: string;
    departure_city?: string;
    destination_city?: string;
    price?: string;
    price_guest?: number;
    departure_dictrict?: string;

    destination_dictrict?: string;
    constructor(initValue?: OrderPreview) {
        Object.assign(this, initValue);
    }
}

class Order implements IOrder {
    id?: string;
    short_id?: string;
    id_service?: string;
    name_service?: string;
    departure?: IAddress;
    destination?: IAddress;
    date_of_destination?: string;
    partner?: IPartner;
    quantity?: number;
    price?: number;
    price_after?: number;
    price_guest_after?: number;
    price_guest?: string;
    price_system?: number;
    net_profit?: number;
    distance?: number;
    sub_fees?: ISubFeeOrder;
    created?: string;
    customer?: ICustomer;
    status_type?: eOrderStatus;
    status_name?: string;
    total_transaction?: number;
    creator?: IUserInformation;
    note?: string;
    constructor(initValue?: IOrder) {
        Object.assign(this, initValue);
    }
}
enum eTypeOrderCancel {
    TYPE_0,
    TYPE_1,
    TYPE_2
}

class OrderCancelItem extends Order {
    order_id?: string;
    order_short_id?: string;
    user_creator?: IUserInformation;
    user_creator_order?: IUserInformation;
    type?: eTypeOrderCancel;
    type_value?: string;
    constructor(initValue?: OrderCancelItem) {
        super(initValue);
        Object.assign(this, initValue);
    }
}

class OrderFilter {
    from_date_of_destination?: string;
    to_date_of_destination?: string;
    from_created_at?: string;
    to_created_at?: string;
    city_diemdon?: string;
    city_diemden?: string;
    district_depature?: string;
    district_destination?: string;
    order_expired?: boolean;
    keyword?: string;
    order_status?: eOrderStatus;
    order_cancel_type?: "Tài xế" | "Khách hàng" | "Người tạo";
    order_status_value?: string
    type?: eTypeOrderCancel;
    constructor(initValue?: OrderFilter) {
        Object.assign(this, initValue);
    }
}
interface IOrderCreate {
    id?: string;
    name_service?: string;
    id_service?: string;
    full_name?: string;
    phone?: string;
    date_of_destination?: string;
    quantity?: number;
    departure_city?: string;
    departure_dictrict?: string;
    departure_address_1?: string;
    destination_city?: string;
    destination_dictrict?: string;
    destination_address_1?: string;
    price?: number;
    price_guest?: string;
    price_system?: number;
    price_after?: number;
    price_guest_after?: number;
    net_profit?: number;
    note?: string;
    partner_phone?: string;
    distance?: number;
    sub_fees?: ISubFeeOrder;
}

export {
    type IOrderOverviewItem,
    type IAddress,
    type IBankInfo,
    ePartnerStatus,
    type ITransport,
    type IPartner,
    type ICity,
    type IDistrict,
    eServiceType,
    eTransportType,
    eTypeOrderCancel,
    type IService,
    type ISubFee,
    type ISubFeeOrder,
    type ICustomer,
    eOrderStatus,
    type IUserInformation,
    type IOrder,
    Order,
    OrderFilter,
    OrderCancelItem,
    OrderPreview,
    type IOrderCreate,
};