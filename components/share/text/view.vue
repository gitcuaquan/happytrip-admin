<template>
  <div class="ql-snow">
    <div class="ql-editor">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@vueup/vue-quill/dist/vue-quill.snow.css";
</script>