<script setup lang="ts">
import type { DateRange } from "radix-vue";
import type { Ref } from "vue";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RangeCalendar } from "@/components/ui/range-calendar";
import { cn } from "@/lib/utils";
import {
  CalendarDate,
  getLocalTimeZone,
} from "@internationalized/date";
import { Calendar as CalendarIcon } from "lucide-vue-next";

import { getDate, getMonth, getYear, format } from "date-fns";


interface IProps {
  default: string[];
}

const emit = defineEmits(["update"]);
const props = defineProps<IProps>();



const value = ref({
  start: new CalendarDate(
    getYear(props.default[0]),
    getMonth(props.default[0]) + 1,
    getDate(props.default[0])
  ),
  end: new CalendarDate(
    getYear(props.default[1]),
    getMonth(props.default[1]) + 1,
    getDate(props.default[1])
  ),
}) as Ref<DateRange>;

const items = [
  { value: 0, label: "Hôm nay" },
  { value: -7, label: "Tuần này" },
  { value: -30, label: "Tháng này" },
  { value: -120, label: "4 tháng trước" },
  { value: -180, label: "6 tháng trước" },
  { value: -365, label: "Từ đầu năm" },
  { value: 999, label: "Toàn bộ thời gian" },
];

watch(
  () => value.value,
  () => {
    if (value.value.start != undefined && value.value.end != undefined) {
      const objectEmit = {
        start: format(
          new Date(
            value.value.start?.year,
            value.value.start?.month,
            value.value.start?.day
          ),
          "yyyy-MM-dd"
        ),
        end: format(
          new Date(
            value.value.end?.year,
            value.value.end?.month,
            value.value.end?.day
          ),
          "yyyy-MM-dd"
        ),
      };
      emit("update", objectEmit);
    }
  },
  { deep: true }
);

function setDay(day: number) {
  let date1 = new Date(); // từ
  let date2 = new Date(); // đến
  if (day == -30) {
    date1 = new Date(date1.getFullYear(), date1.getMonth(), 1);
    date2 = new Date(); // set date2 to the current date
  } else if (day == -7) {
    date1.setDate(date1.getDate() - 7);
    date2 = new Date(); // set date2 to the current date
  } else if (day == -120) {
    date1.setDate(date1.getDate() - 120);
    date2 = new Date(); // set date2 to the current date
  } else if (day == -180) {
    date1.setDate(date1.getDate() - 180);
    date2 = new Date(); // set date2 to the current date
  } else if (day == -365) {
    date1.setFullYear(date2.getFullYear() ,0, 1);
    date2 = new Date(); // set date2 to the current date
  } else if (day == 999) {
   date1.setFullYear(2023 ,0, 1);
    date2 = new Date(); // set date2 to the current date
  }
  value.value.start = new CalendarDate(
    date1.getFullYear(),
    date1.getMonth() + 1,
    date1.getDate()
  );
  value.value.end = new CalendarDate(
    date2.getFullYear(),
    date2.getMonth() + 1,
    date2.getDate()
  );
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            ' w-[220px] justify-start text-start shadow-none font-normal',
            !value && 'text-muted-foreground'
          )
        "
      >
        <CalendarIcon class=" h-4 w-4" />
        <template v-if="value.start">
          <template v-if="value.end">
            {{ format(value.start.toDate(getLocalTimeZone()), "dd/MM/yyyy") }}
            - {{ format(value.end.toDate(getLocalTimeZone()), "dd/MM/yyyy") }}
          </template>

          <template v-else>
            {{ format(value.start.toDate(getLocalTimeZone()), "dd/MM/yyyy") }}
          </template>
        </template>
        <template v-else> Chọn ngày </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <div class="flex gap-3 py-2 items-center ps-3">
        <div class="flex gap-2 flex-col">
          <div
            v-for="item in items"
            @click="setDay(item.value)"
            class="text-start rounded-lg bg-slate-50/2 font-medium text-slate-500 hover:text-black hover:shadow hover:border-black transition-all hover:bg-slate-100 border p-2 text-xs"
            role="button"
          >
            {{ item.label }}
          </div>
        </div>
        <RangeCalendar
          v-model="value"
          locale="vi"
          initial-focus
          :number-of-months="2"
          @update:start-value="(startDate) => (value.start = startDate)"
        />
      </div>
    </PopoverContent>
  </Popover>
</template>
