import type { IOrder } from "@/model/order";

export const useOrder = () => {

  const orderSelect = useState<IOrder>('orderSelect', () => ({}))
  const actionType = useState<'view'|'edit'>('actionType', () => 'view')

  const viewOrder = (order: IOrder) => {
    orderSelect.value = order;
  }
  const editOrder = (order: IOrder) => {
    orderSelect.value = order;
  }

  const getOrder = () => {
    return orderSelect.value;
  }

  return {
    viewOrder,
    editOrder,
    getOrder,
  };
}
