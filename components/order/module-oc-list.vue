<template>
  <ScrollArea class="h-[calc(100vh-220px)] shadow-sm">
    <ShareLoading v-if="props.loading" />
    <ShareNoData v-else-if="!props.orders.length" />
    <Table>
      <TableHeader class="sticky top-0 z-10 bg-white shadow-sm">
        <TableRow>
          <TableHead class="w-[10px] text-nowrap"> Order ID </TableHead>
          <TableHead class="text-nowrap">Khởi hành</TableHead>
          <TableHead>Người tạo lệnh</TableHead>
          <TableHead>Người tạo đơn</TableHead>
          <TableHead>Khách hàng</TableHead>
          <TableHead>Dịch vụ</TableHead>
          <TableHead>Điểm đón</TableHead>
          <TableHead>Điểm trả</TableHead>
          <TableHead>Tài xế</TableHead>
          <TableHead>Ghi chú</TableHead>
          <TableHead class="text-nowrap">Nguyên nhân</TableHead>
          <!-- Cột action -->
          <TableHead class="w-[10px]"> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="order in formattedOrders" :key="order.id">
          <!-- ID đơn -->
          <TableCell class="w-[10px] font-bold">
            {{ order?.order_short_id }}
          </TableCell>
          <!-- Ngày khởi hành -->
          <TableCell> {{ order.date_of_destination }} </TableCell>
          <!-- Người tạo lệnh -->
          <TableCell>
            <div v-if="order.user_creator?.user_full_name">
              {{ order.user_creator?.user_full_name }}
              <br />
            </div>
            <i class="text-slate-500">{{
              order.user_creator?.user_phone || order.user_creator?.user_name
            }}</i>
          </TableCell>
          <!-- Người tạo đơn -->
          <TableCell>
            {{ order.user_creator_order?.user_name }}
            <br />
            <i class="text-slate-500">{{ order.user_creator?.user_phone }}</i>
          </TableCell>
          <!-- Khách hàng -->
          <TableCell>
            {{ order.customer?.full_name }}
            <br />
            <i class="text-slate-500">{{ order.customer?.phone }}</i>
          </TableCell>
          <!-- Dịch vụ -->
          <TableCell> {{ order.name_service }} </TableCell>
          <!-- Điểm đón  -->
          <TableCell>
            <div class="w-[200px]">
              {{ order.address_form }}
            </div>
          </TableCell>
          <!-- Điểm trả -->
          <TableCell>
            <div class="w-[200px]">
              {{ order.address_to }}
            </div>
          </TableCell>
          <!-- Tài xế nào -->
          <TableCell>
            <template v-if="order.partner">
              {{ order.partner?.full_name }}
              <br />
              <i class="text-slate-500">{{ order.partner?.phone }}</i>
            </template>
            <template v-else>
              <i class="text-red-600">Không tài xế</i>
            </template>
          </TableCell>
          <!-- ĐT tài xế -->
          <TableCell>
            <div class="max-w-[200px]">
              {{ order.note }}
            </div>
          </TableCell>
          <!-- Người tạo -->
          <TableCell>
            <Badge :variant="order.type_value == 'Khách hàng' ? 'success' : order.type_value == 'Người tạo' ? 'destructive' : 'default'">
              {{ order.type_value }}
            </Badge>
          </TableCell>
          <!-- Cột action -->
          <TableCell class="w-[10px]">
            <Button :variant="'ghost'" size="sm" class="text-gray-500">
              <Ellipsis />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </ScrollArea>
</template>

<script lang="ts" setup>
import type { OrderCancelItem } from "@/model/order";
import { format } from "date-fns";
import { Ellipsis } from "lucide-vue-next";

interface IProps {
  loading?: boolean;
  orders?: OrderCancelItem[];
}

const props = withDefaults(defineProps<IProps>(), {
  loading: false,
  orders: (): OrderCancelItem[] => [],
});
const formattedOrders = computed(() => {
  return props.orders.map((order) => ({
    ...order,
    address_form: [
      order.departure?.address_1,
      order.departure?.address_2,
      order.departure?.district,
      order.departure?.city,
    ]
      .filter(Boolean)
      .join(", "),
    address_to: [
      order.destination?.address_1,
      order.destination?.address_2,
      order.destination?.district,
      order.destination?.city,
    ]
      .filter(Boolean)
      .join(", "),
    date_of_destination: format(order.date_of_destination!, "dd/MM/yyyy"),
    price_guest: new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(order.price_guest!),
    price_system: new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(order.price_system!),
    price: new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(order.price!),
    price_guest_after: new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(order.price_guest_after!),
    net_profit: new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(order.net_profit!),
  }));
});
</script>

<style></style>
