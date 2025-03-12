<template>
  <div>hu ne</div>
</template>

<script lang="ts" setup>
const { $AnnouncementService } = useServices();

const fetchAnnouncements = async () => {
  try {
    const announcements = await $AnnouncementService.getAnnouncements({
      page: 1,
      limit: 10,
    });
    console.log(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
  }
};

fetchAnnouncements();
</script>

<style></style>
