<template>
  <Dialog :default-open="true" @update:open="emit('hidden')">
    <DialogContent
      class="w-[50vw] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]"
    >
      <DialogHeader class="p-6 pb-0">
        <DialogTitle> Thêm mới chuyến đi</DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4 grid-cols-12 overflow-y-auto px-6">
        <!-- nội dung text -->
        <div class="col-span-6">
          <div class="flex flex-col gap-2">
            <Label>Tên khách hàng</Label>
            <Input v-model="objOrder.customer!.full_name" placeholder="Nhập tên khách hàng" />
          </div>
        </div>
        <div class="col-span-6">
          <div class="flex flex-col gap-2">
            <Label>SĐT khách hàng</Label>
            <Input v-model="objOrder.customer!.phone" placeholder="Nhập số điện thoại khách hàng" />
          </div>
        </div>
        <hr class="col-span-12 border-t border-gray-200" />
        <div class="col-span-4">
          <div class="flex flex-col gap-2">
            <Label>Ngày đón</Label>
            <Input
            v-model="objOrder.date_of_destination"
              type="datetime-local"
              :min="new Date().toISOString().slice(0, 16)"
              placeholder="Nhập ngày đón"
            />
          </div>
        </div>
        <div class="col-span-4">
          <div class="flex flex-col gap-2">
            <Label>Dịch vụ</Label>
            <Select v-model="objOrder.id_service">
              <SelectTrigger>
                <SelectValue placeholder="Chọn dịch vụ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="service in state.happytripData?.data"
                  :value="service.id"
                  :key="service.id"
                >
                  {{ service.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div class="col-span-4">
          <div class="flex flex-col gap-2">
            <Label>SĐT tài xế</Label>
            <Input v-model="objOrder.partner!.phone" placeholder="Nhập số điện thoại tài xế" />
          </div>
        </div>
        <div class="col-span-4">
          <div class="flex flex-col gap-2">
            <Label>Thành Phố Đón</Label>
            <Select v-model="state.citySelected.from">
              <SelectTrigger>
                <SelectValue placeholder="Chọn thành phố đón" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="item in state.listCity"
                  :key="item.id"
                  :value="item.id"
                  >{{ item.name }}</SelectItem
                >
              </SelectContent>
            </Select>
          </div>
        </div>
        <div class="col-span-4">
          <Label>Quận huyện đón</Label>
          <Select :disabled="!state.citySelected.from">
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
        <div class="col-span-4">
          <Label>Chi tiết điểm đón</Label>
          <Input placeholder="Nhập chi tiết điểm đón" />
        </div>
        <div class="col-span-4">
          <div class="flex flex-col gap-2">
            <Label>Thành phố trả</Label>
            <Select v-model="state.citySelected.to">
              <SelectTrigger>
                <SelectValue placeholder="Chọn thành phố trả" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="item in state.listCity"
                  :key="item.id"
                  :value="item.id"
                  >{{ item.name }}</SelectItem
                >
              </SelectContent>
            </Select>
          </div>
        </div>
        <div class="col-span-4">
          <Label>Quận huyện trả</Label>
          <Select :disabled="!state.citySelected.to">
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
        <div class="col-span-4">
          <Label>Chi tiết điểm trả</Label>
          <Input placeholder="Nhập chi tiết điểm trả" />
        </div>
      <div class="col-span-12">
        {{ objOrder }}
      </div>
      </div>
      <DialogFooter class="p-6 pt-0">
        <Button> Tạo đơn </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { City, ResponeDistricts } from "@/model/address";
import type { FilterOnParams } from "@/model/common";
import type { IHappytripService } from "@/model/happytrip";
import type { RsData } from "@/model/interface";
import { Order } from "@/model/order";

const emit = defineEmits(["hidden"]);

const { $HappytripService, $AddressService } = useServices();

const objOrder = ref<Order>(new Order({
  customer:{},
  partner:{},
}));

const params = ref<FilterOnParams>({
  fields: "id,name,status",
  sort_by: "id_asc",
});
const state = reactive({
  loading: false,
  happytripData: {} as RsData<IHappytripService>,
  listCity: [] as City[],
  citySelected: {
    from: "",
    to: "",
  },
  detailCity: {
    from: {} as ResponeDistricts,
    to: {} as ResponeDistricts,
  },
});

onMounted(() => {
  $AddressService
    .listCity(params.value)
    .then((res) => {
      state.listCity = res;
    })
    .catch((error) => {
      console.error("Error fetching city list:", error);
    });
  $HappytripService.getList().then((res) => {
    state.happytripData = res;
  });
});
watchEffect(() => {
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
