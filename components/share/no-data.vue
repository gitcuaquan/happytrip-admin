<template>
  <div class="h-screen w-full flex items-center absolute flex-col justify-center">
    <DatabaseZap :size="28" />
    <p class="text-gray-500">Không có dữ liệu</p>
  </div>
</template>
<script setup lang="ts">
import { DatabaseZap } from "lucide-vue-next";
</script>
