<template>
  <div>
    <h1>Transaction Module</h1>
    <p>This module will display transaction details.</p>
    <FinanceModuleListTransaction :loading="state.loading" :data="transactionData?.data" />
    <template
      v-if="
        transactionData &&
        transactionData.data &&
        transactionData.data.length > 0
      "
    >
      <SharePagination
        :total="transactionData.pagination.count"
        :items-per-page="params.limit"
        v-model="params.page"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { FilterOnParams, type IFilterOnParams } from "@/model/common";
import type { RsData } from "@/model/interface";
import type { ITransaction } from "@/model/transaction";
useBreadcrum().setBreadcrum([
  { name: "Tổng quan", to: "/" },
  { name: "Ví", to: "/finance/wallet-list" },
  { name: "Lịch sử giao dịch" },
]);

const { $TransactionService } = useServices();

const keyword = useDebouncedRef("", 300);
const params = ref<IFilterOnParams>(new FilterOnParams({ limit: 50 }));
const filter = ref<any>({});
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
      console.log("🚀 ~ getData ~ error:", error)
    }).finally(() => {
      state.loading = false;
    });
}

watch([() => params.value.page], () => {
  getData();
});
onMounted(() => {
  getData();
});
</script>

<style></style>
