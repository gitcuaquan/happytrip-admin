import OrderService from "~/services/OrderService";
import PartnerService from "~/services/PartnerService";
import ReportService from "~/services/ReportService";
import WalletService from "~/services/WalletService";
import AddressService from "~/services/AddressService";
import OrderCancelService from "@/services/OrderCancelServices";
import WithdrawService from "@/services/WithdrawService";
import AnnouncementService from "~/services/AnnouncementService";

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
  // services hủy đơn hàng
  const orderCancelService = new OrderCancelService();
  // services rút tiền
  const withdrawService = new WithdrawService();
  return {
    /** Serives order */
  // services thông báo
  const announcementService = new AnnouncementService();
  return {
    $AnnouncementService: announcementService,
    $OrderService: orderService,
    $ReportService: reportService,
    $WalletService: walletService,
    $PartnerService: partnerService,
    $AddressService: addressService,
    $OrderCancelService: orderCancelService,
    /** Service rút tiền */
    $WithdrawService: withdrawService
  }
}
