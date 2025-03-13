<template>
  <Card>
    <CardContent class="p-3 flex w-full items-center">
     <div class="ms-auto">
      <NotifiModuleAct  @update="onUpdate" :data="itemEdit" v-model="open" />
     </div>
    </CardContent>
  </Card>
  <ScrollArea class="h-[calc(100vh-220px)] shadow-sm">
    <ShareLoading v-if="loading" />
    <ShareNoData v-else-if="!announcementData?.data.length" />
    <Table>
      <TableHeader class="sticky top-0 z-10 bg-white shadow-sm">
        <TableRow>
          <TableHead class="w-[10px]"> ID </TableHead>
          <TableHead>Tiêu đề</TableHead>
          <TableHead>File liên quan</TableHead>
          <TableHead>Ngày tạo</TableHead>
          <!-- Cột action -->
          <TableHead class="w-[10px]"> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in announcementData?.data" :key="item.id">
          <!-- ID đơn -->
          <TableCell class="w-[10px]"> {{ item?.id }} </TableCell>
          <TableCell> {{ item?.title }} </TableCell>
          <TableCell>
            <a :href="item?.file" target="_blank">{{
              item?.file?.substring(item.file.lastIndexOf("/") + 1)
            }}</a>
          </TableCell>
          <TableCell> {{ format(item.created_at!, "dd/MM/yyyy") }} </TableCell>
          <!-- Added to display related image -->
          <!-- Cột action -->
          <TableCell class="w-[10px]">
            <div class="flex flex-nowrap">
              <Button
                :variant="'ghost'"
                size="sm"
                class="text-red-500"
                @click="handleAction(item?.id)"
              >
                <Trash2 />
              </Button>
              <Button
                :variant="'ghost'"
                size="sm"
                @click="handleUpdate(item)"
              >
              <SquarePen />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </ScrollArea>
  <template
    v-if="
      announcementData &&
      announcementData.pagination &&
      announcementData.pagination.count > 0
    "
  >
    <SharePagination
      :total="announcementData.pagination.count"
      :items-per-page="params.limit"
      v-model="params.page"
    />
  </template>
</template>

<script lang="ts" setup>
import type { IAnnouncement } from "@/model/announcement";
import type { FilterOnParams } from "@/model/common";
import type { RsData } from "@/model/interface";
import { format } from "date-fns";
import { Trash2,SquarePen } from "lucide-vue-next";
import { toast } from "vue-sonner";

const { $AnnouncementService } = useServices();
const params = ref<FilterOnParams>({
  page: 1,
  limit: 10,
});
const loading = ref<boolean>(true);

const open = ref<boolean>(false);
const itemEdit = ref<IAnnouncement | null>(null);

const announcementData = ref<RsData<IAnnouncement>>();
  watch(()=>open.value, (value) => {
    if (!value) {
      itemEdit.value = null;
    }
  });

watch(params, () => fetchAnnouncements(), { deep: true });

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

const handleAction = async (id?: string) => {
  if (!id) {
    console.error("No ID provided for action.");
    return;
  }
  if (confirm("Bạn có chắc chắn muốn xóa thông báo này không?")) {
    try {
      await $AnnouncementService.deleteAnnouncement(id);
      fetchAnnouncements();
      toast.success("Xóa thông báo thành công!");
    } catch (error) {
      console.error("Error deleting announcement:", error);
      toast.error("Xóa thông báo thất bại!");
    }
  }
};

const handleUpdate = (item:IAnnouncement) => {
  itemEdit.value = item;
  open.value = true;
};

const onUpdate = (data: IAnnouncement) => {
  const index = announcementData.value?.data.findIndex((item) => item.id === data.id);
  if (index !== undefined && index !== -1) {
    announcementData.value!.data[index] = data;
  }
  itemEdit.value = null;
};
// Fetch announcements when component is mounted
fetchAnnouncements();
</script>

<style></style>
