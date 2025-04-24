import type { IOrder } from "@/model/order";

export const useOrder = () => {

  const { $OrderService } = useServices()

  const orderSelect = useState<IOrder>('orderSelect', () => ({}))
  const actionType = useState<'view' | 'edit' | ''>('actionType', () => '')

  const viewOrder = async (order: IOrder) => {
    try {
      const orderDetails = await $OrderService.Detail(order.id!);
      orderSelect.value = orderDetails;
      actionType.value = 'view';
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  }
  const editOrder = (order: IOrder) => {
    orderSelect.value = order;
    actionType.value = 'edit';
  }
  const getActionType = () => {
    return actionType.value;
  }
  const setActionType = (type: 'view' | 'edit' | '') => {
    actionType.value = type;
  }

  const getOrder = () => {
    return orderSelect.value;
  }
  const resetAll = () => {
    orderSelect.value = {};
    actionType.value = '';
  }
  return {
    viewOrder,
    editOrder,
    getOrder,
    getActionType,
    setActionType,
    resetAll,
  };
}
