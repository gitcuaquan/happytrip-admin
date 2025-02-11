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
      <PaginationFirst class="w-8 h-8" />
      <PaginationPrev class="w-8 h-8"/>

      <template v-for="(item, index) in items">
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <Button class="w-8 h-8 p-0" @click="pageEmit = item.value" :variant="item.value === page ? 'default' : 'outline'">
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext class="w-8 h-8" />
      <PaginationLast class="w-8 h-8" />
    </PaginationList>
  </Pagination>
</template>