<template>
  <v-container>
    <div class="text-h4 ma-4">
      {{ $t('JSON Formatter') }}
    </div>
    <div class="text-h5 ml-4">{{ $t('Configuration') }}</div>
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
          <v-select style="width: 150px;" v-if="option.type === 'v-select'" 
            v-model="option.value"
            @update:model-value="updateJson"
            color="primary"
            density="compact"
            hide-details
            chips
            :items="indentItem"
            item-title="name"
            item-value="val"
          ></v-select>
          <v-switch style="width: 100px;" v-if="option.type === 'switch'" 
            v-model="option.on" 
            :label="`${option.on ? 'on' : 'off'}`"
            hide-details
            inline
            color="secondary"
            density="compact"
            @change="updateJson"
          ></v-switch>
        </template>
      </v-list-item>
    </v-card>
    <div class="ma-2">
      <TextEditor 
        :language="'json'" 
        ref="codeEditorSourceRef"
        :minHeight="'150px'"
        :maxHeight="'30vh'"
      />
      <div class="pa-1 d-flex flex-row-reverse">
        <v-btn class="ma-1"
          width="30"
          color="primary"
          @click="updateJson"
        >
          格式化
        </v-btn>
        <v-btn class="ma-1"
          width="30"
          color="primary"
          @click="copyText(copyTextRef)"
        >
          复制
        </v-btn>
      </div>
      <TextEditor 
        :language="'json'" 
        ref="codeEditorTargetRef"
        :minHeight="'200px'"
        :maxHeight="'50vh'"
      />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import TextEditor from '@/components/common/TextEditor.vue'
import useCurrentInstance from "@/hooks/useCurrentInstance"
const { proxy } = useCurrentInstance();

const indentItem = [
  { name: '2 spaces', val: 2 },
  { name: '4 spaces', val: 4 },
  { name: 'tab', val: '\t' },
  { name: 'Minified', val: 0 }
]

// 参数配置
const options = reactive({
  'length' : {
    icon: 'mdi-keyboard-space',
    subtitle: '',
    title: '缩进',
    on: false,
    value: 2,
    type: 'v-select'
  },
  'sort': {
    icon: 'mdi-sort-alphabetical-ascending',
    subtitle: '',
    title: '排序',
    on: true,
    value: 0,
    type: 'switch'
  }
});

const codeEditorSourceRef = ref();
const codeEditorTargetRef = ref();
const copyTextRef = ref('');

const sortJson = (k, v) => {
  if (v instanceof Object && !(v instanceof Array|| v === null)){
    return Object.keys(v).sort().reduce((sorted, k) => {
			sorted[k] = v[k];
			return sorted;
		}, {})
  }
  return v;
}

// 复制文本
function copyText(value: any):void {
  proxy.$globalUtils.writeClipboardText(String(value));
}

async function getClipboardText() {
  return await proxy.$globalUtils.readClipboardText();
}

const leftBoxWidth = ref('50vw');
const rightBoxWidth = ref('50vw');
let observer: ResizeObserver | null = null;

// onMounted时添加DOM大小变化监听
onMounted(async () => {
  observer = new ResizeObserver(handleResize);
  const element = document.getElementById("container-resizable");
  if (element) {
    observer.observe(element);
  }
})

const updateJson = () => {
  let sourceValue = codeEditorSourceRef.value.getValue();
  if (!sourceValue) return;
  let jsonVal = null;
  try {
    jsonVal = JSON.parse(sourceValue);
  } catch (error) {
    throw new Error(error);
  }
  if (options.sort.on) {
    codeEditorTargetRef.value.setValue(JSON.stringify(jsonVal, sortJson, options.length.value));
  } else {
    codeEditorTargetRef.value.setValue(JSON.stringify(jsonVal, null, options.length.value));
  }
  copyTextRef.value = codeEditorTargetRef.value.getValue();
}

const handleResize = (entries: any) => {
  for (const entry of entries) {
    const { width, height } = entry.contentRect;
    rightBoxWidth.value = `${width - +(leftBoxWidth.value.replace('px', ''))}px`
  }
}

// 组件卸载时移除监听
onUnmounted(() => {
  observer?.disconnect();
})

const getParentOffsetLeft = (element) => {
  if (!element) return;
  let offsetLeft = element.offsetLeft;
  const parent = element.offsetParent;
  while (parent !== null) {
    offsetLeft += parent.offsetLeft;
  }
}

const getBoundingClientRect = (element) => {
  if (!element) return {};
  const rect = element.getBoundingClientRect();
  return {
    rectBottom : rect.bottom,
    rectTop: rect.top,
    rectLeft: rect.left,
    rectRight: rect.right,
    rectHeight: rect.height,
    rectWidth: rect.width,
    rectX: rect.x,
    rectY: rect.y
  }
}

</script>