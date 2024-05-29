<template>
  <v-item-group selected-class="bg-primary">
    <div class="text-h4 ma-4 pa-4 pb-0 mb-0">
      {{ $t(`menu.${componentName}`) }}
    </div>
    <v-container class="d-flex flex-wrap" fluid>
      <v-item v-for="(item, i) in toolItems" :key="i" v-slot="{ isSelected, selectedClass, toggle }">
        <v-hover v-slot="{ isHovering, props }">
          <v-card :class="['d-flex flex-column text-center ma-4 pa-2', { 'on-hover': isHovering }]" 
              v-bind="props" 
              :elevation="isHovering ? 24 : 6"
              height="300" width="190" 
              @click="getActiveComponent(item)"
            >
              <v-card-title>
                <div class="text-h3 pa-3">
                  <v-icon color="primary" :icon="item.icon" size="100"></v-icon>
                </div>
              </v-card-title>

              <v-card-text class="grow">
                <div class="text-h6 text-primary font-weight-medium">
                  {{ $t(`menu.${item.name}`) }}
                </div>
              </v-card-text>
              
              <v-spacer></v-spacer>

              <v-card-actions class="justify-center mt-auto">
                <div v-if="isHovering || hasItem(item.path)" class="transition-btn-actions">
                  <v-btn v-for="(icon, index) in icons" 
                    :key="index"
                    icon
                    @click="addToBookmarks($event, item)"
                  >
                    <template v-if="hasItem(item.path)">
                      <v-icon color="secondary" :icon="icon.after" />
                      <v-tooltip color="info" activator="parent" location="top">从收藏夹中移除</v-tooltip>
                    </template>
                    <template v-else>
                      <v-icon color="secondary" :icon="icon.beforce" />
                      <v-tooltip color="info" activator="parent" location="top">添加至收藏夹</v-tooltip>
                    </template>
                  </v-btn>
                </div>
              </v-card-actions>
          </v-card>
        </v-hover>
      </v-item>
    </v-container>
  </v-item-group>
</template>

<script setup>
import { onMounted } from 'vue'
import { invoke } from '@tauri-apps/api';
import { toolkitsHelper } from '@/config/toolkitsHelper';
import eventBus from '@/utils/event-bus';
import { useI18n } from 'vue-i18n';
const { t } = useI18n()

/**
 * card action icon btn 
 */
const icons = [
  { beforce: "mdi-star-outline", after: 'mdi-star' }, 
  // "mdi-heart-outline", 
  // "mdi-pin-outline"
];

const emit = defineEmits(['ActiveComponent']);

let props = defineProps({
    componentName:{
      type: String,
      default: 'AllTools',
      required: false
    },
    toolItems: {
      type: Array,
      default: [],
      required: false
    }
});

onMounted(() => {
  // console.log('Toolkits vue', props.componentName, props.toolItems);
});

function hasItem(path) {
  return toolkitsHelper.existBookmark(path);
}

async function addToBookmarks(event, item) {
  event.stopPropagation();
  // console.log(item);
  // 不存在收藏夹中，添加，否则移除
  const ret = hasItem(item.path);
  if (!ret) {
    toolkitsHelper.setBookmarks(item); 
  } else {
    toolkitsHelper.filterBookmarksByPath(item.path);
  }
  const new_bookmarks = toolkitsHelper.bookmarks.map(x => x.path).join(',');
  await invoke('set_bookmarks', { newBookmarks: new_bookmarks });
}

function getActiveComponent(item) {
  // console.log("🚀 ~ getActiveComponent ~ item:", item)
  eventBus.$emit('active-tool', item);
  emit('ActiveComponent', item); 
}
</script>

<style scoped>
  .v-card {
    transition: opacity .9s ease-in-out;
  }

  .v-card:not(.on-hover) {
    opacity: 0.9;
  }

  .show-btns {
    color: rgba(255, 255, 255, 1) !important;
  }

  .transition-btn-actions {
    opacity: 0.5;
    transition: opacity cubic-bezier(0, 0.52, 1, 1) 1s;
  }

  .transition-btn-actions:hover{
    opacity: 1;
    transition-duration: 200ms;
  }
</style>