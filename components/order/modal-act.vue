<template>
  <Dialog :default-open="true" @update:open="emit('hidden')">
    <DialogContent
      class="w-[50vw] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]"
    >
      <DialogHeader class="p-6 pb-0">
        <DialogTitle> Thêm mới chuyến đi</DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4 grid-cols-12 overflow-y-auto px-6">
        <!-- nội dung text -->
        <div class="col-span-6">
          <div class="flex flex-col gap-2">
            <Label>Tên khách hàng</Label>
            <Input placeholder="Nhập tên khách hàng" />
          </div>
        </div>
        <div class="col-span-6">
          <div class="flex flex-col gap-2">
            <Label>SĐT khách hàng</Label>
            <Input placeholder="Nhập số điện thoại khách hàng" />
          </div>
        </div>
        <div class="col-span-4">
          <div class="flex flex-col gap-2">
            <Label>Ngày đón</Label>
            <Input
              type="datetime-local"
              :min="new Date().toISOString().slice(0, 16)"
              placeholder="Nhập ngày đón"
            />
          </div>
        </div>
        <div class="col-span-4">
          <div class="flex flex-col gap-2">
            <Label>Dịch vụ</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Chọn dịch vụ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="service in state.happytripData?.data"
                  :value="service.id"
                  :key="service.id"
                >
                  {{ service.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div class="col-span-4">
          <div class="flex flex-col gap-2">
            <Label>SĐT Tài xế</Label>
            <Input placeholder="Nhập số điện thoại tài xế" />
          </div>
        </div>
      </div>
      <DialogFooter class="p-6 pt-0">
        <Button> Tạo đơn </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { IHappytripService } from "@/model/happytrip";
import type { RsData } from "@/model/interface";

const emit = defineEmits(["hidden"]);

const { $HappytripService } = useServices();

const state = reactive({
  loading: false,
  happytripData: {} as RsData<IHappytripService>,
});

onMounted(() => {
  $HappytripService.getList().then((res) => {
    state.happytripData = res;
  });
});
</script>

<style></style>
