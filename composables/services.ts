import { OrderService } from "~/services/OrderService";
import { ReportService } from "~/services/ReportService";

export const useServices = () => {
  
  const reportService = new ReportService();
  const orderService = new OrderService();


  return {
    $OrderService: orderService,
    $ReportService: reportService
  }
}
