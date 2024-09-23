import App from '@/App.vue';
import { registerPlugins } from '@core/utils/plugins';
import { createApp } from 'vue';
import VxeTable from 'vxe-table';
import 'vxe-table/lib/style.css';

// Styles
import '@/assets/styles/styles.scss';
import '@core/scss/template/index.scss';
import '@layouts/styles/index.scss';

// Create vue app
const app = createApp(App).use(VxeTable);


// Register plugins
registerPlugins(app)

// Mount vue app
app.mount('#app')
