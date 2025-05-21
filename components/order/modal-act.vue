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
              <!-- {{ orderCreater.date_of_destination }} -->
              <Input
                v-model="orderCreater.date_of_destination"
                required
                @update:model-value="previewOrder()"
                type="datetime-local"
                :min="new Date().toISOString().slice(0, 16)"
                placeholder="Nhập ngày đón"
              />
            </div>
            <div class="flex flex-col gap-2">
              <Label>Dịch vụ</Label>
              <Select
                @update:model-value="previewOrder()"
                v-model="orderCreater.id_service"
                required
              >
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

              <Select
                @update:model-value="previewOrder()"
                v-model="orderCreater.departure_city"
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn thành phố đón" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="item in state.listCity"
                    :key="item.id"
                    :value="item.name.trim()"
                    >{{ item.name }}</SelectItem
                  >
                </SelectContent>
              </Select>
            </div>
            <div class="flex flex-col gap-2">
              <Label>Quận huyện đón</Label>
              <Select
                @update:model-value="previewOrder()"
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
              <Select
                @update:model-value="previewOrder()"
                v-model="orderCreater.destination_city"
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn thành phố trả" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="item in state.listCity"
                    :key="item.id"
                    :value="item.name.trim()"
                    >{{ item.name }}</SelectItem
                  >
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Quận huyện trả</Label>
              <Select
                required
                @update:model-value="previewOrder()"
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
            <div class="col-span-2">
              <Label>Ghi chú</Label>
              <Input v-model="orderCreater.note" placeholder="Nhập ghi chú" />
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
                <Label>Giá đề xuất của hệ thống</Label>
                <ShareInputVnd
                  :model-value="orderPriceInfo.price_guest"
                  @update:model-value="changePrice"
                />
              </div>
              <div class="flex gap-2 items-center">
                <hr class="w-full" />
                <small class="text-nowrap"
                  >Chi phí cho <b>{{ orderPriceInfo.distance }}</b> km</small
                >
                <hr class="w-full" />
              </div>
              <table class="align-middle">
                <tbody>
                  <tr>
                    <td class="w-[150px]">Tài xế nhận</td>
                    <td>
                      {{ formatCurrency(orderPriceInfo.price) }}
                    </td>
                  </tr>
                  <tr>
                    <td>Phí sàn</td>
                    <td>
                      {{ formatCurrency(orderPriceInfo.price_system) }}
                    </td>
                  </tr>
                  <tr>
                    <td>Hoa hồng</td>
                    <td>
                      {{ formatCurrency(orderPriceInfo.net_profit) }}
                    </td>
                  </tr>
                  <tr>
                    <td>Phụ thu</td>
                    <td>
                      {{
                        formatCurrency(orderPriceInfo.sub_fees?.sub_fee_price)
                      }}
                    </td>
                  </tr>
                  <tr class="border-t border-t-primary">
                    <td>
                      <Label>Tổng Khách</Label>
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
      <DialogFooter v-if="orderType != 'view'" class="p-6 pt-0">
        <Button :loading="loading" type="submit" form="act-form">
          {{ orderSelected.id ? "Cập nhật đơn" : "Tạo đơn mới" }}
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
import { Order } from "@/model/order";
import { type IOrderCreate } from "@/model/order";

const emit = defineEmits(["hidden", "create"]);

const { $HappytripService, $AddressService, $OrderService } = useServices();
const { successToast, errorsToast } = useToast();
const { getOrder, getActionType, resetAll } = useOrder();

const orderSelected = computed(() => {
  return getOrder();
});

const orderType = computed(() => {
  return getActionType();
});

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
  distance: 0,
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
  detailCity: {
    from: {} as ResponeDistricts,
    to: {} as ResponeDistricts,
  },
});

onMounted(async () => {
  await Promise.all([getAddress(), getService()]);
  if (orderSelected.value.id) {
    tranformOrder();
  }
});

function tranformOrder() {
  orderCreater.value.date_of_destination = new Date(
    orderSelected.value.date_of_destination as string
  )
    .toISOString()
    .slice(0, 16);
  orderCreater.value.id = orderSelected.value.id;
  orderCreater.value.full_name = orderSelected.value.customer?.full_name;
  orderCreater.value.phone = orderSelected.value.customer?.phone;
  orderCreater.value.departure_city =
    orderSelected.value.departure?.city?.trim();
  orderCreater.value.departure_dictrict =
    orderSelected.value.departure?.district?.trim();
  orderCreater.value.destination_city =
    orderSelected.value.destination?.city?.trim();
  orderCreater.value.destination_dictrict =
    orderSelected.value.destination?.district?.trim();
  orderCreater.value.departure_address_1 =
    orderSelected.value.departure?.address_1?.trim();
  orderCreater.value.destination_address_1 =
    orderSelected.value.destination?.address_1?.trim();
  orderCreater.value.note = orderSelected.value.note?.trim();
  orderCreater.value.id_service = orderSelected.value.id_service;

  orderPriceInfo.value.price = orderSelected.value.price;
  orderPriceInfo.value.price_guest = orderSelected.value.price_guest as string;
  orderPriceInfo.value.net_profit = orderSelected.value.net_profit;
  orderPriceInfo.value.price_system = orderSelected.value.price_system;
  orderPriceInfo.value.price_guest_after =
    orderSelected.value.price_guest_after;
  orderPriceInfo.value.distance = orderSelected.value.distance;
  orderPriceInfo.value.sub_fees = orderSelected.value.sub_fees;
  orderCreater.value.quantity = orderSelected.value.quantity;
}

function revertOrder() {
  const orderData: Order = new Order();

  // Basic order information
  orderData.id = orderCreater.value.id;
  orderData.note = orderCreater.value.note;
  orderData.id_service = orderCreater.value.id_service;
  orderData.name_service = state.happytripData?.data?.find(
    (service) => service.id === orderCreater.value.id_service
  )?.name;
  orderData.date_of_destination = orderCreater.value.date_of_destination;
  orderData.quantity = orderCreater.value.quantity;

  // Price information
  orderData.price = orderPriceInfo.value.price;
  orderData.price_guest = orderPriceInfo.value.price_guest;
  orderData.net_profit = orderPriceInfo.value.net_profit;
  orderData.price_system = orderPriceInfo.value.price_system;
  orderData.price_guest_after = orderPriceInfo.value.price_guest_after;
  orderData.price_after = orderPriceInfo.value.price_after;
  orderData.distance = orderPriceInfo.value.distance;
  orderData.sub_fees = orderPriceInfo.value.sub_fees;

  // Address information
  orderData.departure = {
    city: orderCreater.value.departure_city,
    district: orderCreater.value.departure_dictrict,
    address_1: orderCreater.value.departure_address_1,
  };

  orderData.destination = {
    city: orderCreater.value.destination_city,
    district: orderCreater.value.destination_dictrict,
    address_1: orderCreater.value.destination_address_1,
  };

  // Customer information
  orderData.customer = {
    full_name: orderCreater.value.full_name,
    phone: orderCreater.value.phone,
  };

  // Preserve original data if it exists
  if (orderSelected.value.id) {
    orderData.short_id = orderSelected.value.short_id;
    orderData.created = orderSelected.value.created;
    orderData.status_type = orderSelected.value.status_type;
    orderData.status_name = orderSelected.value.status_name;
    orderData.total_transaction = orderSelected.value.total_transaction;
    orderData.creator = orderSelected.value.creator;
    orderData.partner = orderSelected.value.partner;
  }

  return orderData;
}

function changePrice(e: any) {
  orderCreater.value.price_guest = e;
  previewOrder();
}

async function getAddress() {
  try {
    state.loading = true;
    const res = await $AddressService.listCity(params.value);
    state.listCity = res;
  } catch (error) {
    console.error("Error fetching address list:", error);
  } finally {
    state.loading = false;
  }
}

async function getService() {
  try {
    state.loading = true;
    const res = await $HappytripService.getList();
    state.happytripData = res;
    orderCreater.value.id_service = res.data[0].id;
  } catch (error) {
    console.error("Error fetching service list:", error);
  } finally {
    state.loading = false;
  }
}

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
    loading.value = true;
    // Convert form data to Order format using the revertOrder function
    const orderData = revertOrder();
    // Submit the form data
    if (!orderSelected.value.id) {
      // map orderPriceInfo.value vào orderCreater
      orderCreater.value.price_guest = orderPriceInfo.value.price_guest;
      orderCreater.value.price = orderPriceInfo.value.price;
      orderCreater.value.price_system = orderPriceInfo.value.price_system;
      orderCreater.value.price_after = orderPriceInfo.value.price_after;
      orderCreater.value.price_guest_after =
        orderPriceInfo.value.price_guest_after;
      orderCreater.value.distance = orderPriceInfo.value.distance;
      orderCreater.value.net_profit = orderPriceInfo.value.net_profit;

      await $OrderService.Create(orderCreater.value);
      successToast("Tạo đơn thành công");
    } else {
      await $OrderService.Update(orderData);
      successToast("Cập nhật đơn thành công");
    }
    // đóng modal
    emit("create");
  } catch (error: any) {
    errorsToast("Tạo đơn thất bại");
  } finally {
    loading.value = false;
  }
}

function previewOrder() {
  if (orderType.value == "view") return;
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
        distance: newOrder.distance,
        sub_fees: newOrder.sub_fees,
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
