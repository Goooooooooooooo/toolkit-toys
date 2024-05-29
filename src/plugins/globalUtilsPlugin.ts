import { App } from 'vue';
import { globalUtils } from '@/utils/globalUtils';

export default {
  install: (app: App) => {
    app.config.globalProperties.$globalUtils = globalUtils;
  }
};