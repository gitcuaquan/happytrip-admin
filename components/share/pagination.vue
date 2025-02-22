<script setup lang="ts">

defineProps({
  total: Number,
  siblingCount: {
    type: Number,
    default: 1,
  },
  showEdges: {
    type: Boolean,
    default: true,
  },
  defaultPage: {
    type: Number,
    default: 1,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
  },
});

const pageEmit = defineModel()

</script>

<template>
  <Pagination v-slot="{ page }" :total="total" :itemsPerPage="itemsPerPage" :sibling-count="1" :show-edges="showEdges" :default-page="defaultPage">
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst  @click="pageEmit = 1" class="w-8 h-8" />
      <PaginationPrev  @click="pageEmit = page - 1" class="w-8 h-8"/>

      <template v-for="(item, index) in items">
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <Button class="w-8 h-8 p-0" @click="pageEmit = item.value" :variant="item.value === page ? 'default' : 'outline'">
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext @click="pageEmit = page + 1" class="w-8 h-8" />
      <PaginationLast @click="pageEmit = total" class="w-8 h-8" />
    </PaginationList>
  </Pagination>
</template>