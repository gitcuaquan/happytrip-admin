<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline"> Tạo Thông Báo </Button>
    </DialogTrigger>
    <DialogContent
      class="w-[90vw] md:w-[450px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]"
    >
      <DialogHeader class="p-6 pb-0">
        <DialogTitle>Tạo thông báo</DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4 grid-cols-12 overflow-y-auto px-6">
        <!-- nội dung text -->
        <div class="col-span-12">
          <div class="flex flex-col gap-4">
            <Input v-model="data.title" label="Tiêu đề" placeholder="Nhập tiêu đề thông báo" />
            <Input
            label="Đính kèm ảnh"
            @change="onInputChanged"
            type="file"
            accept=".pdf,.jpeg,.jpg,.png"
            placeholder="Chọn ảnh đính kèm"
          />
          </div>
        </div>
      </div>
      <DialogFooter class="p-6 pt-0">
        <Button :loading="loading" @click="onSave"> Lưu Thông Báo </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import { Trash2 } from "lucide-vue-next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { IAnnouncement } from "@/model/announcement";

const { $AnnouncementService } = useServices();
const loading = ref<boolean>(false);
const data = ref<IAnnouncement>({
  title: "",
  file: null,
});
const file = ref<File | null>(null);

function onInputChanged(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    file.value = target.files[0];
  }
}

async function onSave() {
  loading.value = true;
// tải ảnh lên server
 const _data = await $AnnouncementService.uploadImage(file.value as File);
// tạo thông báo
 const a =   await $AnnouncementService.addAnnouncement({
    title: data.value.title,
    file: (_data as any).url,
  });
  loading.value = false;
}


</script>

<style></style>
