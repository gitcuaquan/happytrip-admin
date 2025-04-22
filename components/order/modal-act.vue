<template>
  <Dialog :default-open="true" @update:open="emit('hidden')">
    <DialogContent
      class="w-[50vw] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]"
    >
      <DialogHeader class="p-6 pb-0">
        <DialogTitle> Thêm mới chuyến đi</DialogTitle>
      </DialogHeader>
      <form
        @submit.prevent="handleSubmit"
        id="act-form"
        class="grid gap-4 py-4 grid-cols-12 overflow-y-auto px-6"
      >
        <div class="col-span-7">
          <div class="grid gap-2 grid-cols-2">
            <div class="flex flex-col gap-2">
              <Label>Tên khách hàng</Label>
              <Input
                required
                v-model="orderCreater.full_name"
                placeholder="Nhập tên khách hàng"
              />
            </div>
            <div class="flex flex-col gap-2">
              <Label>SĐT khách hàng</Label>
              <Input
                pattern="^(0|\+84)\d{9,10}$"
                required
                v-model="orderCreater.phone"
                placeholder="Nhập số điện thoại khách hàng"
              />
            </div>
            <div class="flex flex-col gap-2">
              <Label>Ngày đón</Label>
              <Input
                v-model="orderCreater.date_of_destination"
                required
                type="datetime-local"
                :min="new Date().toISOString().slice(0, 16)"
                placeholder="Nhập ngày đón"
              />
            </div>
            <div class="flex flex-col gap-2">
              <Label>Dịch vụ</Label>
              <Select v-model="orderCreater.id_service" required>
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
            <div class="flex flex-col gap-2">
              <Label>Thành Phố đón</Label>
              <Select v-model="orderCreater.departure_city" required>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn thành phố đón" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="item in state.listCity"
                    :key="item.id"
                    :value="item.name"
                    >{{ item.name }}</SelectItem
                  >
                </SelectContent>
              </Select>
            </div>
            <div class="flex flex-col gap-2">
              <Label>Quận huyện đón</Label>
              <Select
                required
                :disabled="!orderCreater.departure_city"
                v-model="orderCreater.departure_dictrict"
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
            <div class="col-span-2">
              <Label>Chi tiết điểm đón</Label>
              <Input
                required
                v-model="orderCreater.departure_address_1"
                placeholder="Nhập chi tiết điểm đón"
              />
            </div>
            <div>
              <Label>Thành phố trả</Label>
              <Select v-model="orderCreater.destination_city" required>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn thành phố trả" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="item in state.listCity"
                    :key="item.id"
                    :value="item.name"
                    >{{ item.name }}</SelectItem
                  >
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Quận huyện trả</Label>
              <Select
                required
                v-model="orderCreater.destination_dictrict"
                :disabled="!orderCreater.destination_city"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn quận huyện trả" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="item in state.detailCity.to!.districts"
                    :key="item.name"
                    :value="item.name"
                    >{{ item.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="col-span-2">
              <Label>Chi tiết điểm trả</Label>
              <Input
                required
                v-model="orderCreater.destination_address_1"
                placeholder="Nhập chi tiết điểm trả"
              />
            </div>
          </div>
        </div>
        <div class="col-span-5 mt-5">
          <Card>
            <CardHeader class="p-3">
              <CardTitle class="text-lg font-semibold">
                Thông tin đơn hàng
              </CardTitle>
            </CardHeader>
            <CardContent class="px-3 flex flex-col gap-4">
              <div>
                <Label>Thu khách ( không phụ thu)</Label>
                <ShareInputVnd v-model="orderPriceInfo.price_guest" />
              </div>
              <table class="align-middle">
                <tbody>
                  <tr>
                    <td><Label>Tài xế nhận </Label></td>
                    <td>
                      {{ formatCurrency(orderPriceInfo.price) }}
                    </td>
                  </tr>
                  <tr>
                    <td><Label>Phí sàn</Label></td>
                    <td>
                      {{ formatCurrency(orderPriceInfo.price_system) }}
                    </td>
                  </tr>
                  <tr>
                    <td><Label>Hoa hồng</Label></td>
                    <td>
                      {{ formatCurrency(orderPriceInfo.net_profit) }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Label>Thu khách</Label> <br />
                      <small> (bao gồm phụ thu)</small>
                    </td>
                    <td>
                      {{ formatCurrency(orderPriceInfo.price_guest_after) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </form>
      <DialogFooter class="p-6 pt-0">
        <Button :loading="loading" type="submit" form="act-form">
          Tạo đơn
        </Button>
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
import { Order, OrderPreview, type IOrderCreate } from "@/model/order";
import { toast } from "vue-sonner";
const emit = defineEmits(["hidden"]);

const { $HappytripService, $AddressService, $OrderService } = useServices();

const timeOut = ref();
const loading = ref(false);

const orderCreater = ref<IOrderCreate>({
  full_name: "Tạ Quân",
  phone: "0982135950",
  date_of_destination: "2025-04-23T20:39",
  id_service: "66947d0917482239472b9807",
  departure_city: "Bà Rịa - Vũng Tàu",
  departure_dictrict: "TP. Bà Rịa",
  destination_city: "Hồ Chí Minh",
  destination_dictrict: "Quận 3",
  quantity: 1,
  departure_address_1: "Đường số 1",
  destination_address_1: "Đường số 2",
});

// Tạo một ref riêng để lưu thông tin giá từ API
const orderPriceInfo = ref<IOrderCreate>({
  price: 0,
  price_guest: "0",
  net_profit: 0,
  price_system: 0,
  price_guest_after: 0,
});

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
    orderCreater.value.id_service = res.data[0].id;
  });
});

watch(
  () => orderCreater.value,
  async () => {
    previewOrder();
  },
  { deep: true, immediate: true }
);

watchEffect(() => {
  if (orderCreater.value.departure_city) {
    $AddressService
      .getDetailCity(orderCreater.value.departure_city)
      .then((res) => {
        state.detailCity.from = res;
      })
      .catch((error) => {
        console.error("Error fetching city detail:", error);
      });
  }
});
watchEffect(() => {
  if (orderCreater.value.destination_city) {
    $AddressService
      .getDetailCity(orderCreater.value.destination_city)
      .then((res) => {
        state.detailCity.to = res;
      })
      .catch((error) => {
        console.error("Error fetching city detail:", error);
      });
  }
});

async function handleSubmit() {
  try {
    // Submit the form data
    await $OrderService.Create(orderCreater.value);
    toast.success("Tạo đơn thành công",{
      description: "Đơn hàng đã được tạo thành công.",
    });
  } catch (error: any) {
    toast.error("Tạo đơn thất bại", {
      description: error.data || "Đã xảy ra lỗi không xác định.",
    });
  } finally {
    loading.value = false;
  }
}

function previewOrder() {
  clearTimeout(timeOut.value);
  timeOut.value = setTimeout(async () => {
    // check xem có đủ để preview không
    if (
      !orderCreater.value.departure_city ||
      !orderCreater.value.destination_city ||
      !orderCreater.value.date_of_destination ||
      !orderCreater.value.id_service ||
      !orderCreater.value.departure_dictrict ||
      !orderCreater.value.destination_dictrict
    ) {
      return;
    }

    try {
      loading.value = true;
      const newOrder = await $OrderService.Preview(orderCreater.value);
      // Lưu giá trị vào orderPriceInfo thay vì gán trực tiếp vào orderCreater.value
      orderPriceInfo.value = {
        price: newOrder.price,
        price_guest: newOrder.price_guest,
        net_profit: newOrder.net_profit,
        price_system: newOrder.price_system,
        price_guest_after: newOrder.price_guest_after,
      };
    } catch (error) {
      console.error("Error during order preview:", error);
    } finally {
      loading.value = false;
    }
  }, 1000);
}

// function formatCurrency
function formatCurrency(value?: number | string) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(Number(value || 0));
}
</script>

<style></style>
