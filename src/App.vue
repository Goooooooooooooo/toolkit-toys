<template>
  <v-app>
    <!-- <AppBar/> -->
    <v-main>
      <NavBar @ChangeComponent="toggleComponent" />
      <v-layout :class="['rounded']">
        <div class="d-flex w-100" style="height: calc(0px + 100vh);overflow: auto;">
            <component
              :is="TCMAP[currentComponent]" 
              v-bind="currentProps"
              @ActiveComponent="activeComponent"
            />
        </div>
      </v-layout>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTheme } from 'vuetify'
import NavBar from '@/components/NavBar2.vue';
import { TCMAP } from '@/config/router';
import { toolkitsHelper } from '@/config/toolkitsHelper.ts';
import useGetGlobalProperties from '@/hooks/useGolbal.js';
const { proxy } = useGetGlobalProperties();
import { useI18n } from 'vue-i18n';
const { locale } = useI18n()

const ALLTOOLS = 'All Tools';
let currentProps = ref({});
let currentComponent = ref('AllTools');

onMounted(async () => { 
  //页面加载完成后 调用一次
  console.log('App vue Init.');
  toolkitsHelper.init(useTheme(), proxy, locale);
  currentProps.value = { componentName: ALLTOOLS, toolItems: toolkitsHelper.getAllTools() }
})

function activeComponent(item) {
  // console.log('App vue', item);
  currentComponent.value = item.component;
}

//切换 组件
function toggleComponent(menu) {
  // console.log("App vue toggleComponent() ", menu);
  currentProps.value.componentName = menu?.name;
  if (currentProps.value.componentName === ALLTOOLS) {
    currentProps.value.toolItems = toolkitsHelper.getAllTools();
  }

  if (menu?.submenu?.length > 0) {
    currentProps.value.toolItems = menu.submenu;
  }

  if (currentComponent.value !== menu.component) {
    currentComponent.value = menu.component;
  }
}
</script>
