import OrderService from "@/services/OrderService";
import PartnerService from "@/services/PartnerService";
import ReportService from "@/services/ReportService";
import WalletService from "@/services/WalletService";
import AddressService from "@/services/AddressService";
import OrderCancelService from "@/services/OrderCancelServices";
import WithdrawService from "@/services/WithdrawService";
import AnnouncementService from "@/services/AnnouncementService";
import TransactionService from "@/services/TransactionService";
import HappytripService from "@/services/HappytripService";

export const useServices = () => {
  // services transaction
  const transactionService = new TransactionService();

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
  // services thông báo
  const announcementService = new AnnouncementService();

  const happytripService = new HappytripService();
  
  return {
    /** Services transaction */
    $TransactionService: transactionService,
    /** Services order */
    $AnnouncementService: announcementService,
    $OrderService: orderService,
    $ReportService: reportService,
    $WalletService: walletService,
    $PartnerService: partnerService,
    $AddressService: addressService,
    $OrderCancelService: orderCancelService,
    /** Service rút tiền */
    $WithdrawService: withdrawService,
    $HappytripService: happytripService
  }
}
