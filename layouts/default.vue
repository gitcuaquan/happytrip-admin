<script setup lang="ts">
  import {
    AudioWaveform,
    BadgeCheck,
    Bell,
    BookOpen,
    Bot,
    ChevronRight,
    ChevronsUpDown,
    Command,
    CreditCard,
    Folder,
    Forward,
    Frame,
    GalleryVerticalEnd,
    LogOut,
    Map,
    MoreHorizontal,
    PieChart,
    Plus,
    Settings2,
    Sparkles,
    SquareTerminal,
    Trash2,
  } from "lucide-vue-next";
  import AdminService from "~/services/AdminService";

  // This is sample data.
  const data = {
    user: {
      name: "Quân Tạ",
      email: "quan@example.com",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWrLzlCvzW9PJ6RDf_dUMIeG2khQ6zFGKXFw&s",
    },
    navMain: [
      {
        title: "Quản lý chuyến đi",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Đang chờ tài xế",
            url: "/order",
          },
          {
            title: "Đã được nhận ",
            url: "/order/accept",
          },
          {
            title: "Đã hoàn thành",
            url: "/order/success",
          },
          {
            title: "Đã bị hủy",
            url: "/order/cancel-hold",
          },
          {
            title: "Lệnh hủy chuyến",
            url: "/order/cancel-waiting",
          },
        ],
      },
      {
        title: "Quản lý tài chính",
        url: "#",
        icon: Bot,
        isActive: true,
        items: [
          {
            title: "Danh sách ví",
            url: "/finance/wallet-list",
          },
          {
            title: "Lệnh rút tiền",
            url: "/finance/listwithdraw",
          },
          {
            title: "Lịch sử giao dịch",
            url: "#",
          },
        ],
      },
      {
        title: "Quản lý nhân sự",
        url: "#",
        icon: BookOpen,
        isActive: true,
        items: [
          {
            title: "Khách hàng",
            url: "#",
          },
          {
            title: "Tài xế",
            url: "/user/driver",
          },
          {
            title: "Cộng tác viên",
            url: "#",
          },
        ],
      },
      {
        title: "Cài đặt",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "Tỉnh thành",
            url: "#",
          },
          {
            title: "Giá sàn",
            url: "#",
          },
          {
            title: "Phụ phí",
            url: "#",
          },
          {
            title: "Hãng xe",
            url: "#",
          },
          {
            title: "Bảng giá",
            url: "#",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Trung tâm báo cáo",
        url: "/report",
        icon: PieChart,
      },
      {
        name: "Lịch sử giao dịch",
        url: "#",
        icon: Frame,
      },
      {
        name: "Quản lý ví tiền",
        url: "#",
        icon: Map,
      },
    ],
  };
</script>

<template>
  <SidebarProvider>
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <img class="px-10" src="https://happytrip.vn/img/logohpt.png" alt="" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton as-child>
                <nuxt-link to="/">
                  <Sparkles />
                  <span>Tổng quan</span>
                </nuxt-link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarGroupLabel>Quản lý</SidebarGroupLabel>
          <SidebarMenu>
            <Collapsible v-for="item in data.navMain" :key="item.title" as-child :default-open="item.isActive"
              class="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton :tooltip="item.title">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                    <ChevronRight
                      class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                      <SidebarMenuSubButton as-child>
                        <nuxt-link :to="subItem.url">
                          <span>{{ subItem.title }}</span>
                        </nuxt-link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup class="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Truy cập nhanh</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in data.projects" :key="item.name">
              <SidebarMenuButton as-child>
                <nuxt-link :to="item.url">
                  <component :is="item.icon" />
                  <span>{{ item.name }}</span>
                </nuxt-link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <SidebarMenuButton size="lg"
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <Avatar class="h-8 w-8 rounded-lg">
                    <AvatarImage :src="data.user.avatar" :alt="data.user.name" />
                    <AvatarFallback class="rounded-lg"> CN </AvatarFallback>
                  </Avatar>
                  <div class="grid flex-1 text-left text-sm leading-tight">
                    <span class="truncate font-semibold">{{
                      data.user.name
                    }}</span>
                    <span class="truncate text-xs">{{ data.user.email }}</span>
                  </div>
                  <ChevronsUpDown class="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side="bottom"
                align="end" :side-offset="4">
                <DropdownMenuLabel class="p-0 font-normal">
                  <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar class="h-8 w-8 rounded-lg">
                      <AvatarImage :src="data.user.avatar" :alt="data.user.name" />
                      <AvatarFallback class="rounded-lg"> CN </AvatarFallback>
                    </Avatar>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-semibold">{{
                        data.user.name
                      }}</span>
                      <span class="truncate text-xs">{{
                        data.user.email
                      }}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Đổi mật khẩu
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    Thông báo
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="AdminService.logout()">
                  <LogOut />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    <SidebarInset>
      <header
        class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem class="hidden md:block">
                <BreadcrumbLink as-child>
                  <nuxt-link to="/">Tổng quan</nuxt-link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator class="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <slot />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<style>
  [data-sidebar="sidebar"] {
    background: #ffffff !important;
    border-right: 1px solid #e5e7eb;
  }

  [data-sidebar="content"] {
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #cbd5e0 #f7fafc;
  }

  [data-sidebar="content"]::-webkit-scrollbar {
    width: 8px;
  }

  [data-sidebar="content"]::-webkit-scrollbar-track {
    background: #f7fafc;
  }

  [data-sidebar="content"]::-webkit-scrollbar-thumb {
    background-color: #cbd5e0;
    border-radius: 4px;
  }
</style>
