import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // Import your router setup

const app = createApp(App)

// Use the router in your app
app.use(router)

app.mount('#app')
