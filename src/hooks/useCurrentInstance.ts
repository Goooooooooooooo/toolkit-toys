import { ComponentInternalInstance, getCurrentInstance } from 'vue';
// return global properties
export default function useCurrentInstance() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance;
  const proxy = appContext.config.globalProperties;
  return {
    proxy
  }
}