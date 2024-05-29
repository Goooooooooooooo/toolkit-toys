<template>
  <v-container>
    <div class="text-h4 ma-4">
      {{ $t('SQL Formatter') }}
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
            @update:model-value="stringFormat"
            color="primary"
            density="compact"
            hide-details
            chips
            :items="option.items"
            item-title="name"
            item-value="val"
          ></v-select>
          <v-switch style="width: 85px;" v-if="option.type === 'switch'" 
            v-model="option.on" 
            :label="`${option.on ? 'on' : 'off'}`"
            hide-details
            inline
            color="primary"
            density="compact"
            @change="stringFormat"
          ></v-switch>
        </template>
      </v-list-item>
    </v-card>
    <div class="ma-2">
      <TextEditor 
        :language="'sql'" 
        ref="codeEditorSourceRef"
        :minHeight="'150px'"
        :maxHeight="'30vh'"
        @update:modelValue="updateModelValue"
      />
      <div class="pa-1 d-flex flex-row-reverse">
        <v-btn class="ma-1"
          width="30"
          color="primary"
          @click="stringFormat"
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
        :language="'sql'" 
        ref="codeEditorTargetRef"
        :minHeight="'200px'"
        :maxHeight="'50vh'"
      />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import TextEditor from '@/components/common/TextEditor.vue'
import { format } from 'sql-formatter';
import useCurrentInstance from "@/hooks/useCurrentInstance"
const { proxy } = useCurrentInstance();

const codeEditorSourceRef = ref();
const codeEditorTargetRef = ref();
const copyTextRef = ref('');

type SqlType = "mysql" | "bigquery" | "postgresql" | "db2" | "sql" | "sqlite" | "db2i" | "hive" | "mariadb" | "n1ql" | "plsql" | "redshift" | "singlestoredb" | "snowflake" | "spark" | "tidb" | "transactsql" | "trino" | "tsql" | undefined;
const sqlTypeItem = [
  { name: 'mysql', val: 'mysql' },
  { name: 'bigquery', val: 'bigquery' },
  { name: 'postgresql', val: 'postgresql' },
  { name: 'db2', val: 'db2' },
  { name: 'sql', val: 'sql' },
  { name: 'sqlite', val: 'sqlite' },
];

// 参数配置
const options = reactive({
  'sqlType' : {
    icon: 'mdi-database-search-outline',
    subtitle: '',
    title: '语言',
    on: false,
    value: <SqlType>'mysql',
    type: 'v-select',
    items: sqlTypeItem
  },
  'indentUnit' : {
    icon: 'mdi-keyboard-space',
    subtitle: '',
    title: '缩进',
    on: false,
    value: 2,
    type: 'v-select',
    items: [
      { name: '2 spaces', val: 2 },
      { name: '4 spaces', val: 4 },
      { name: 'tab', val: '\t' },
      { name: 'Minified', val: 0 }
    ]
  },
});

// 复制文本
function copyText(value: any):void {
  proxy.$globalUtils.writeClipboardText(String(value));
}

async function getClipboardText() {
  return await proxy.$globalUtils.readClipboardText();
}

onMounted(async () => {
})

const updateModelValue = (val) => {
  console.log('updateModelValue', val);
}

const stringFormat = () => {
  let sourceValue = codeEditorSourceRef.value.getValue();
  if (!sourceValue) return;

  const sqlformat = format(sourceValue, 
    { 
      language: options.sqlType.value ?? 'mysql',
      tabWidth: options.indentUnit.value,
      keywordCase: 'upper',
      linesBetweenQueries: 2,
      paramTypes: {
        custom: [
          { regex: String.raw`#\{.+?\}` }
        ]
      }
    });
  codeEditorTargetRef.value.setValue(sqlformat);
  copyTextRef.value = codeEditorTargetRef.value.getValue();
}

</script>