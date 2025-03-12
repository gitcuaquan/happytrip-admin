<template>
  <div class="rounded-lg  overflow-hidden border border-gray-300">
    <QuillEditor placeholder="Nhập nội dung thông báo" :content="String(props.modelValue)" @update:content="(value:string) => emit('update:modelValue',value)" toolbar="full" content-type="html" :modules="[modules1,modules2]" theme="snow" />
  </div>
</template>

<script lang="ts" setup>
import { QuillEditor } from "@vueup/vue-quill";
import BlotFormatter from "quill-blot-formatter";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { Service } from "~/services/Service";
import ImageUploader from "quill-image-uploader";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const modules1 = {
  name: "blotFormatter",
  module: BlotFormatter,
};
const modules2 = {
  name: "imageUploader",
  module: ImageUploader,
  options: {
    upload: (file: File) => {
      return new Promise((resolve, reject) => {
        new Service().uploadImage(file).then((res:any) => {
          resolve(res.url);
        }).catch((err) => {
          reject("Upload failed");
          console.error("Error:", err);
        });
      });
    },
  },
};

</script>

<style>
  .ql-editor {
    min-height: 500px;
  }
  .ql-toolbar.ql-snow {
    border-bottom: 1px solid #eaecef;
  }
  .ql-container.ql-snow , .ql-toolbar.ql-snow {
    border: none;
  }
</style>
