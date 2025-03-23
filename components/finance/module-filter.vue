<template>
  <Card class="p-3 grid grid-cols-12 items-center gap-4">
    <div class="col-span-2">
      <!-- Input tìm kiếm -->
      <div class="relative w-full max-w-sm items-center">
        <Input
          id="search"
          v-model="keyword"
          type="text"
          placeholder="Tìm kiếm ..."
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
      <div class="flex gap-4 items-center w-full">
        <ShareDataPicker
          @update="handleUpdate"
          :default="[
            props.filter?.from_create_at ?? '',
            props.filter?.to_create_at ?? '',
          ]"
        />
      </div>
    </div>
    <div class="col-span-6">
      <div class="flex">
        <slot></slot>
      </div>
    </div>
  </Card>
  <!-- {{ filter }} -->
</template>

<script lang="ts" setup>
import { WithdrawFilter } from "@/model/withdraw";
import { Search } from "lucide-vue-next";



interface IProps {
  filter?: WithdrawFilter;
}

const props = withDefaults(defineProps<IProps>(), {
  filter: () => new WithdrawFilter(),
});

const keyword = useDebouncedRef("", 500);

const handleUpdate = (dates: { start: string; end: string }) => {
  props.filter.from_create_at = dates.start;
  props.filter.to_create_at = dates.end;
};
watch(() => keyword.value, () => {
  props.filter.keyword = keyword.value;
});

onMounted(() => {});
</script>

<style></style>
