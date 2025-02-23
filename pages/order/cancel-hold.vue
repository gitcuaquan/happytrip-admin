<template>
  <OrderModuleOcFilter :filter="filter" />
  <OrderModuleOcList :loading="loading" :orders="orderData?.data" />
  <template
    v-if="orderData && orderData.pagination && orderData.pagination.count > 0"
  >
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
import type { OrderCancelItem, OrderFilter } from "@/model/order";
import { addDays, format } from "date-fns";

const { $OrderCancelService } = useServices();

const orderData = ref<ResponeData<OrderCancelItem>>();

const loading = ref<boolean>(true);

const params = ref<FilterOnParams>({
  page: 1,
  limit: 50,
  fields:
    "id,note,short_id,order_short_id,user_creator_order,user_creator,order_id,type_value,customer,partner,status_value,departure,destination,name_service,date_of_destination",
});

const filter = ref<OrderFilter>({
  from_created_at: format(addDays(new Date(), -180), "yyyy-MM-dd"),
  to_created_at: format(new Date(), "yyyy-MM-dd"),
  keyword: "",
});

async function getList() {
  
  loading.value = true;
  try {
    const response = await $OrderCancelService.getOrderCancelList(
      params.value,
      filter.value
    );
    orderData.value = response;
  } catch (error) {
    console.error("Error fetching order data:", error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getList();
});

watch(
  () => params.value,
  () => {
    getList();
  },
  { deep: true }
);

watch(
  () => filter.value,
  () => {
    if(filter.value.order_cancel_type?.toString()=='null'){
      delete filter.value.order_cancel_type;
    }
    getList();
  },
  { deep: true }
);
</script>

<style></style>
