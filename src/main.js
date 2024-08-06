import App from '@/App.vue';
import { registerPlugins } from '@core/utils/plugins';
import { createApp } from 'vue';
import VxeUI from 'vxe-pc-ui';
import 'vxe-pc-ui/lib/style.css';
import VxeTable from 'vxe-table';
import 'vxe-table/lib/style.css';

// Styles
import '@core/scss/template/index.scss';
import '@layouts/styles/index.scss';

// Create vue app
const app = createApp(App).use(VxeUI).use(VxeTable);


// Register plugins
registerPlugins(app)

// Mount vue app
app.mount('#app')
