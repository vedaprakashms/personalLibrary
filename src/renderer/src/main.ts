import '@picocss/pico/css/pico.min.css'
import '@picocss/pico/css/pico.conditional.min.css'
import '@picocss/pico/css/pico.classless.min.css'
import '@picocss/pico/css/pico.colors.min.css'
import Toast from 'vue-toastification'
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'
import './assets/base.css'
import router from './router/'
import { VueQrcodeReader } from 'vue-qrcode-reader'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(router).use(Toast).use(VueQrcodeReader).mount('#app')
