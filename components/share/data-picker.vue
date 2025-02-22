<script setup lang="ts">
import type { DateRange } from 'radix-vue'
import type { Ref } from 'vue'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { cn } from '@/lib/utils'
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'

import { getDate, getMonth, getYear,format } from "date-fns"

const df = new DateFormatter('vi-VN', {
  dateStyle: 'medium'
})
interface IProps {
 default: string[]
}

const emit = defineEmits(["update"])
const props = defineProps<IProps>()

const value = ref({
  start:  new CalendarDate(getYear(props.default[0]), getMonth(props.default[0]) +1, getDate(props.default[0])),
  end: new CalendarDate(getYear(props.default[1]), getMonth(props.default[1]) + 1, getDate(props.default[1])),
}) as Ref<DateRange>


watch(() => value.value, () => {
  if ( value.value.start != undefined && value.value.end != undefined ) {
    const objectEmit = {
      start: format(new Date(value.value.start?.year, value.value.start?.month, value.value.start?.day), 'yyyy-MM-dd'),
      end: format(new Date(value.value.end?.year, value.value.end?.month, value.value.end?.day), 'yyyy-MM-dd')
    }
    emit('update', objectEmit)
  }
}, { deep: true })

</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          ' w-full justify-start text-left font-normal',
          !value && 'text-muted-foreground',
        )"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <template v-if="value.start">
          <template v-if="value.end">
            {{ df.format(value.start.toDate(getLocalTimeZone())) }} - {{ df.format(value.end.toDate(getLocalTimeZone())) }}
          </template>

          <template v-else>
            {{ df.format(value.start.toDate(getLocalTimeZone())) }}
          </template>
        </template>
        <template v-else>
          Pick a date
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <RangeCalendar v-model="value" initial-focus :number-of-months="2" @update:start-value="(startDate) => value.start = startDate" />
    </PopoverContent>
  </Popover>
</template>