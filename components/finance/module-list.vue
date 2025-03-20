<template>
  <ScrollArea class="h-[calc(100vh-220px)] shadow-sm">
    <ShareLoading v-if="props.loading" />
    <ShareNoData v-else-if="!props.data.length" />
    <Table>
      <TableHeader class="sticky top-0 z-10 bg-white shadow-sm">
        <TableRow>
          <TableHead>Mã lệnh</TableHead>
          <TableHead>Số tiền</TableHead>
          <TableHead>Người tạo lệnh</TableHead>
          <TableHead>Ngày đặt lệnh</TableHead>
          <TableHead>Vai trò</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead>Ngày cập nhật</TableHead>
          <TableHead class="text-center">Người duyệt lệnh</TableHead>
          <TableHead class="w-[10px]"> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(item, index) in formattedData" :key="item.id">
          
          <!-- Số tiền -->
          <TableCell>
            <Badge class="min-w-[100px] text-center" :variant="'secondary'">
              {{ item.short_id }}
            </Badge>  
          </TableCell>
          <TableCell> {{ item.price }} </TableCell>
          <TableCell> 
            {{ item.creator?.user_name }} <br>
            <small><i>{{ item.creator?.user_phone }}</i></small>
          </TableCell>
          <TableCell> {{ item.created_at }} </TableCell>
          <TableCell> Tài xế </TableCell>
          <TableCell> 
            <Badge :variant="item.status === 1 ? 'success' : item.status === 2 ? 'danger' : 'default'">
              {{ item.status_value }}
            </Badge>
          </TableCell>
          <TableCell> {{ item.accepted_at }}</TableCell>
          <TableCell class="text-center"> 
            <Badge v-if="item.acceptor" :variant="'outline'">
              {{ item.acceptor?.user_full_name }}
            </Badge>
          </TableCell>
          <TableCell>
            <div v-if="item.status == 0" class="inline-flex gap-2 flex-nowrap pe-2">
              <Button size="sm" variant="success">
                Chấp nhận
              </Button>
              <Button size="sm" variant="danger">
                Từ chối
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </ScrollArea>
</template>

<script lang="ts" setup>
import type { ITransaction } from "@/model/transaction";
import { TrendingDown, TrendingUp } from "lucide-vue-next";
import { format } from "date-fns";
import type { IWithdraw } from "@/model/withdraw";
interface IProps {
  loading?: boolean;
  data?: IWithdraw[];
}

const props = withDefaults(defineProps<IProps>(), {
  loading: false,
  data: (): IWithdraw[] => [],
});

const formattedData = computed(() => {
  return props?.data.map((item) => ({
    ...item,
    price: new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(item.price!)
      .toString(),
    created_at: format(item.created_at!, "HH:mm dd/MM/yyyy"),
    accepted_at: item.accepted_at ? format(item.accepted_at, "HH:mm dd/MM/yyyy") : null,
  }));
});
</script>

<style></style>
