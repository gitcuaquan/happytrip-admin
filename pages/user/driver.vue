<template>
  <ScrollArea class="h-[calc(100vh-220px)] shadow-sm">
    <ShareLoading v-if="state.loading" />
    <Table>
      <TableHeader class="sticky top-0 z-10 bg-white shadow-sm">
        <TableRow>
          <TableHead class="w-[10px]"> STT </TableHead>
          <TableHead>Tài xế</TableHead>
          <TableHead>Số điện thoại</TableHead>
          <TableHead>Phương tiện</TableHead>
          <TableHead>Biển số</TableHead>
          <TableHead> Ngày đăng ký</TableHead>
          <TableHead>	Trạng thái</TableHead>
          <!-- Cột action -->
          <TableHead class="w-[10px]"> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody v-if="driverData">
        <TableRow v-for="(item, index) in driverData.data" :key="index">
          <TableCell class="font-medium"> {{ index + 1 }} </TableCell>
          <TableCell>
            {{ item.full_name }}
          </TableCell>
          <TableCell>
            {{ item.phone }}
          </TableCell>
          <TableCell>
            {{ item.transport.ten_xe || 'Không xác định' }} (xe {{ item.transport.type_name }})
          </TableCell>
          <TableCell>
            {{ item.transport.license_plate }}
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
  <template v-if="driverData">
    <SharePagination
      :total="driverData.pagination.count"
      :items-per-page="20"
      v-model="params.page"
    />
  </template>
</template>

<script lang="ts" setup>
import { format } from "date-fns";
import { FilterOnParams } from "~/model/common";
import type { ResponeData } from "~/model/interface";
import type { Partner } from "~/model/partner";

const { $PartnerService } = useServices();
// params
const params = ref<FilterOnParams>(new FilterOnParams({limit:50}));
// filter
const filter = ref({});
// State
const state = reactive({
  loading: false,
});
// Data
const driverData = ref<ResponeData<Partner>>();

async function getData() {
  state.loading = true;
  try {
    const res = await $PartnerService.getListPartner(
      filter.value,
      params.value
    );
    driverData.value = res;
    console.log(res);
  } catch (error) {
    console.log(error);
  } finally {
    state.loading = false;
  }
}

onMounted(() => {
  getData();
});
</script>

<style></style>
