<template>
  <Card>
    <CardContent class="p-3">
        <NotifiModuleAct/>
    </CardContent>
  </Card>
  <ScrollArea class="h-[calc(100vh-220px)] shadow-sm">
    <ShareLoading v-if="loading" />
    <ShareNoData v-else-if="!announcementData?.data.length" />
    <Table>
      <TableHeader class="sticky top-0 z-10 bg-white shadow-sm">
        <TableRow>
          <TableHead class="w-[10px]"> ID </TableHead>
          <TableHead>Ngày</TableHead>
          <TableHead>Điểm đón</TableHead>
          <TableHead>Điểm trả</TableHead>
          <TableHead>Dịch vụ</TableHead>
          <TableHead>Thu khách</TableHead>
          <TableHead>Tài xế nhận</TableHead>
          <TableHead>Hoa hồng</TableHead>
          <TableHead>Phí sàn</TableHead>
          <TableHead>ĐT tài xế</TableHead>
          <TableHead>Người tạo</TableHead>
          <!-- Cột action -->
          <TableHead class="w-[10px]"> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="order in announcementData?.data" :key="order.id">
          <!-- ID đơn -->
          <TableCell class="w-[10px]"> {{ order?.id }} </TableCell>
  
          <!-- Cột action -->
          <TableCell class="w-[10px]">
            <Button :variant="'ghost'" size="sm" class="text-gray-500">
              <Ellipsis />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </ScrollArea>
  <template
    v-if="announcementData && announcementData.pagination && announcementData.pagination.count > 0"
  >
    <SharePagination
      :total="announcementData.pagination.count"
      :items-per-page="params.limit"
      v-model="params.page"
    />
  </template>

</template>

<script lang="ts" setup>
import type { IAnnouncement } from '@/model/announcement';
import type { FilterOnParams } from '@/model/common';
import type { RsData } from '@/model/interface';


const { $AnnouncementService } = useServices();
const params = ref<FilterOnParams>({
  page: 1,
  limit: 10,
});
const loading = ref<boolean>(true);

const announcementData = ref<RsData<IAnnouncement>>();

const fetchAnnouncements = async () => {
  
  loading.value = true; // set loading to true when fetching starts
  try {
    const announcements = await $AnnouncementService.getAnnouncements({
      page: params.value.page, // updated to use dynamic page value
      limit: params.value.limit, // updated to use dynamic limit value
    });
    announcementData.value = announcements; // store announcements in announcementData
  } catch (error) {
    console.error("Error fetching announcements:", error);
  } finally {
    loading.value = false; // set loading to false when fetching completes
  }
};


fetchAnnouncements();
</script>

<style></style>
