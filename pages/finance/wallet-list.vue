<template>

  <ScrollArea class="h-[calc(100vh-140px)] shadow-sm">
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
            <Badge v-if="item.affilate_id">
              Cộng tác viên
            </Badge>
            <Badge v-else variant="success">
              Tài xế
            </Badge>
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
    <SharePagination :total="walletData.pagination.count" :items-per-page="20" v-model="params.page" />
  </template>
</template>

<script lang="ts" setup>
  import { format } from 'date-fns';
  import { FilterOnParams, type IFilterOnParams } from '~/model/common';
  import type { ResponeData } from '~/model/interface';
  import { WalletFilter, type IWallet } from '~/model/wallet';
  import { Ellipsis } from "lucide-vue-next";




  const { $WalletService } = useServices();

  const walletData = ref<ResponeData<IWallet> | null>(null);
  // params
  const params = ref<IFilterOnParams>(new FilterOnParams({ limit: 50 }));
  // filter 
  const filter = ref<WalletFilter>(new WalletFilter());
  // loading 
  const state = reactive({
    loading: false,
  });
  async function getData() {
    try {
      state.loading = true;
      const res = await $WalletService.getLists(params.value, filter.value);
      walletData.value = res;
    } catch (error) {
      console.log(error);
    }
    finally {
      state.loading = false;
    }
  }
  onMounted(() => {
    getData();
  });


  watch(() => params.value.page, () => {
    getData();
  });

</script>

<style></style>