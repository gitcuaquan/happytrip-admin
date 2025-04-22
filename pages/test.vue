<template>
  <div class="relative p-6">
    <h3 class="mb-4 text-xl font-semibold">Mặt nạ biểu diễn tiền tệ</h3>
    
    <div class="space-y-4">
      <ShareInputVnd v-model="a" />
      {{ a }}
      <div>
        <abel class="block mb-2">Tiền VND (đơn vị: nghìn đồng):</abel>
        <Input 
          v-maska="vndMask" 
          v-model="vndValue" 
          class="border rounded p-2 w-full" 
          placeholder="Nhập số tiền (VNĐ)"
          @input="cleanLeadingComma"
        />
        <p class="mt-1 text-sm text-gray-600">Giá trị hiển thị: {{ vndValue }}</p>
        <p class="text-sm text-gray-600">Giá trị thực: {{ unmaskedVnd }}</p>
      </div>
      
      <div>
        <label class="block mb-2">Tiền USD (có 2 số thập phân):</label>
        <input 
          v-maska="usdMask" 
          v-model="usdValue" 
          class="border rounded p-2 w-full" 
          placeholder="Nhập số tiền (USD)" 
          @input="cleanLeadingCommaUsd"
        />
        <p class="mt-1 text-sm text-gray-600">Giá trị hiển thị: {{ usdValue }}</p>
        <p class="text-sm text-gray-600">Giá trị thực: {{ unmaskedUsd }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'

const a = ref(11231231312)

const vndValue = ref('')
const usdValue = ref('')

// Mặt nạ tiền VND (không có phần thập phân)
const vndMask = {
  mask: '###,###,###,###',
  tokens: {
    '#': { pattern: /\d/ }
  },
  reversed: true,
  eager: true,
  // Xử lý trước khi áp dụng mặt nạ
  preProcess: (value: string) => {
    // Loại bỏ tất cả các dấu phẩy
    return value.replace(/^,+/, '').replace(/,/g, '')
  },
  // Xử lý sau khi áp dụng mặt nạ
  postProcess: (value: string) => {
    // Loại bỏ dấu phẩy ở đầu nếu có
    return value.replace(/^,+/, '')
  }
}

// Mặt nạ tiền USD (có 2 số thập phân)
const usdMask = {
  mask: '###,###,###,###.##',
  tokens: {
    '#': { pattern: /\d/ }
  },
  reversed: true,
  eager: true,
  preProcess: (value: string) => {
    return value.replace(/^,+/, '').replace(/,/g, '')
  },
  postProcess: (value: string) => {
    return value.replace(/^,+/, '')
  }
}

// Hàm xử lý loại bỏ dấu phẩy ở đầu cho VND
const cleanLeadingComma = () => {
  if (vndValue.value.startsWith(',')) {
    vndValue.value = vndValue.value.replace(/^,+/, '')
  }
}

// Hàm xử lý loại bỏ dấu phẩy ở đầu cho USD
const cleanLeadingCommaUsd = () => {
  if (usdValue.value.startsWith(',')) {
    usdValue.value = usdValue.value.replace(/^,+/, '')
  }
}

// Tính toán giá trị thực (không có dấu phân tách)
const unmaskedVnd = computed(() => vndValue.value.replace(/,/g, ''))
const unmaskedUsd = computed(() => usdValue.value.replace(/,/g, ''))

// Theo dõi sự thay đổi để đảm bảo không có dấu phẩy thừa
watch(vndValue, (newVal) => {
  if (newVal.startsWith(',')) {
    vndValue.value = newVal.replace(/^,+/, '')
  }
})

watch(usdValue, (newVal) => {
  if (newVal.startsWith(',')) {
    usdValue.value = newVal.replace(/^,+/, '')
  }
})
</script>

<style scoped></style>
