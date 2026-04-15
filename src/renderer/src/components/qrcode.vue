<script setup lang="ts">
const props = defineProps<{
  uid: string
}>()
import { QrcodeSvg } from 'qrcode.vue'
import { ref } from 'vue'
const uniqueID = ref(props.uid)
</script>
<template>
  <qrcode-svg :value="uniqueID" level="H" />
</template>
