import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// css
import './index.css'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'

// plugin
import '@/plugins/vconsole'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
