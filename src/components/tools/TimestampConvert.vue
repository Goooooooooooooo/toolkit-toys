<template>
  <v-container>
    <div class="text-h4 ma-4">
      Unix 时间戳转换工具
    </div>
    <div class="text-h5 ml-4">时区</div>
    <v-combobox class="ma-4 pa-1"
      density="compact"
      hide-details
      variant="outlined"
      color="primary"
      item-color="primary"
      :items="timezoneList"
      v-model="localTimezone"
      @update:model-value="onChangeByTimezone"
    >
    <template v-slot:prepend-inner>
        <v-icon color="accent">mdi-map-clock</v-icon>
    </template>
    </v-combobox>
    <v-card class="ma-4 pa-1">
      <v-card-title>
        {{ `当地日期时间: ${utcDateObjRef.localTimeString}` }}
      </v-card-title>
      <v-card-title>
        {{ `世界标准时间 (UTC): ${utcDateObjRef.utcTimeString}` }}
      </v-card-title>
    </v-card>

    <div class="text-h5 ml-4">时间戳</div>
    <v-text-field class="ma-4 pa-1" 
      v-model="dateObjRef.timestamp"
      color="primary"
      density="compact"
      variant="outlined"
      type="text"
      :center-affix="true"
      hide-details
      @update:model-value="onChangeByTimestamp(dateObjRef.timestamp)"
      @paste="onChangeByTimestamp(dateObjRef.timestamp)"
    >
      <template v-slot:prepend-inner>
        <v-icon color="accent">mdi-clock-time-one-outline</v-icon>
      </template>
      <template v-slot:append>
        <v-btn class="ma-1"
          color="primary"
          @click="pasteText()"
          >
          粘贴
        </v-btn>
        <v-btn
          color="primary"
          @click="copyText(dateObjRef.timestamp)"
          >
          复制
        </v-btn>
      </template>
    </v-text-field>
    <!-- 年月日时分秒 -->
    <div class="ma-3 pa-2">
      <v-row>
      <v-col col="3">
        <v-btn
          color="primary"
          @click="getNowDate()"
          >
          当前时间
        </v-btn>
      </v-col>
      <v-col col="3">
        <v-btn
          color="primary"
          @click="copyFormatDateText()"
          >
          复制时间(YYYY/MM/DD HH:mm:ss)
        </v-btn>
      </v-col>
      </v-row>
      <v-row>
        <v-col cols="'auto'" lg="2" md="2" sm="4" xs="6">
          <v-text-field
            label="Year"
            color="primary"
            density="compact"
            variant="outlined"
            v-model="dateObjRef.fullYear"
            @change="onChangeByDateInput()"
          >
            <template v-slot:append-inner>年</template>
          </v-text-field>
        </v-col>

        <v-col cols="'auto'" lg="2" md="2" sm="4" xs="6">
          <v-text-field
            label="Month"
            color="primary"
            density="compact"
            variant="outlined"
            v-model="dateObjRef.month"
            @change="onChangeByDateInput()"
          >
            <template v-slot:append-inner>月</template>
          </v-text-field>
        </v-col>

        <v-col cols="'auto'" lg="2" md="2" sm="4" xs="6">
          <v-text-field
            label="Day"
            color="primary"
            density="compact"
            variant="outlined"
            v-model="dateObjRef.day"
            @change="onChangeByDateInput()"
          >
            <template v-slot:append-inner>日</template>
          </v-text-field>
        </v-col>

        <v-col cols="'auto'" lg="2" md="2" sm="4" xs="6">
          <v-text-field
            label="Hour (24 hour)"
            color="primary"
            density="compact"
            variant="outlined"
            v-model="dateObjRef.hours"
            @change="onChangeByDateInput()"
          >
            <template v-slot:append-inner>时</template>
          </v-text-field>
        </v-col>

        <v-col cols="'auto'" lg="2" md="2" sm="4" xs="6">
          <v-text-field
            label="Minutes"
            color="primary"
            density="compact"
            variant="outlined"
            v-model="dateObjRef.minutes"
            @change="onChangeByDateInput()"
          >
            <template v-slot:append-inner>分</template>
          </v-text-field>
        </v-col>

        <v-col cols="'auto'" lg="2" md="2" sm="4" xs="6">
          <v-text-field
            label="Seconds"
            color="primary"
            density="compact"
            variant="outlined"
            v-model="dateObjRef.seconds"
            @change="onChangeByDateInput()"
          >
            <template v-slot:append-inner>秒</template>
          </v-text-field>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import moment from 'moment';
import { timezones } from "@/config/timezones.js";
import useCurrentInstance from "@/hooks/useCurrentInstance"
const { proxy } = useCurrentInstance();

// 时区列表
const timezoneList = timezones.map(zone => zone['text-zh']);
// 保存选中的时区
const localTimezone = ref();
// 时间对象
const dateObjRef = ref<DateItem>(setDateObj(moment()));
// 包含UTC时间的对象
const utcDateObjRef = ref<DateItem>(setDateObj(moment(), true));

onMounted(async () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  localTimezone.value = timezones.find(zone => zone.timezone === timezone)?.['text-zh'];
});

/**
 * 获取选中timezone 偏移量
 * @param timezone - 时区
 */
function getOffset(timezone?: string): number {
  if (!timezone) {
    const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timezones.find(zone => zone.timezone === defaultTimezone)?.offset || 0;
  }
  return timezones.find(zone => zone['text-zh'] === timezone)?.offset || 0;
}

/**
 * 更新当前显示时间（本地，UTC）
 */
function getNowDate(): void {
  const now = moment().utcOffset(getOffset(localTimezone.value));
  dateObjRef.value = setDateObj(now);
  utcDateObjRef.value = setDateObj(now, true);
}

/**
 * 根据选择的时区更新显示时间
 */
function onChangeByTimezone() {
  const offset = getOffset(localTimezone.value);
  const d = moment(utcDateObjRef.value.timestamp).utcOffset(offset);
  dateObjRef.value = setDateObj(d);
  
}

/**
 * 根据时间戳更新显示时间
 * @param timestamp - 时间戳
 */
function onChangeByTimestamp(timestamp: number): void {
  // console.log(new Date(+dateObjRef.value.timestamp));
  dateObjRef.value = setDateObj(moment(+timestamp));
}

// 根据日期更新显示时间
function onChangeByDateInput() {
  const d = dateObjRef.value;
  const newD = moment(
    `${d.fullYear}-${d.month}-${d.day} ${d.hours}:${d.minutes}:${d.seconds}`,
    'YYYY-MM-DD HH:mm:ss'
  );
  dateObjRef.value = setDateObj(newD);
}

// 复制文本（格式化时间）
async function copyFormatDateText() {
  const d = dateObjRef.value;
  const newD = moment(
    `${d.fullYear}/${d.month}/${d.day} ${d.hours}:${d.minutes}:${d.seconds}`,
    'YYYY/MM/DD HH:mm:ss'
  );
  await copyText(newD.format('YYYY/MM/DD HH:mm:ss'));
}

// 复制文本
async function copyText(value: any) {
  await proxy.$globalUtils.writeClipboardText(String(value));
}

// 粘贴文本
async function pasteText() {
  // console.log(await proxy.$globalUtils.readClipboardText());
  const timestamp = +(await proxy.$globalUtils.readClipboardText());
  onChangeByTimestamp(timestamp);
}

/**
 * 生成时间对象
 * @param date - moment 时间对象
 * @param isUTC - UTC 模式
 */
function setDateObj(date: moment.Moment, isUTC: boolean = false): DateItem {
  if (isUTC) date = date.utc(); // UTC 模式
  return {
    fullYear: date.year(),
    month: date.month() + 1,
    day: date.date(),
    hours: date.hour(),
    minutes: date.minute(),
    seconds: date.second(),
    milliseconds: date.millisecond(),
    timestamp: date.valueOf(),
    utcTimeString: date.format('YYYY-MM-DD HH:mm:ss'),
    localTimeString: moment().format('YYYY-MM-DD HH:mm:ss'),
    offset: 'UTC+' + date.utcOffset()
  }
}

interface DateItem {
  fullYear: number,
  month: number,
  day: number,
  hours: number,
  minutes: number,
  seconds: number,
  milliseconds: number,
  timestamp: number,
  utcTimeString: string,
  localTimeString: string,
  offset: string
}
</script>
