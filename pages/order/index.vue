<template>
  <OrderModuleFilter :filter="filter">
    <div class="w-[150px]">
      <Select v-model="orderStatusSelect">
        <SelectTrigger>
          <SelectValue placeholder="Trạng thái đơn" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="city in partnerStatus"
            :key="city.label"
            :value="city.value?.toString() || ''"
            >{{ city.label }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <Button @click="openShowAct = true">
      <FilePlus2 :size="30" />
      Tạo đơn
    </Button>
    <!-- Tạo đơn -->
  </OrderModuleFilter>
  <OrderModuleList :loading="loading" :orders="orderData?.data" />
  <template
    v-if="orderData && orderData.pagination && orderData.pagination.count > 0"
  >
    <SharePagination
      :total="orderData.pagination.count"
      :items-per-page="params.limit"
      v-model="params.page"
    />
  </template>
  <OrderModalAct
    @hidden="
      () => {
        openShowAct = false;
        resetAll();
      }
    "
    v-if="openShowAct"
    @create="
      () => {
        getListOrder();
        openShowAct = false;
        resetAll();
      }
    "
  />
</template>

<script lang="ts" setup>
import type { FilterOnParams } from "@/model/common";
import type { RsData } from "@/model/interface";
import { eOrderStatus, OrderFilter, type IOrder } from "@/model/order";
import { addDays, format } from "date-fns";
import { FolderDown, FilePlus2 } from "lucide-vue-next";

useBreadcrum().setBreadcrum([
  { name: "Tổng quan", to: "/" },
  { name: "Quản lý đơn hàng", to: "/order" },
  { name: "Đơn đang đợi nhận" },
]);
const { getActionType, resetAll } = useOrder();
const { $OrderService } = useServices();

const actionType = computed(() => {
  return getActionType();
});

watch(
  () => actionType.value,
  (value) => {
    if (value === "view") {
      openShowAct.value = true;
    }
  },
  { immediate: true }
);

const orderData = ref<RsData<IOrder>>();

const openShowAct = ref<boolean>(false);

const loading = ref<boolean>(true);

const orderStatusSelect = ref("");

const partnerStatus = [
  {
    label: "Tất cả",
    value: -1,
  },
  {
    label: "Còn hiệu lực",
    value: 0,
  },
  {
    label: "Hết hiệu lực",
    value: 1,
  },
];

const params = ref<FilterOnParams>({
  page: 1,
  limit: 50,
  fields:
    "id,order_code,city_diemden,city_diemdon,partner_id,partner_name,partner_phone,price,net_profit,price_system,creator_id,creator,created_at",
});

const filter = ref<OrderFilter>({
  from_date_of_destination: format(addDays(new Date(), -180), "yyyy-MM-dd"),
  to_date_of_destination: format(new Date(), "yyyy-MM-dd"),
  order_status: eOrderStatus.WAITING,
  city_diemden: "",
  city_diemdon: "",
  keyword: "",
});

watch(
  () => orderStatusSelect.value,
  (value) => {
    if (value === "-1") {
      delete filter.value.order_expired;
    } else if (value === "0") {
      filter.value.order_expired = true;
    } else if (value === "1") {
      filter.value.order_expired = false;
    }
  }
);

function getListOrder() {
  loading.value = true;
  $OrderService
    .list(params.value, filter.value)
    .then((res) => {
      orderData.value = res;
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
    })
    .finally(() => {
      loading.value = false;
    });
}

watch(
  () => filter.value,
  () => {
    getListOrder();
  },
  { deep: true }
);

watch(
  () => params.value,
  () => {
    getListOrder();
  },
  { deep: true }
);

getListOrder();
</script>

<style></style>
