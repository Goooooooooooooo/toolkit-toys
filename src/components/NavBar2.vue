<template>
  <v-navigation-drawer
    :width="260"
    v-model="drawer" 
    :rail="rail" 
    permanent 
  >
    <!-- <v-list-item>
      <template v-slot:prepend>
        <v-avatar color="accent">
          <v-icon>mdi-toolbox-outline</v-icon>
        </v-avatar>
      </template>
      <template v-slot:append>
        <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
      </template>
    </v-list-item> -->
    <span style="position: absolute;right: -15px;top: 20px;">
      <v-btn color="accent" density="compact" @click.stop="rail = !rail"
        :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
      ></v-btn>
    </span>

    <div class="d-flex flex-column ma-1">
      <template v-if="$tool_bookmarks.value.length > 0 || $tool_menus.value.length > 0">
        <v-tabs class="v-nav-tab_slider"
          v-model="tab"
          color="primary"
          direction="vertical"
          density="compact"
          grow
        >
          <TransitionGroup name="list">
            <template color="primary" v-for="(starMenu, starIdx) in $tool_bookmarks.value" :key="starMenu.name">
              <v-tab height="45" :title="$t(`menu.${starMenu.name}`)"
                :value="`${starMenu.path}-${starIdx}`"
                @click="menuOnClick(starMenu);"
              >
                <span class="font-weight-black">{{ $t(`menu.${starMenu.name}`) }}</span>
                <template v-slot:prepend>
                  <v-icon class="pl-3 pr-4" size="x-large" :icon="starMenu.icon" />
                </template>
                <template v-if="starMenu.path.includes('todo')" v-slot:append>
                  <v-badge
                    color="info"
                    :content="todoSize"
                    inline
                  ></v-badge>
                </template>
              </v-tab>
            </template>

            <v-divider key="nav-divider-1"></v-divider>

            <template color="primary" v-for="(menu, idx) in $tool_menus.value" :key="menu.path">

              <v-tab style="display: inline-flex;" height="45" class="v-nav-tab_icon"
                :value="`${menu.path}-${idx}`" :title="$t(`menu.${menu.name}`)"
                @click="menuOnClick(menu);menu.isActive = !menu.isActive"
              >
                <span class="font-weight-black">{{ $t(`menu.${menu.name}`) }}</span>
                <template v-slot:prepend>
                  <v-icon class="pl-3 pr-4" size="x-large" :icon="menu.icon" />
                </template>
                <template v-if="menu.submenu.length > 0" v-slot:append>
                  <v-icon size="x-large">{{ menu.isActive ? "mdi-chevron-down" : "mdi-chevron-up" }}</v-icon>
                </template>
              </v-tab>

                <template v-if="menu.isActive && menu.submenu.length > 0">
                  <template v-for="(subItem) in menu.submenu" :key="subItem.path">
                    <v-tab :title="$t(`menu.${subItem.name}`)"
                      :value="`${subItem.path}`" height="45"
                      @click="menuOnClick(subItem)">
                      <span class="font-weight-black">{{ $t(`menu.${subItem.name}`) }}</span>
                      <template v-slot:prepend>
                        <v-icon class="pl-3 pr-4" size="x-large" :icon="subItem.icon" />
                      </template>
                    </v-tab>
                  </template>
                </template>

            </template>
          </TransitionGroup>
        </v-tabs>
      </template>
    </div>
    <template v-slot:append>
      <v-btn 
        @click="menuOnClick({path:'Settings', component: 'Settings'})"
        color="secondary"
        title="Settings" 
        icon="mdi-cog-outline" 
        size="small" 
        style="margin: 8px;" absolute left bottom>
      </v-btn>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { toolkitsHelper } from '@/config/toolkitsHelper';
import eventBus from '@/utils/event-bus';

const tab = ref('');
const todoSize = ref(0);
const drawer = ref(true);
const rail = ref(false);

onMounted(() => {
  const { undoneSize } = toolkitsHelper.getTodos();
  todoSize.value = undoneSize;

  // 订阅Active Tool
  const offActiveTool = eventBus.$on('active-tool', (item) => {
    // console.log("🚀 ~ offActiveTool ~ item:", item)
    tab.value = item.path;
    if (item.parentPath) {
      toolkitsHelper.activeParentTool(item);  // sub menu, 展开父级菜单
    } else {
      const idx = toolkitsHelper.bookmarks.indexOf(item);
      if (idx >= 0) tab.value = item.path+"-"+idx;
    }
  })

  // 订阅待办事项件数
  const updateTodoSize = (size) => {
    todoSize.value = size;
  }
  eventBus.$on('update-todo-size', updateTodoSize);
  const unsubscribe = () => {
    eventBus.$off('update-todo-size', updateTodoSize)
  }
  onUnmounted(() => {
    unsubscribe();
    offActiveTool();
  });
})

const emit = defineEmits(['ChangeComponent']);
function menuOnClick(menu) {  
  // console.log("nav bar menuOnClick() " + selected_name);
  emit('ChangeComponent', menu); 
}
</script>

<style>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
  max-height: 1000px;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(100%);
  max-height: 0px;
}
.list-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  max-height: 0px;
}
.v-nav-tab_slider .v-tab__slider {
  top: 9px !important;
  height: 55% !important;
  width: 4px !important;
  border-radius: 5px !important;
}
.v-nav-tab_icon .v-btn__append {
  margin-left: auto;
}
</style>