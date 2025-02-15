<template>
  <ScrollArea class="h-[calc(100vh-130px)] shadow-sm">
    <ShareLoading v-if="state.loading" />
    <Table>
      <TableHeader class="sticky top-0 z-10 bg-white shadow-sm">
        <TableRow>
          <TableHead class="w-[10px]"> STT </TableHead>
          <TableHead>Loại hình</TableHead>
          <TableHead>Người thực hiện</TableHead>
          <TableHead> Ngày Khởi tạo </TableHead>
          <TableHead> Loại file </TableHead>
          <TableHead> Trạng thái </TableHead>
          <TableHead class="w-[10px]"> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody v-if="reportData">
        <TableRow v-for="(item, index) in reportData.data" :key="index">
          <TableCell class="font-medium"> {{ index + 1 }} </TableCell>
          <TableCell>
            {{ item.type_value }}
          </TableCell>
          <TableCell>
            <div class="flex gap-2">
              <UserPen :size="15" /> {{ item.admin.full_name }}
            </div>
          </TableCell>
          <TableCell>
            {{ format(new Date(item.request_date), "HH:mm dd/MM/yyyy") }}
          </TableCell>
          <TableCell>
            <div class="flex items-center gap-2">
              <Sheet :size="15" /> {{ item.format_value }}
            </div>
          </TableCell>
          <TableCell>
            <Badge :variant="item.status === 2 ? 'success' : 'destructive'">
              {{ item.status_value }}
            </Badge>
          </TableCell>
          <TableCell>
            <Button @click="saveAsXlsxFile(item.fileDataBase64)" variant="ghost" size="sm">
              <FileDown />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </ScrollArea>
  <template v-if="reportData">
    <SharePagination :total="reportData.pagination.count" :items-per-page="20" v-model="params.page" />
  </template>
</template>
<script setup lang="ts">
  import { Badge } from "@/components/ui/badge";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import { FilterOnParams } from "../model/common";
  import type { ResponeData, ReportItem } from "../model/interface";
  import { FileDown, Sheet, UserPen } from "lucide-vue-next";
  import { format } from "date-fns";
  import { toast } from "vue-sonner";

  const { $ReportService } = useServices();

  const reportData = ref<ResponeData<ReportItem>>();
  const state = reactive({
    loading: false,
  });
  const params = ref<FilterOnParams>(
    new FilterOnParams({
      fields:
        "id,type_value,type,request_date,format,format_value,status,status_value,admin,fileDataBase64",
    })
  );

  onMounted(() => {
    getData();
  });

  watch(
    () => params.value.page,
    () => {
      getData();
    }
  );

  async function getData() {
    state.loading = true;
    try {
      const res = await $ReportService.get(params.value, {});
      reportData.value = res;
    } catch (error) {
      console.log(error);
      toast.error("Failed to load report data");
    } finally {
      state.loading = false;
    }
  }
  function saveAsXlsxFile(base64: string) {
    var mediaType =
      "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,";
    var a = document.createElement("a");
    a.href = mediaType + base64;
    //a.href = mediaType+userInp;
    a.download = `report-${format(new Date(), "HH:mm:ss dd-MM-yyyy")}.xlsx`;
    a.textContent = "Download file!";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("Tải file thành công");
  }
</script>
