<script setup lang="ts">
import qrcodeVue from '@renderer/components/qrcode.vue'
import { reactive } from 'vue'
interface qrl {
  label: string
  text: string
}
const result = reactive<qrl[]>([])
const printDocument = function (): void {
  //window.print()
  result.length = 0
  window.electron.ipcRenderer.invoke('genrateQR').then((r) => {
    console.log(r)
    r.result?.map((e) => {
      result.push(e)
    })
  })
}
</script>

<template>
  <div>
    <div class="c">
      <form class="no-print">
        <div class="card">
          <label for=""><h1>Generate</h1></label>
          <input
            type="submit"
            value="Generate"
            @click="printDocument"
            @keydown.enter="printDocument"
          />
        </div>
      </form>
    </div>

    <!-- Only this div should be visible when printing -->
    <div class="printable-area">
      <h1 class="grid-4">
        <qrcodeVue v-for="value in result" :key="value.label" :uid="value.text" />
      </h1>
    </div>
  </div>
</template>
<style lang="css" scoped>
.c {
  display: flex;
  justify-content: center; /* Centers horizontally */
  align-items: center; /* Centers vertically */
}
.grid-4 {
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto auto;
  grid-template-rows: 120px 120px 120px 120px 120px;
  background-color: rgb(255, 255, 255);
}
.grid-4 h1 {
  padding: 5px;
  margin: 50px;
  border: 20px solid black;
  text-align: center;
  align-items: center;
}
</style>
