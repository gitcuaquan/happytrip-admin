<template>
  <Card class="p-3">
    <div class="flex gap-3 items-center">
      <!-- Input tìm kiếm -->
      <div class="relative w-full max-w-sm items-center">
        <Input
          v-model="keyword"
          id="search"
          type="text"
          placeholder="Tìm kiếm theo phone,số điện thoại,id..."
          class="pl-10"
        />
        <span
          class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
        >
          <Search />
        </span>
      </div>
      <!-- Chọn loại ví -->
      <div class="w-40">
        <Select v-model="state.wallet_type">
          <SelectTrigger>
            <SelectValue placeholder="Chọn loại ví" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all"> Tất cả </SelectItem>
            <SelectItem value="tai_xe"> Tài xế </SelectItem>
            <SelectItem value="cong_tac_vien"> Cộng tác viên </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button class="ms-auto"><FolderDown /> Xuất Dữ Liệu </Button>
    </div>
  </Card>
  <ScrollArea class="h-[calc(100vh-220px)] shadow-sm">
    <ShareLoading v-if="state.loading" />
    <Table>
      <TableHeader class="sticky top-0 z-10 bg-white shadow-sm">
        <TableRow>
          <TableHead class="w-[10px]"> STT </TableHead>
          <TableHead>Mã ví</TableHead>
          <TableHead>Chủ ví</TableHead>
          <TableHead>Số điện thoại</TableHead>
          <TableHead>Số dư ví</TableHead>
          <TableHead>Giới hạn</TableHead>
          <TableHead>Kí quỹ</TableHead>
          <TableHead>Loại ví</TableHead>
          <TableHead>Ngày Tạo</TableHead>
          <!-- Cột action -->
          <TableHead class="w-[10px]"> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody v-if="walletData">
        <TableRow v-for="(item, index) in walletData.data" :key="index">
          <TableCell class="font-medium"> {{ index + 1 }} </TableCell>
          <TableCell>
            {{ item.short_id }}
          </TableCell>
          <TableCell>
            {{ item.partner?.full_name || item.affilate?.full_name }}
          </TableCell>
          <TableCell>
            {{ item.partner?.phone || item.affilate?.phone }}
          </TableCell>
          <TableCell>
            {{ toCurrency(item.balance) }}
          </TableCell>
          <TableCell>
            {{ toCurrency(item.limit_debit) }}
          </TableCell>
          <TableCell>
            {{ toCurrency(item.wallet_deposit || 0) }}
          </TableCell>
          <TableCell>
            <Badge v-if="item.affilate_id"> Cộng tác viên </Badge>
            <Badge v-else variant="success"> Tài xế </Badge>
          </TableCell>
          <TableCell>
            {{ format(item.created_at, "dd/MM/yyyy") }}
          </TableCell>
          <TableCell>
            <Button variant="ghost" size="sm">
              <Ellipsis />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </ScrollArea>
  <template v-if="walletData">
    <SharePagination
      :total="walletData.pagination.count"
      :items-per-page="20"
      v-model="params.page"
    />
  </template>
</template>

<script lang="ts" setup>
import { format } from "date-fns";
import { FilterOnParams, type IFilterOnParams } from "~/model/common";
import type { RsData } from "~/model/interface";
import { WalletFilter, type IWallet } from "~/model/wallet";
import { Ellipsis, Search, FolderDown } from "lucide-vue-next";
import { Card } from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
useBreadcrum().setBreadcrum([
  { name: "Tổng quan", to: "/" },
  { name: "Ví" },
  { name: "Danh sách ví" },
]);

const { $WalletService } = useServices();

const keyword = useDebouncedRef("", 300);
// data
const walletData = ref<RsData<IWallet> | null>(null);
// params
const params = ref<IFilterOnParams>(new FilterOnParams({ limit: 50 }));
// filter
const filter = ref<WalletFilter>(new WalletFilter());
// loading
const state = reactive({
  loading: false,
  wallet_type: "all",
});

onMounted(() => {
  getData();
});

watch([() => state.wallet_type, () => params.value.page], () => {
  filter.value.isAffilate =
    state.wallet_type == "all"
      ? null
      : state.wallet_type == "cong_tac_vien"
      ? true
      : false;
  getData();
});

watch(keyword, (newQuery) => {
  filter.value.keyword = newQuery;
  getData();
});

// ======= FUNCTION =======

async function getData() {
  try {
    state.loading = true;
    const res = await $WalletService.getLists(params.value, filter.value);
    walletData.value = res;
  } catch (error) {
    console.log(error);
  } finally {
    state.loading = false;
  }
}
</script>

<style></style>
