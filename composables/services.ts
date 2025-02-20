import { OrderService } from "~/services/OrderService";
import PartnerService from "~/services/PartnerService";
import { ReportService } from "~/services/ReportService";
import WalletService from "~/services/WalletService";

export const useServices = () => {

  const reportService = new ReportService();
  const orderService = new OrderService();
  const walletService = new WalletService();
  const partnerService = new PartnerService();

  return {
    $OrderService: orderService,
    $ReportService: reportService,
    $WalletService: walletService,
    $PartnerService: partnerService
  }
}
