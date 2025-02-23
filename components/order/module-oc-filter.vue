<template>
  <Card class="p-3 grid grid-cols-12 items-center gap-4">
    <div class="col-span-2">
      <!-- Input tìm kiếm -->
      <div class="relative w-full max-w-sm items-center">
        <Input
          id="search"
          v-model="keyword"
          type="text"
          placeholder="Tìm kiếm theo số điện thoại,id..."
          class="pl-10"
        />
        <span
          class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
        >
          <Search />
        </span>
      </div>
    </div>
    <div class="col-span-2">
      <Select v-model="props.filter.order_cancel_type">
        <SelectTrigger>
          <SelectValue placeholder="Chọn đối tượng hủy" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="null">Tất cả</SelectItem>
          <SelectItem
            v-for="value in listCancelTypes"
            :key="value"
            :value="value"
            >{{ value }}</SelectItem
          >
        </SelectContent>
      </Select>
    </div>
    <div class="col-span-4">
      <div class="flex gap-4 items-center">
        <ShareDataPicker
          @update="handleUpdate"
          :default="[
            props.filter?.from_created_at ?? '',
            props.filter?.to_created_at ?? '',
          ]"
        />
        <slot></slot>
      </div>
    </div>
  </Card>
  <!-- {{ filter }} -->
</template>

<script lang="ts" setup>
import { Search } from "lucide-vue-next";
import type { FilterOnParams } from "~/model/common";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { City, ResponeDistricts } from "~/model/address";
import { OrderFilter } from "@/model/order";

const { $AddressService } = useServices();

interface IProps {
  filter?: OrderFilter;
}

const props = withDefaults(defineProps<IProps>(), {
  filter: () => new OrderFilter(),
});

const keyword = useDebouncedRef("", 500);

const params = ref<FilterOnParams>({
  fields: "id,name,status",
  sort_by: "id_asc",
});

const listCancelTypes = ["Người tạo", "Khách hàng", "Tài xế"];

const handleUpdate = (dates: { start: string; end: string }) => {
  props.filter.from_created_at = dates.start;
  props.filter.to_created_at = dates.end;
};

watchEffect(() => {
  // gán keyword vào filter
  props.filter.keyword = keyword.value;
});
</script>

<style></style>
