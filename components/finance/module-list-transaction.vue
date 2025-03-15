<template>
  <ScrollArea class="h-[calc(100vh-220px)] shadow-sm">
    <ShareLoading v-if="props.loading" />
    <ShareNoData v-else-if="!props.data.length" />
    <Table>
      <TableHeader class="sticky top-0 z-10 bg-white shadow-sm">
        <TableRow>
          <TableHead class="w-[10px]"> STT </TableHead>
          <TableHead>Mã giao dịch</TableHead>
          <TableHead>Số dư trước</TableHead>
          <TableHead>Số tiền</TableHead>
          <TableHead>Số dư sau</TableHead>
          <TableHead>Số điện thoại</TableHead>
          <TableHead>Mô tả</TableHead>
          <TableHead>Ghi chú</TableHead>
          <TableHead>Ngày tạo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(item,index) in formattedData" :key="item.id">
          <!-- STT -->
          <TableCell class="w-[10px]"> {{ index + 1 }} </TableCell>
          <!-- Điểm đón -->
          <TableCell> {{item.code}} </TableCell>
          <TableCell> {{ item.balance_before }} </TableCell>
          <TableCell> {{ item.amount.includes("-") ? item.amount : `+${item.amount}` }} </TableCell>
          <TableCell> {{ item.balance_after }} </TableCell>
          <TableCell> {{ item.user_receiving.user_phone }}</TableCell>
          <TableCell> {{ item.desciption }}</TableCell>
          <TableCell> {{ item.note || '...' }}</TableCell>
          <TableCell> {{ item.created_at }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </ScrollArea>
</template>

<script lang="ts" setup>
import type { ITransaction } from "@/model/transaction";
import { format } from "date-fns";
interface IProps {
  loading?: boolean;
  data?: ITransaction[];
}

const props = withDefaults(defineProps<IProps>(), {
  loading: false,
  data: (): ITransaction[] => [],
});

const formattedData = computed(() => {
  return props?.data.map((item) => ({
    ...item,
    amount: new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(item.amount).toString(),  
    balance_before: new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(item.balance_before),
    balance_after: new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(item.balance_after!),
    created_at: format(item.created_at, "HH:mm dd/MM/yyyy"),
    // price_guest: new Intl.NumberFormat("vi-VN", {
    //   style: "currency",
    //   currency: "VND",
    // }).format(item.price_guest!),
    // price_system: new Intl.NumberFormat("vi-VN", {
    //   style: "currency",
    //   currency: "VND",
    // }).format(item.price_system!),
    // price: new Intl.NumberFormat("vi-VN", {
    //   style: "currency",
    //   currency: "VND",
    // }).format(item.price!),
    // price_guest_after: new Intl.NumberFormat("vi-VN", {
    //   style: "currency",
    //   currency: "VND",
    // }).format(item.price_guest_after!),
    // net_profit: new Intl.NumberFormat("vi-VN", {
    //   style: "currency",
    //   currency: "VND",
    // }).format(item.net_profit!),
  }));
});
</script>

<style></style>
