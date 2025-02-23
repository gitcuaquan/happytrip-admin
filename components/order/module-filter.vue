<template>
  <Card class="p-3 grid grid-cols-12 items-center gap-4">
    <div class="col-span-2">
      <!-- Input tìm kiếm -->
      <div class="relative w-full max-w-sm items-center">
        <Input
          id="search"
          v-model="keyword"
          type="text"
          placeholder="Tìm kiếm theo số điện thoại,id..."
          class="pl-10"
        />
        <span
          class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
        >
          <Search />
        </span>
      </div>
    </div>
    <div class="col-span-3">
      <div class="flex flex-nowrap gap-4">
        <Select v-model="state.citySelected.from">
          <SelectTrigger>
            <SelectValue placeholder="Chọn thành phố đón" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="item in listCity"
              :key="item.id"
              :value="item.id"
              >{{ item.name }}</SelectItem
            >
          </SelectContent>
        </Select>
        <Select
          :disabled="!state.citySelected.from"
          v-model="props.filter.district_depature"
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn quận huyện đón" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="item in state.detailCity.from?.districts"
              :key="item.name"
              :value="item.name"
              >{{ item.name }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    <div class="col-span-3">
      <div class="flex flex-nowrap gap-4">
        <Select v-model="state.citySelected.to">
          <SelectTrigger>
            <SelectValue placeholder="Chọn thành phố trả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="item in listCity" :key="item.id" :value="item.id"
              >{{ item.name }}
            </SelectItem>
          </SelectContent>
        </Select>
        <Select
          :disabled="!state.citySelected.to"
          v-model="props.filter.district_destination"
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn quận huyện trả" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="item in state.detailCity.to?.districts"
              :key="item.name"
              :value="item.name"
              >{{ item.name }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    <div class="col-span-4">
      <div class="flex gap-4 items-center">
        <ShareDataPicker
          @update="handleUpdate"
          :default="[
            props.filter?.from_date_of_destination ?? '',
            props.filter?.to_date_of_destination ?? '',
          ]"
        />
        <slot></slot>
      </div>
    </div>
  </Card>
  <!-- {{ filter }} -->
</template>

<script lang="ts" setup>
import { Search } from "lucide-vue-next";
import type { FilterOnParams } from "~/model/common";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { City, ResponeDistricts } from "~/model/address";
import { OrderFilter } from "@/model/order";

const { $AddressService } = useServices();

interface IProps {
  filter?: OrderFilter;
}

const props = withDefaults(defineProps<IProps>(), {
  filter: () => new OrderFilter(),
});

const keyword = useDebouncedRef("", 500);

const params = ref<FilterOnParams>({
  fields: "id,name,status",
  sort_by: "id_asc",
});
const listCity = ref<City[]>([]);
const state = reactive({
  citySelected: {
    from: "",
    to: "",
  },
  detailCity: {
    from: {} as ResponeDistricts,
    to: {} as ResponeDistricts,
  },
});

const handleUpdate = (dates: { start: string; end: string }) => {
  props.filter.from_date_of_destination = dates.start;
  props.filter.to_date_of_destination = dates.end;
};

onMounted(() => {
  $AddressService
    .listCity(params.value)
    .then((res) => {
      listCity.value = res;
    })
    .catch((error) => {
      console.error("Error fetching city list:", error);
    });
});

watch(
  () => state.citySelected.from,
  () => {
    props.filter.city_diemdon = listCity.value.find(
      (item) => item.id == state.citySelected.from
    )?.name;
    props.filter.district_depature = "";
  }
);

watch(
  () => state.citySelected.to,
  () => {
    props.filter.city_diemden = listCity.value.find(
      (item) => item.id == state.citySelected.to
    )?.name;
    props.filter.district_destination = "";
  }
);

watchEffect(() => {
  // gán keyword vào filter
  props.filter.keyword = keyword.value;
  if (state.citySelected.from) {
    $AddressService
      .getDetailCity(state.citySelected.from)
      .then((res) => {
        state.detailCity.from = res;
      })
      .catch((error) => {
        console.error("Error fetching city detail:", error);
      });
  }
  if (state.citySelected.to) {
    $AddressService
      .getDetailCity(state.citySelected.to)
      .then((res) => {
        state.detailCity.to = res;
      })
      .catch((error) => {
        console.error("Error fetching city detail:", error);
      });
  }
});
</script>

<style></style>
