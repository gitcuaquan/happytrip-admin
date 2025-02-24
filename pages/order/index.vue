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
    <!-- Tạo file export -->
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button size="sm" class="ms-auto" variant="outline">
            <FolderDown :size="30" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Xuất File</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <!-- Tạo đơn -->
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button size="sm">
            <FilePlus2 :size="30" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Tạo đơn</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </OrderModuleFilter>
  <OrderModuleList :loading="loading" :orders="orderData?.data" />
  <template v-if="orderData && orderData.pagination && orderData.pagination.count > 0">
    <SharePagination
      :total="orderData.pagination.count"
      :items-per-page="params.limit"
      v-model="params.page"
    />
  </template>
</template>

<script lang="ts" setup>
import type { FilterOnParams } from "@/model/common";
import type { RsData } from "@/model/interface";
import { eOrderStatus, OrderFilter, type IOrder } from "@/model/order";
import { addDays, format } from "date-fns";
import { FolderDown, FilePlus2 } from "lucide-vue-next";

const { $OrderService } = useServices();

const orderData = ref<RsData<IOrder>>();

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
