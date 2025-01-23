<template>
    <v-container>
    <div class="text-h4 ma-4">
      {{ $t('menu.Password Note') }}
    </div>
    <v-row no-gutters>
      <v-col cols="12" class="ma-4 pa-2 mb-0">
        <v-dialog v-model="dialog" max-width="600">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn class="text-none font-weight-regular" 
              prepend-icon="mdi-plus-box" 
              text="ADD" 
              color="primary"
              variant="tonal" 
              v-bind="activatorProps"></v-btn>
          </template>
          <v-card>
            <v-card-title>
              <div class="text-h5 text-primary font-weight-medium">
                <v-icon icon="mdi-plus-box"></v-icon>
                New Item
              </div>
            </v-card-title>
            <v-card-text>
              <v-text-field color="primary" hint="enter acccount name" label="name" v-model="tempModel.NAME"></v-text-field>
              <v-text-field color="primary" hint="enter account id" label="id" v-model="tempModel.ID"></v-text-field>
              <v-text-field color="primary" label="Password" type="password" v-model="tempModel.PW"></v-text-field>
              <small class="text-caption text-medium-emphasis">*indicates required field</small>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" :text="$t('Close')" variant="plain" @click="dialog = false"></v-btn>
              <v-btn color="primary" :text="$t('Save')" variant="tonal" @click="dialog = false;addItem()"></v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col cols="12">
        <div class="d-flex pa-3 align-content-center justify-start flex-wrap">
          <v-card v-for="(item, i) of pwList" :key="i" 
            class="ma-2 pa-2 text-primary" 
            width="300"
            >
            <v-card-actions>
              <div class="text-h6 font-weight-medium">
                {{ item.NAME }}
              </div>
              <v-spacer></v-spacer>
              <v-icon icon="mdi-close" @click="removeItem(item)"></v-icon>
            </v-card-actions>

            <v-card-text class="pa-2">
              <div class="text-body-1 border-md rounded border-primary d-flex ma-1 px-2 align-center cursor-pointer" 
                @click="copyText(item.ID)">
                <div class="ma-1 me-auto">{{ item.ID }}</div>
                <v-icon icon="mdi-content-copy" size="small"></v-icon>
              </div>

              <v-divider style="color: transparent;" :thickness="6"></v-divider>

              <div class="text-body-1 border-md rounded border-primary d-flex ma-1 px-2 align-center cursor-pointer" 
                @click="copyText(item.PW)">
                <div class="ma-1 me-auto">********</div>
                <v-icon icon="mdi-content-copy" size="small"></v-icon>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, shallowRef, reactive, onMounted } from 'vue'
import Database from "tauri-plugin-sql-api";
import simpleAlert from '@/utils/simplealert';
import useCurrentInstance from "@/hooks/useCurrentInstance"
const { proxy } = useCurrentInstance();
const dialog = shallowRef(false)
const tempModel = reactive({ NO: 0, NAME: '', ID: '', PW: '' })
const pwList = ref([]);

let sqliteDB;
onMounted(async () => {
  sqliteDB = await Database.load("sqlite:pwstore.db");
  const result1 = await sqliteDB.select("SELECT * FROM pwstore");
  pwList.value = result1;
});

async function removeItem(item) {
  console.log(item);
  const result = await sqliteDB.execute("DELETE FROM pwstore WHERE NO = $1", [item.NO]);
  if (result) {
    pwList.value = pwList.value.filter(e => e.NO !== item.NO);
  }
}

function copyText(text) {
  proxy.$globalUtils.writeClipboardText(text); 
  simpleAlert.success('复制成功', {duration: 3000});
}

async function updateItem() {
  const result = await sqliteDB.execute(
    "UPDATE pwstore SET NAME = $1, ID = $2, PW = $3 WHERE NO = $4", 
    [item.NAME, item.ID, item.PW, item.NO]);
  const result1 = await sqliteDB.select("SELECT * FROM pwstore");
  console.log(result);
  pwList.value = result1;
}

async function addItem() {
  tempModel.NO = pwList.value.length;
  const result = await sqliteDB.execute(
  "INSERT into pwstore (name, id, pw) VALUES ($1, $2, $3)",
  [tempModel.NAME, tempModel.ID, tempModel.PW]
  );
  console.log(result);
  pwList.value.push({...tempModel});
  tempModel.NAME = '';
  tempModel.ID = '';
  tempModel.PW = '';
}
</script>
