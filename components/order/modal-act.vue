<template>
  <Dialog>
    <DialogTrigger>
      <Button size="sm">
        <FilePlus2 :size="30" />
        Tạo đơn
      </Button>
    </DialogTrigger>
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
            <Input placeholder="Nhập tên khách hàng" />
          </div>
        </div>
        <div class="col-span-6">
          <div class="flex flex-col gap-2">
            <Label>SĐT khách hàng</Label>
            <Input placeholder="Nhập số điện thoại khách hàng" />
          </div>
        </div>
        <div class="col-span-3">
          <div class="flex flex-col gap-2">
            <Label>Ngày đón</Label>
            <Input type="datetime-local" :min="new Date().toISOString().slice(0, 16)" placeholder="Nhập ngày đón" />
          </div>
        </div>
        <div class="col-span-3">
          <div class="flex flex-col gap-2">
            <Label>Dịch vụ</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Chọn dịch vụ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="21323">Chuyển nhà</SelectItem>
                <SelectItem value="23123">Chuyển văn phòng</SelectItem>
                <SelectItem value="234">Chuyển nhà trọn gói</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { BellPlus, SquareArrowOutUpRight, FilePlus2 } from "lucide-vue-next";
import { toast } from "vue-sonner";
</script>

<style></style>
