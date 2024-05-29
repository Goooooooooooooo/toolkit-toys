<template>
  <v-container>
    <div class="text-h4 ma-4 pa-4 pb-0 mb-0">
      {{ $t(`Settings`) }}
    </div>
    <v-card :class="['ma-2']" v-for="(option, key, i) in options">
      <v-list-item
        :key="option.title"
        :subtitle="option.subtitle"
        :title="option.title"
      >
        <template v-slot:prepend>
          <v-avatar color="accent">
            <v-icon>{{ option.icon }}</v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-select class="text-primary" style="width: 150px;" v-if="option.type === 'v-select'" 
            v-model="option.value"
            @update:model-value="option.handler()"
            color="primary"
            density="compact"
            hide-details
            chips
            :items="option.items"
            item-title="name"
            item-value="value"
            item-color="color"
          >
          </v-select>
        </template>
      </v-list-item>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { invoke } from '@tauri-apps/api';
import { onMounted, reactive } from 'vue';
import { useTheme } from 'vuetify'
const theme = useTheme();
import { SettingType } from '@/config/toolkitsHelper';
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n()

const langSets = [
  { value: 'en', name: 'Engilish' },
  // { value: 'ja', name: '日本語' },
  { value: 'zh-Hans', name: '中文' }
];

const themeSets = [
  {
    name: '默认(light)',
    value: 'light',
    color: '#0288D1'
  }, 
  {
    name: '默认(dark)',
    value: 'dark',
    color: '#424242'
  }, 
  {
    name: '海藤黄',
    value: 'lightAmber',
    color: '#FFC107'
  }, 
  {
    name: '森林绿(dark)',
    value: 'darkGreen',
    color: '#4caf50'
  },
  {
    name: '森林绿(light)',
    value: 'lightGreen',
    color: '#4caf50'
  },
  {
    name: '太空灰',
    value: 'lightGray',
    color: '#275dad'
  },
  {
    name: '苏木橙(dark)',
    value: 'darkOrange',
    color: '#275dad'
  }
];

// 参数配置
const options = reactive({
  'Language' : {
    icon: 'mdi-translate',
    subtitle: t('Language settings'),
    title: t('Language'),
    on: false,
    value: 'zh-Hans',
    type: 'v-select',
    items: langSets,
    handler: () => {onLaunguageChanged()}
  },
  'Theme' : {
    icon: 'mdi-palette',
    subtitle: t('Theme settings'),
    title: t('Theme'),
    on: false,
    value: 'light',
    type: 'v-select',
    items: themeSets,
    handler: () => {onThemeChanged()}
  },
});

onMounted(() => {
  console.log(locale)
  invoke('get_settings').then((res) => {
    const settings = res as SettingType;
    options.Language.value = settings.lang;
    if (locale.value !== settings.lang)
      locale.value = settings.lang
    options.Theme.value = settings.theme;
    theme.global.name.value = options.Theme.value;
  });
})

async function onLaunguageChanged() {
  const lang = options.Language.value;
  if (locale.value !== lang)
      locale.value = lang
  await invoke('set_language', { newLanguage: lang });
}

async function onThemeChanged() {
  //全局修改主题theme
  theme.global.name.value = options.Theme.value;
  await invoke('set_theme', { newTheme: options.Theme.value });
}
</script>