<template>
  <div class="w-full lg:grid h-screen lg:grid-cols-2">
    <div class="flex items-center justify-center py-12">
      <form
        @submit.prevent="handlerSubmit"
        class="mx-auto grid w-[350px] gap-6"
      >
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">Đăng nhập</h1>
          <p class="text-balance text-muted-foreground">
            Dùng tài khoản và mật khẩu để đăng nhập
          </p>
        </div>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Tài khoản</Label>
            <Input
              type="text"
              v-model="user.phone"
              placeholder="m@example.com or 0123456789"
              required
            />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Mật khẩu</Label>
            </div>
            <Input
              v-model="user.password"
              minlength="6"
              type="password"
              required
            />
          </div>
          <Button :loading="loading" type="submit" class="w-full"> Đăng nhập </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Bạn chưa có tài khoản?
          <a href="#" class="underline"> Đăng ký </a>
        </div>
      </form>
    </div>
    <div class="hidden bg-muted lg:block">
      <img
        src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg"
        alt="Image"
        width="1920"
        height="1080"
        class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { toast } from "vue-sonner";
import AdminService from "@/services/AdminService";
definePageMeta({
  layout: "blank",
});
useHead({
  title: "Đăng nhập",
  meta: [
    {
      name: "description",
      content: "Đăng nhập vào tài khoản của bạn",
    },
  ],
});

const loading = ref(false);

const user = ref({
  phone: "",
  password: "",
});

async function handlerSubmit() {
  try {
    loading.value = true;
    await AdminService.login(user.value.phone, user.value.password);
  } catch (error) {
    toast.error((error as any).data);
  } finally {
    loading.value = false;
  } 
}
</script>
