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

    <div class="col-span-4">
      <div class="flex gap-4 items-center">
        <ShareDataPicker
          @update="handleUpdate"
          :default="[
            props.filter?.from_date ?? '',
            props.filter?.to_date ?? '',
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
import { Search } from "lucide-vue-next";
import { TransactionFilter } from "@/model/transaction";


interface IProps {
  filter?: TransactionFilter;
}

const props = withDefaults(defineProps<IProps>(), {
  filter: () => new TransactionFilter(),
});

const keyword = useDebouncedRef("", 500);

const handleUpdate = (dates: { start: string; end: string }) => {
  props.filter.from_date = dates.start;
  props.filter.to_date = dates.end;
};
watch(() => keyword.value, () => {
  props.filter.keyword = keyword.value;
});

onMounted(() => {});
</script>

<style></style>
