<template>
  <v-container>
    <div class="text-h4 ma-4">
      {{ $t('menu.Password Generator') }}
    </div>
    <div class="text-h5 ml-4">{{ $t('Configuration') }}</div>
    <v-card :class="['ma-2']" v-for="option in options">
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
            @change="changeState"
            color="secondary"
          ></v-switch>
        </template>
      </v-list-item>
    </v-card>
    <v-alert class="ma-2 pa-2" 
      v-if="showAlert" border color="error"
      elevation="2" 
      type="info"       
      variant="outlined"
      >
      未选择字符集，无法生成密码
    </v-alert>
    <v-row no-gutters>
      <v-col cols="12" sm="4" class="ma-2 pa-2">
        <v-btn
          color="primary"
          block
          @click="generatorRPW()"
        >
          生成密码
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
        <v-textarea auto-grow clearable label="密码" readonly :model-value="result" color="primary"></v-textarea>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const digits = '0123456789';
const lowercaseLetter = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const symbol = '!@#$%^&*()_+-{}[]|=<>,.';

const paramMap = {
  'digits': digits,
  'lowercase': lowercaseLetter,
  'uppercase': uppercaseLetter,
  'symbol': symbol
}

let len = ref(12);
let result = ref('');
let showAlert = ref(false);
// 密码参数配置
const options = reactive([
  {
    name: 'pwlength',
    icon: 'mdi-pound-box-outline',
    subtitle: '',
    title: '密码长度',
    type: 'number-input'
  },
  {
    name: 'lowercase',
    icon: 'mdi-format-letter-case-upper',
    subtitle: `小写字母包括（${lowercaseLetter}）`,
    title: '在密码中包含小写字母',
    on: true,
    type: 'switch'
  },
  {
    name: 'uppercase',
    icon: 'mdi-format-letter-case-upper',
    subtitle: `大写字母包括（${uppercaseLetter}）`,
    title: '在密码中包含大写字母',
    on: true,
    type: 'switch'
  },
  {
    name: 'digits',
    icon: 'mdi-numeric',
    subtitle: `数字包括（${digits}）`,
    title: '在密码中包含数字',
    on: true,
    type: 'switch'
  },
  {
    name: 'symbol',
    icon: 'mdi-symbol',
    subtitle: `特殊字符包括（${symbol}）`,
    title: '在密码中包含特殊字符',
    on: true,
    type: 'switch'
  },
]);

// 参数选项提示
function changeState() {
  let flg = false;
  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    if (Object.keys(option).includes('on')){
      if (option.on) {
        flg = false; 
        break;
      }
      flg = true;
    }
  }
  showAlert.value = flg;
}

// 密码长度加1
function increment() {
  if (Number.isFinite(+len.value)) {
    len.value = len.value + 1;
  }
}

// 密码长度减1
function decrement() {
  if (Number.isFinite(+len.value)) {
    len.value = len.value - 1;
    if (len.value <= 0){
      len.value = 1;
    }
  }
}

// 密码长度，替换非数字字符
function handleInput(event) {
  let val = event.target.value.trim();
  console.log(event, event.target.value, /^[1-9]\d*$/.test(val));
  len.value = +event.target.value.replace(/[^\d]/g,'');
  if (!Number.isFinite(+len.value) || len.value === 0) {
    len.value = 1;
  }
}

// 生成密码并显示
async function generatorRPW() {
  let pw = generatorRandomPassword(len.value);
  if (result.value.trim().length === 0) {
    result.value = pw;
  } else {
    result.value = `${result.value}\n${pw}`;
  }
}

/**
 * 随机生成至少包含一个大写字母，小写字母，数字，特殊字符的字符串
 * @param {number} length - default len = 8
 */
function generatorRandomPassword(length = 8) {
  let CHARCHTERS = '';
  let arr = [];
  let password = '';

  options.forEach(item => {
    if (item?.on) {
      CHARCHTERS += paramMap[item.name];
      arr.push(getRandomString(paramMap[item.name]));
    }
  });

  if (CHARCHTERS.trim().length === 0) {
    showAlert.value = true;
    return;
  }

  for (let i = 0; i < length - arr.length; i++) {
    password += getRandomString(CHARCHTERS);
  }

  const result = shuffle(arr.concat(Array.from(password)));
  return result.join('');
}

// 随机获取一个字符
const getRandomString = (arr) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index]; 
};

// 洗牌
const shuffle = (arr) => {
  let currentIndex = arr.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
  }
  return arr;
}

// 抽牌
const shuffle1 = (arr) => {
   let temp = [];
   for(let i = arr.length; i > 0; i--){
      let temRandom =  Math.floor(Math.random() * i);
      temp.push(arr[temRandom]);
      arr.splice(temRandom, 1); //抽取一张后，要除去这张牌，然后在剩下的牌中继续抽
   }
   return temp
}

onMounted(async () => {

});
</script>
