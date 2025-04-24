<template>
<Button @click="successToast('Tao is a test')">
  Click tao
</Button>
</template>
<script setup lang="ts">
import { useToast } from '@/composables/useToast';

const {successToast,errorsToast} = useToast();
</script>