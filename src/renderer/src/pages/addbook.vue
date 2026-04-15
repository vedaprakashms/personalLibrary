<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'
import { QrcodeStream } from 'vue-qrcode-reader'
const toast = useToast()
const error = ref('')
const result = ref('')
const defaultConstraintOptions = [
  { label: 'rear camera', constraints: { facingMode: 'environment' } },
  { label: 'front camera', constraints: { facingMode: 'user' } }
]
const paintOutline = (detectedCodes, ctx): void => {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

    ctx.strokeStyle = 'red'

    ctx.beginPath()
    ctx.moveTo(firstPoint.x, firstPoint.y)
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y)
    }
    ctx.lineTo(firstPoint.x, firstPoint.y)
    ctx.closePath()
    ctx.stroke()
  }
}
const paintBoundingBox = (detectedCodes, ctx): void => {
  for (const detectedCode of detectedCodes) {
    const {
      boundingBox: { x, y, width, height }
    } = detectedCode

    ctx.lineWidth = 2
    ctx.strokeStyle = '#007bff'
    ctx.strokeRect(x, y, width, height)
  }
}
const paintCenterText = (detectedCodes, ctx): void => {
  for (const detectedCode of detectedCodes) {
    const { boundingBox, rawValue } = detectedCode

    const centerX = boundingBox.x + boundingBox.width / 2
    const centerY = boundingBox.y + boundingBox.height / 2

    const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width)

    ctx.font = `bold ${fontSize}px sans-serif`
    ctx.textAlign = 'center'

    ctx.lineWidth = 3
    ctx.strokeStyle = '#35495e'
    ctx.strokeText(detectedCode.rawValue, centerX, centerY)

    ctx.fillStyle = '#5cb984'
    ctx.fillText(rawValue, centerX, centerY)
  }
}
const trackFunctionOptions = [
  { text: 'outline', value: paintOutline },
  { text: 'centered text', value: paintCenterText },
  { text: 'bounding box', value: paintBoundingBox },
  { text: 'nothing (default)', value: undefined }
]
const trackFunctionSelected = ref(trackFunctionOptions[1])
const constraintOptions =
  ref<Array<{ label: string; constraints: { facingMode?: string; deviceId?: string } }>>(
    defaultConstraintOptions
  )
const selectedConstraints = ref({ facingMode: 'environment' })
interface book {
  _id?: string
  Title: string
  Author: string
  Genre: string
  Section: string
  section2: string
  uniqueId?: string
}
const bookStore = ref<book>({
  Title: '',
  Author: '',
  Genre: '',
  Section: '',
  section2: '',
  uniqueId: ''
})

const StoreBook = (): void => {
  // Implementation for storing the book
  console.log('Storing book:', bookStore.value)
  window.books
    .addBook(JSON.stringify(bookStore.value))
    .then((r: book | Error) => {
      if (r instanceof Error) {
        console.error('Error storing book:', r)
        toast.error('Error storing book: ' + r.message)
      } else {
        console.log('Book stored successfully')
        toast.success('Book stored successfully with ID: ' + r.uniqueId)
      }
    })
    .catch((error: Error) => {
      console.error('Error storing book:', error)
      toast.error('Error storing book: ' + error.message)
    })
    .finally(() => {
      bookStore.value = {
        Title: '',
        Author: '',
        Genre: '',
        Section: '',
        section2: ''
      }
    })
}

const onCameraReady = async (): Promise<void> => {
  const devices = await navigator.mediaDevices.enumerateDevices()
  const videoDevices = devices.filter(({ kind }) => kind === 'videoinput')

  constraintOptions.value = [
    ...defaultConstraintOptions,
    ...videoDevices.map(({ deviceId, label }) => ({
      label: `${label} (ID: ${deviceId})`,
      constraints: { deviceId }
    }))
  ]

  error.value = ''
}
const onDetect = (detectedCodes): void => {
  console.log(detectedCodes)
  result.value = JSON.stringify(detectedCodes.map((code) => code.rawValue))
  bookStore.value.uniqueId = detectedCodes[0].rawValue
}
function onError(err): void {
  error.value = `[${err.name}]: `

  if (err.name === 'NotAllowedError') {
    error.value += 'you need to grant camera access permission'
  } else if (err.name === 'NotFoundError') {
    error.value += 'no camera on this device'
  } else if (err.name === 'NotSupportedError') {
    error.value += 'secure context required (HTTPS, localhost)'
  } else if (err.name === 'NotReadableError') {
    error.value += 'is the camera already in use?'
  } else if (err.name === 'OverconstrainedError') {
    error.value += 'installed cameras are not suitable'
  } else if (err.name === 'StreamApiNotSupportedError') {
    error.value += 'Stream API is not supported in this browser'
  } else if (err.name === 'InsecureContextError') {
    error.value +=
      'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
  } else {
    error.value += err.message
  }
}
const barcodeFormats = ref({
  aztec: false,
  code_128: false,
  code_39: false,
  code_93: false,
  codabar: false,
  databar: false,
  databar_expanded: false,
  data_matrix: false,
  dx_film_edge: false,
  ean_13: false,
  ean_8: false,
  itf: false,
  maxi_code: false,
  micro_qr_code: false,
  pdf417: false,
  qr_code: true,
  rm_qr_code: false,
  upc_a: false,
  upc_e: false,
  linear_codes: false,
  matrix_codes: false
})
const selectedBarcodeFormats = computed(() => {
  return Object.keys(barcodeFormats.value).filter(
    (format) => barcodeFormats.value[format]
  ) as Array<
    | 'aztec'
    | 'code_128'
    | 'code_39'
    | 'code_93'
    | 'codabar'
    | 'databar'
    | 'databar_expanded'
    | 'data_matrix'
    | 'dx_film_edge'
    | 'ean_13'
    | 'ean_8'
    | 'itf'
    | 'maxi_code'
    | 'micro_qr_code'
    | 'pdf417'
    | 'qr_code'
    | 'rm_qr_code'
    | 'upc_a'
    | 'upc_e'
    | 'linear_codes'
    | 'matrix_codes'
  >
})
</script>

<template>
  <div>
    <div class="grid">
      <div class="card">
        <h2>Title</h2>
        <input v-model="bookStore.Title" type="text" placeholder="Book Title" />
      </div>
      <div class="card">
        <h2>Author</h2>
        <input v-model="bookStore.Author" type="text" placeholder="Book Author" />
      </div>
      <div class="card">
        <h2>Unique ID</h2>
        <input v-model="bookStore.uniqueId" type="text" placeholder="Unique ID" />
      </div>
    </div>
    <div class="grid">
      <div class="card">
        <h2>Section</h2>
        <input v-model="bookStore.Section" type="text" placeholder="Storage Section" />
      </div>
      <div class="card">
        <h2>Section II</h2>
        <input v-model="bookStore.section2" type="text" placeholder="Storage Section II" />
      </div>
      <div class="card">
        <h2>Genre</h2>
        <select id="genre" v-model="bookStore.Genre" aria-label="Select the genre of the book">
          <option selected disabled value="">Select the genre of the book</option>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-Fiction</option>
          <option value="sci-fi">Sci-Fi</option>
          <option value="fantasy">Fantasy</option>
          <option value="biography">Biography</option>
          <option value="devotional">Devotional</option>
          <option value="history">History</option>
          <option value="mystery">Mystery</option>
          <option value="romance">Romance</option>
        </select>
      </div>
    </div>
    <div class="parent">
      <div class="div1">
        <button class="button" @click="StoreBook" @keydown.enter="StoreBook">Add Book</button>
      </div>
    </div>
    <div>
      <select v-model="selectedConstraints">
        <option v-for="option in constraintOptions" :key="option.label" :value="option.constraints">
          {{ option.label }}
        </option>
      </select>
      <select v-model="trackFunctionSelected">
        <option v-for="option in trackFunctionOptions" :key="option.text" :value="option">
          {{ option.text }}
        </option>
      </select>
      Last result: <b>{{ result }}</b>
      <div class="boxed">
        <qrcode-stream
          :constraints="selectedConstraints"
          :track="trackFunctionSelected.value"
          :formats="selectedBarcodeFormats"
          @camera-on="onCameraReady"
          @detect="onDetect"
          @error="onError"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.boxed {
  width: 720px;
  height: auto;
}
</style>
