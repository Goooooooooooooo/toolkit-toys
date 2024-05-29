<template>
  <v-container>
    <div class="text-h4 ma-4">
      通用唯一识别码(Nanoid)生成工具
    </div>
    <div class="text-h5 ml-4">配置</div>
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
          <v-text-field v-if="option.type === 'number-input'" color="primary"
            v-model="len" 
            @change="handleInput"
            density="comfortable"
            style="width: 110px"
            single-line
            type="text"
            :center-affix="true"
            hide-details
          >
          <template v-slot:append-inner>
            <v-icon color="red" icon="mdi-plus" size="small" @click="increment" />
          </template>
          <template v-slot:prepend-inner>
            <v-icon color="green" icon="mdi-minus" size="small" @click="decrement" />
          </template>
          </v-text-field>

          <v-switch v-if="option.type === 'switch'" v-model="option.on" style="width: 110px;"
            :label="`${option.on ? 'on' : 'off'}`"
            hide-details
            inline
            color="secondary"
          ></v-switch>
        </template>
      </v-list-item>
    </v-card>
    <v-row no-gutters>
      <v-col cols="12" sm="4" class="ma-2 pa-2">
        <v-btn
          color="primary"
          block
          @click="generatorID(len)"
        >
          生成ID
        </v-btn>
      </v-col>
      <v-col cols="12" sm="4" class="ma-2 pa-2">
        <v-btn
          color="primary"
          block
          @click="$globalUtils.writeClipboardText(result)"
          >
          复制
        </v-btn>
      </v-col>
      <v-col cols="12" class="pa-2">
        <v-textarea auto-grow clearable label="ID" readonly :model-value="result" color="primary"></v-textarea>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { invoke } from "@tauri-apps/api/tauri";

let len = ref(12);
let result = ref('');

// 参数配置
const options = reactive({
  'length' : {
    icon: 'mdi-pound-box-outline',
    subtitle: '',
    title: 'ID长度',
    type: 'number-input'
  },
  'uppercase': {
    icon: 'mdi-format-letter-case-upper',
    subtitle: '',
    title: '大写字母',
    on: true,
    type: 'switch'
  },
  // {
  //   name: 'hyphen',
  //   icon: 'mdi-minus',
  //   subtitle: '',
  //   title: '连字符',
  //   on: true,
  //   type: 'switch'
  // }
});

// 长度加1
function increment() {
  if (Number.isFinite(+len.value)) {
    len.value = len.value + 1;
  }
}

// 长度减1
function decrement() {
  if (Number.isFinite(+len.value)) {
    len.value = len.value - 1;
    if (len.value <= 0){
      len.value = 1;
    }
  }
}

// 长度，替换非数字字符
function handleInput(event) {
  let val = event.target.value.trim();
  console.log(event, event.target.value, /^[1-9]\d*$/.test(val));
  len.value = +event.target.value.replace(/[^\d]/g,'');
  if (!Number.isFinite(+len.value) || len.value === 0) {
    len.value = 1;
  }
}

// 生成ID并显示
async function generatorID(length) {
  let id = await invoke("generate_nanoid", { size: length });
  if (options['uppercase']['on']) {
    id = id.toUpperCase();
  }
  if (result.value.trim().length === 0) {
    result.value = id;
  } else {
    result.value = `${result.value}\n${id}`;
  }
}

onMounted(async () => {

});
</script>
