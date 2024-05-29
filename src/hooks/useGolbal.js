import { getCurrentInstance } from 'vue';

export default function useGetGlobalProperties() {
  const { appContext } = getCurrentInstance();
  const proxy = appContext.config.globalProperties;
  return {
    proxy
  }
}