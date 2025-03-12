<template>
<FinanceModuleList/>
</template>

<script lang="ts" setup>
import type { FilterOnParams } from '@/model/common';
import type { WithdrawFilter } from '@/model/withdraw';
import { addDays, format } from 'date-fns';


const {$WithdrawService } = useServices()


const params = ref<FilterOnParams>({
  limit:50,
  fields: "id,short_id,creator,price,status,created_at"
})
const filter = ref<WithdrawFilter>({
  from_create_at:  format(addDays(new Date(), -180), "yyyy-MM-dd"),
  to_create_at: format(new Date(), "yyyy-MM-dd"),
  withdraw_status:1
})

async function getList() {
  try {
    const response = await $WithdrawService.list(params.value, filter.value);
    console.log(response);
  } catch (error) {
    console.log(error)
  }
}


onBeforeMount(() => {
  getList();
});

</script>

<style>

</style>