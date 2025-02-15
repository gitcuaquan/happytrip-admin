import { OrderService } from "~/services/OrderService";
import { ReportService } from "~/services/ReportService";
import WalletService from "~/services/WalletService";

export const useServices = () => {

  const reportService = new ReportService();
  const orderService = new OrderService();
  const walletService = new WalletService();

  return {
    $OrderService: orderService,
    $ReportService: reportService,
    $WalletService: walletService
  }
}
