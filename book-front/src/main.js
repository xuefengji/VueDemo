import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "@/assets/index.less"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/api/mock.js'

import api from '@/api/api'

import App from './App.vue'
import router from './router'
const app = createApp(App)

app.config.globalProperties.$api = api

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
