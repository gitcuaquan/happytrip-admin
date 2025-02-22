<template>
  <div class="grid auto-rows-auto gap-4 grid-cols-4">
    <div class="col-span-2">
      <canvas ref="myCanvas"></canvas>
    </div>
    <div class="col-span-2 p-4">
      <canvas ref="priceCanvas"></canvas>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IOrderOverviewItem } from "@/model/order";
import Chart from "chart.js/auto";
definePageMeta({
  middleware: "auth",
});
useHead({
  title: "Trang tổng quan",
  meta: [
    {
      name: "description",
      content: "Trang tổng quan của hệ thống",
    },
  ],
});

const { $OrderService } = useServices();

const orderOverview = ref<IOrderOverviewItem[]>();
const myCanvas = ref<HTMLCanvasElement>();
const priceCanvas = ref<HTMLCanvasElement>();

onMounted(() => {
  getOverview();
});

function getOverview() {
  $OrderService
    .OverviewOrder({
      from_date_of_destination: "2025-02-01T14:55:40.842Z",
      to_date_of_destination: "2025-02-15T14:55:40.842Z",
    })
    .then((res) => {
      console.log(res);
      orderOverview.value = res;
      initChart();
      initPriceChart();
    });
}

function initChart() {
  new Chart(myCanvas.value!, {
    type: "bar",
    data: {
      labels: orderOverview.value!.map((row) => row.date),
      datasets: [
        {
          label: "Số đơn hàng",
          data: orderOverview.value!.map((row) => row.total_order),
          borderRadius: 4,
        },
      ],
    },
  });
}

function initPriceChart() {
  new Chart(priceCanvas.value!, {
    type: "line",
    data: {
      labels: orderOverview.value!.map((row) => row.date),
      datasets: [
        {
          label: "Tổng tiền",
          data: orderOverview.value!.map((row) => row.total_price),
          tension: 0.5,
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 2,
          pointBackgroundColor: "rgb(75, 192, 192)",
          
        },
      ],
    },
  });
}
</script>

<style></style>
