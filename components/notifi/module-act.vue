<template>
  <Dialog v-model:open="open">
    <DialogTrigger>
      <Button ><BellPlus /> Tạo Mới </Button>
    </DialogTrigger>
    <DialogContent
      class="w-[90vw] md:w-[450px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]"
    >
      <DialogHeader class="p-6 pb-0">
        <DialogTitle>{{ props.data?.id ? 'Cập nhật' : 'Tạo mới' }} thông báo</DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4 grid-cols-12 overflow-y-auto px-6">
        <!-- nội dung text -->
        <div class="col-span-12">
          <div class="flex flex-col gap-4">
            <Label>Tiêu đề </Label>
            <Input
              v-model="data.title"
              label="Tiêu đề"
              placeholder="Nhập tiêu đề thông báo"
            />
            <Label>File đính kèm</Label>
            <Input
              label="Đính kèm ảnh"
              @change="onInputChanged"
              type="file"
              accept="application/pdf"
              placeholder="Chọn file đính kèm"
            />
            <a
            v-if="data.file"
              :href="data.file"
              target="_blank"
              class="flex text-truncate items-center gap-2"
            >
              <SquareArrowOutUpRight />
              Click để xem file đính kèm
            </a>
          </div>
        </div>
      </div>
      <DialogFooter class="p-6 pt-0">
        <Button :loading="loading" @click="onSave"> {{ props.data?.id ? 'Cập nhật' : 'Lưu Thông Báo' }} </Button>
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
  DialogTrigger,
} from "@/components/ui/dialog";
import type { IAnnouncement } from "@/model/announcement";
import { BellPlus, SquareArrowOutUpRight } from "lucide-vue-next";
import { toast } from "vue-sonner";


const emit = defineEmits(["update"]);
const props = defineProps<{
  data?: IAnnouncement | null;
}>();
const open = defineModel({ default: false });
const { $AnnouncementService } = useServices();
const loading = ref<boolean>(false);
const data = ref<IAnnouncement>({
  title: "",
  file: null,
});

watch(
  () => props.data,
  (value) => {
    if (value) {
      data.value = JSON.parse(JSON.stringify(value));
      file.value = null;
    }
  },
  { immediate: true, deep: true }
);

watch(
  () => open.value,
  (value) => {
    if (!value) {
      data.value = {
        title: "",
        file: null,
      };
      file.value = null;
    }else{
      if(props.data){
        data.value = JSON.parse(JSON.stringify(props.data));
      }
    }
  }
);  

const file = ref<File | null>(null);

function onInputChanged(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    file.value = target.files[0];
  }
}

async function onSave() {
  loading.value = true;
  if (props.data) {
    if (!data.value.file) {
      toast.error("Vui lòng chọn file đính kèm");
      loading.value = false;
      return;
    }
    // nếu có file mới thì tải lên server
    if(file.value){
      const _data = await $AnnouncementService.uploadImage(file.value as File);
      data.value.file = (_data as any).url;
    }
    // cập nhật thông báo
    await $AnnouncementService.updateAnnouncement({
      id: props.data.id,
      title: data.value.title,
      file: data.value.file,
    });
    // emit sự kiện cập nhật thông báo
    emit("update", data.value);
    // thông báo thành công
    toast.success("Thông báo đã được cập nhật thành công.");
  } else {
    if (!file.value) {
      toast.error("Vui lòng chọn file đính kèm");
      loading.value = false;
      return;
    }
    // tải ảnh lên server
    const _data = await $AnnouncementService.uploadImage(file.value as File);
    // tạo thông báo
     await $AnnouncementService.addAnnouncement({
      title: data.value.title,
      file: (_data as any).url,
    });
    toast.success("Thông báo đã được lưu thành công.");
  }
  // reset dữ liệu
  loading.value = false;
  open.value = false;
}
</script>

<style></style>
