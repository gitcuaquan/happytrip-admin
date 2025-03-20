<template>
<FinanceModuleList :loading="loading" :data="withdrawsData?.data"/>
<template
    v-if="
      withdrawsData && withdrawsData.data && withdrawsData.data.length > 0
    "
  >
    <SharePagination
      :total="withdrawsData.pagination.count"
      :items-per-page="params.limit"
      v-model="params.page"
    />
  </template>
</template>

<script lang="ts" setup>
import type { FilterOnParams } from '@/model/common';
import type { RsData } from '@/model/interface';
import type { IWithdraw, WithdrawFilter } from '@/model/withdraw';
import { useTitle } from '@vueuse/core';
import { addDays, format } from 'date-fns';
useBreadcrum().setBreadcrum([
  { name: "Tổng quan", to: "/" },
  { name: "Ví" },
  { name: "Danh sách lệnh rút tiền" },
]);

useTitle("Danh sách lệnh rút tiền");

const { $WithdrawService } = useServices()


const loading = ref(true);

const withdrawsData = ref<RsData<IWithdraw>>();

const params = ref<FilterOnParams>({
  limit:50,
  fields: "id,short_id,creator,price,status,created_at,status,status_value,acceptor,accepted_at,transaction_id"
})
const filter = ref<WithdrawFilter>({
  from_create_at:  format(addDays(new Date(), -180), "yyyy-MM-dd"),
  to_create_at: format(new Date(), "yyyy-MM-dd"),
  // withdraw_status:1
})
watch(
  () => params.value.page,
  () => {
    getList();
  }
);
async function getList() {
  loading.value = true;
  try {
    const response = await $WithdrawService.list(params.value, filter.value);
    withdrawsData.value = response;
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false;
  }
}


onBeforeMount(() => {
  getList();
});

</script>

<style>

</style>