<template>
  <FinanceModuleFilterTransaction v-model:filter="filter">
    <Button class="ms-auto"><FileDown />Xuất file</Button>
  </FinanceModuleFilterTransaction>
  <FinanceModuleListTransaction
    :loading="state.loading"
    :data="transactionData?.data"
  />
  <template
    v-if="
      transactionData && transactionData.data && transactionData.data.length > 0
    "
  >
    <SharePagination
      :total="transactionData.pagination.count"
      :items-per-page="params.limit"
      v-model="params.page"
    />
  </template>
</template>

<script lang="ts" setup>
import { FilterOnParams, type IFilterOnParams } from "@/model/common";
import type { RsData } from "@/model/interface";
import type { ITransaction, TransactionFilter } from "@/model/transaction";
import {FileDown} from "lucide-vue-next";
import { addDays, format } from "date-fns";
import { useTitle } from "@vueuse/core";

useBreadcrum().setBreadcrum([
  { name: "Tổng quan", to: "/" },
  { name: "Ví", to: "/finance/wallet-list" },
  { name: "Lịch sử giao dịch" },
]);
useTitle("Lịch sử giao dịch");
const { $TransactionService } = useServices();

const params = ref<IFilterOnParams>(new FilterOnParams({ limit: 50 }));
const filter = ref<TransactionFilter>({
  from_date: format(addDays(new Date(), -180), "yyyy-MM-dd"),
  to_date: format(new Date(), "yyyy-MM-dd"),
});
const state = reactive({ loading: true });
const transactionData = ref<RsData<ITransaction>>();

function getData() {
  state.loading = true;
  $TransactionService
    .getLists(params.value, filter.value)
    .then((res) => {
      transactionData.value = res;
    })
    .catch((error) => {
      console.log("🚀 ~ getData ~ error:", error);
    })
    .finally(() => {
      state.loading = false;
    });
}

watch(
  () => params.value.page,
  () => {
    getData();
  }
);
watch(
  () => filter.value,
  () => {
    console.log("🚀 ~ watch ~ filter.value:", filter.value);
    getData();
  },
  { deep: true }
);
onMounted(() => {
  getData();
});
</script>

<style></style>
