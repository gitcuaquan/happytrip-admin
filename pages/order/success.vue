<template>
  <OrderModuleFilter :filter="filter">
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
import type { ResponeData } from "@/model/interface";
import { eOrderStatus, OrderFilter, type IOrder } from "@/model/order";
import { addDays, format } from "date-fns";
import { FolderDown, FilePlus2 } from "lucide-vue-next";

const { $OrderService } = useServices();

const orderData = ref<ResponeData<IOrder>>();

const loading = ref<boolean>(true);

const params = ref<FilterOnParams>({
  page: 1,
  limit: 50,
});

const filter = ref<OrderFilter>({
  from_date_of_destination: format(addDays(new Date(), -180), "yyyy-MM-dd"),
  to_date_of_destination: format(new Date(), "yyyy-MM-dd"),
  order_status: eOrderStatus.COMPLETED,
  city_diemden: "",
  city_diemdon: "",
  keyword: "",
});



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
