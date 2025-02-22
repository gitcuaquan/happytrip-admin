import OrderService  from "~/services/OrderService";
import PartnerService from "~/services/PartnerService";
import ReportService from "~/services/ReportService";
import WalletService from "~/services/WalletService";
import AddressService from "~/services/AddressService";

export const useServices = () => {

  // services báo cáo
  const reportService = new ReportService();
  // services đơn hàng
  const orderService = new OrderService();
  // services ví
  const walletService = new WalletService();
  // services đối tác ( tài xế )
  const partnerService = new PartnerService();
  // services đia chỉ
  const addressService = new AddressService();

  return {
    $OrderService: orderService,
    $ReportService: reportService,
    $WalletService: walletService,
    $PartnerService: partnerService,
    $AddressService: addressService
  }
}
