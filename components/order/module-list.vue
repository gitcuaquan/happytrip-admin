<template>
  <ScrollArea class="h-[calc(100vh-220px)] shadow-sm">
    <ShareLoading v-if="props.loading" />
    <Table>
      <TableHeader class="sticky top-0 z-10 bg-white shadow-sm">
        <TableRow>
          <TableHead class="w-[10px]"> ID </TableHead>
          <TableHead>Ngày</TableHead>
          <TableHead>Điểm đón</TableHead>
          <TableHead>Điểm trả</TableHead>
          <TableHead>Dịch vụ</TableHead>
          <TableHead>Thu khách</TableHead>
          <TableHead>Tài xế nhận</TableHead>
          <TableHead>Hoa hồng</TableHead>
          <TableHead>Phí sàn</TableHead>
          <TableHead>ĐT tài xế</TableHead>
          <TableHead>Người tạo</TableHead>
          <!-- Cột action -->
          <TableHead class="w-[10px]"> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="order in formattedOrders" :key="order.id">
          <!-- ID đơn -->
          <TableCell class="w-[10px]"> {{ order?.short_id }} </TableCell>
          <!-- Ngày tạo -->
          <TableCell> {{ order.created }} </TableCell>
          <!-- Điểm đón -->
          <TableCell> {{ order.departure?.city }} </TableCell>
          <!-- Điểm trả -->
          <TableCell> {{ order.destination?.city }} </TableCell>
          <!-- Dịch vụ -->
          <TableCell> {{ order.name_service }} </TableCell>
          <!-- Thu khách -->
          <TableCell> {{ order.price_guest }} </TableCell>
          <!-- Tài xế nhận -->
          <TableCell> {{ order.price }} </TableCell>
          <!-- Hoa hồng -->
          <TableCell> {{ order.net_profit }} </TableCell>
          <!-- Phí sàn -->
          <TableCell> {{ order.price_system }} </TableCell>
          <!-- ĐT tài xế -->
          <TableCell>{{ order.partner?.phone }} </TableCell>
          <!-- Người tạo -->
          <TableCell>{{ order.creator?.user_phone }} </TableCell>
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
import type { IOrder } from "@/model/order";
import { format } from "date-fns";
import { Ellipsis } from "lucide-vue-next";

interface IProps {
  loading?: boolean;
  orders?: IOrder[];
}

const props = withDefaults(defineProps<IProps>(), {
  loading: false,
  orders: (): IOrder[] => [],
});

const formattedOrders = computed(() => {
  return props.orders.map((order) => ({
    ...order,
    created: format(order.created!, "dd/MM/yyyy"),
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
