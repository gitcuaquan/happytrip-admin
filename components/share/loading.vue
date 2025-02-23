<template>
  <div
    class="w-full justify-center h-screen bg-slate-400/20 flex-col backdrop-blur-[4px] flex items-center absolute z-50">
    <Loader2 class="animate-spin "/>
    <div class="text-lg font-semibold">
      Đang tải dữ liệu...
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Loader2 } from "lucide-vue-next";  
</script>
