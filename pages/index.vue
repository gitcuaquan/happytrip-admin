<template>
  <div>
    <Button>Click me</Button>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({
    middleware: 'auth'
  })
</script>

<style>

</style>