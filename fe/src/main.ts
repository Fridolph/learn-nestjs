import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import { setupRouter } from './router'
// 样式相关
import 'tailwindcss/tailwind.css'
import './styles/index.css'

function bootstrap() {
  const app = createApp(App)

  // router
  setupRouter(app)

  // store
  setupStore(app)

  // mount
  app.mount('#app')
}

bootstrap()