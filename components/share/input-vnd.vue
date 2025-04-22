<template>
  <Input
    v-maska="vndMask"
    v-model="vndValue"
    :readonly="props.readonly"
    type="tel"
    class="border rounded p-2 w-full"
    :placeholder="props.placeholder"
    @input="cleanLeadingComma"
  />
</template>

<script lang="ts" setup>
// Define props for v-model support
const props = defineProps<{
  modelValue?: number | string;
  readonly?: boolean;
  placeholder?: string;
}>();

// Define emits for v-model support
const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

// Format modelValue to comma-separated string display value
const formatValue = (value: number | string | undefined): string => {
  if (value === undefined || value === null || value === "") return "";
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Internal value with formatting
const vndValue = ref(formatValue(props.modelValue));

// Tính toán giá trị thực (không có dấu phân tách)
const unmaskedVnd = computed(() => {
  const numericValue = vndValue.value.replace(/,/g, "");
  return numericValue === "" ? 0 : parseInt(numericValue, 10);
});

// Emit value changes to parent
watch(unmaskedVnd, (newValue) => {
  emit("update:modelValue", newValue);
});

// Watch for external value changes
watch(
  () => props.modelValue,
  (newValue) => {
    // Only update if different to avoid cursor position issues
    const formattedNewValue = formatValue(newValue);
    if (vndValue.value !== formattedNewValue) {
      vndValue.value = formattedNewValue;
    }
  },
  { immediate: true }
);

// Mặt nạ tiền VND (không có phần thập phân)
const vndMask = {
  mask: "###,###,###,###",
  tokens: {
    "#": { pattern: /\d/ },
  },
  reversed: true,
  eager: true,
  // Xử lý trước khi áp dụng mặt nạ
  preProcess: (value: string) => {
    // Loại bỏ tất cả các dấu phẩy
    return value.replace(/^,+/, "").replace(/,/g, "");
  },
  // Xử lý sau khi áp dụng mặt nạ
  postProcess: (value: string) => {
    // Loại bỏ dấu phẩy ở đầu nếu có
    return value.replace(/^,+/, "");
  },
};

// Theo dõi sự thay đổi để đảm bảo không có dấu phẩy thừa
watch(vndValue, (newVal) => {
  if (newVal.startsWith(",")) {
    vndValue.value = newVal.replace(/^,+/, "");
  }
});

// Hàm xử lý loại bỏ dấu phẩy ở đầu cho VND
const cleanLeadingComma = () => {
  if (vndValue.value.startsWith(",")) {
    vndValue.value = vndValue.value.replace(/^,+/, "");
  }
};
</script>

<style></style>
