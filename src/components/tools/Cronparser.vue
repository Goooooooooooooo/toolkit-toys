<template>
  <v-container fluid>
    <div class="text-h4 ma-4">
      {{ $t('menu.Cron Expression') }}
    </div>
    <p>
    Cron表达式是一种用于指定定时任务的时间表达式，常用来指定任务的执行时间、执行频率和执行间隔。它由6～7个字段组成，分别表示秒、分、时、日期、月份、星期、年份（可省略）。
    <pre>
      *    *    *    *    *    *      
      ┬    ┬    ┬    ┬    ┬    ┬
      │    │    │    │    │    │
      │    │    │    │    │    └ day of week (0 - 7, 1L - 7L) (0 or 7 is Sun)
      │    │    │    │    └───── month (1 - 12)
      │    │    │    └────────── day of month (1 - 31, L)
      │    │    └─────────────── hour (0 - 23)
      │    └──────────────────── minute (0 - 59)
      └───────────────────────── second (0 - 59, optional)
    </pre>
    </p>
    <!-- <v-sheet 
      color="transparent"
      :elevation="3"
      border
      rounded
    >
      <v-tabs v-model="tab" color="primary" grow>
        <v-tab
          v-for="(item, i) in tabItems"
            :key="item"
            :text="item"
            :value="item"
        ></v-tab>
      </v-tabs>

      <v-container v-for="item in tabItems" :key="item" v-show="tab == item">
        <v-radio-group v-model="radios">
          <v-radio :label="`每${item}`" value="every"></v-radio>
          <v-radio value="startAt">
            <template v-slot:label>
              <div class="d-flex align-center">
                从
                <v-select class="ma-2" 
                  :items="selectItems" 
                  density="compact" 
                  variant="outlined" 
                  color="primary"
                  hide-details
                ></v-select>{{ item }}
                开始, 每隔
                <v-select class="ma-2"
                  :items="selectItems"
                  density="compact"
                  variant="outlined"
                  color="primary"
                  hide-details
                ></v-select>{{ item }}执行一次
              </div>
            </template>
          </v-radio>
          <v-radio value="betweenAnd">
            <template v-slot:label>
              <div class="d-flex align-center">
                周期 从
                <v-select class="ma-2" 
                  :items="selectItems" 
                  density="compact" 
                  variant="outlined" 
                  color="primary"
                  hide-details
                ></v-select>
                - 到
                <v-select class="ma-2"
                  :items="selectItems"
                  density="compact"
                  variant="outlined"
                  color="primary"
                  hide-details
                ></v-select>
              </div>
            </template>
          </v-radio>
          <div>
            <v-radio value="muliple">
              <template v-slot:label>
                <div class="d-flex align-center">
                  Specific second (muliple selectable)
                  <v-text-field color="primary" hide-details
                    density="compact" clearable label="Label" variant="outlined"></v-text-field>
                </div>
              </template>
            </v-radio>
          </div>
        </v-radio-group>
      </v-container>
    </v-sheet> -->
    <p>
      逗号  （,）：用于分隔多个值。例如 1,3,5 在小时字段中表示 1 点、3 点和 5 点执行。<br/>
      斜线  （/）：用于指定间隔值。例如 */5 在分钟字段中表示每 5 分钟执行一次。<br/>
      连字符（-）：用于指定范围。例如 10-20 在日期字段中表示从 10 号到 20 号。<br/>
      问号  （?）：仅用于日期和星期几字段，表示不指定具体值。通常用于避免冲突。<br/>
    </p>
    <v-table style="margin-bottom: 50px;">
      <thead>
        <tr>
          <th class="text-left">场景</th>
          <th class="text-left">值</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in exsample" :key="item.name" 
          @click="clickItem(item)"
          :class="[{ 'bg-primary': isActive(item.value) }]"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </tbody>
    </v-table>
    <v-footer border="primary md" elevation="3" style="position: fixed; bottom: 2px;width: -webkit-fill-available;margin-right: 16px;">
      <v-sheet style="width: inherit;" class="d-flex align-content-center flex-wrap">
        <v-text-field class="ma-1"
          label="second"
          color="primary"
          density="compact"
          variant="outlined"
          v-model="cronObj.second"
          readOnly
          hide-details
        >
          <template v-slot:append-inner>秒</template>
        </v-text-field>
        <v-text-field class="ma-1"
          label="minute"
          color="primary"
          density="compact"
          variant="outlined"
          v-model="cronObj.minute"
          readOnly
          hide-details
        >
          <template v-slot:append-inner>分</template>
        </v-text-field>
        <v-text-field class="ma-1"
          label="hour(0 - 23)"
          color="primary"
          density="compact"
          variant="outlined"
          v-model="cronObj.hour"
          readOnly
          hide-details
        >
          <template v-slot:append-inner>时</template>
        </v-text-field>
        <v-text-field class="ma-1"
          label="day of month"
          color="primary"
          density="compact"
          variant="outlined"
          v-model="cronObj.dayOfMonth"
          readOnly
          hide-details
        >
          <template v-slot:append-inner>日</template>
        </v-text-field>
        <v-text-field class="ma-1"
          label="month"
          color="primary"
          density="compact"
          variant="outlined"
          v-model="cronObj.month"
          readOnly
          hide-details
        >
          <template v-slot:append-inner>月</template>
        </v-text-field>
        <v-text-field class="ma-1"
          label="day of week"
          color="primary"
          density="compact"
          variant="outlined"
          v-model="cronObj.dayOfWeek"
          readOnly
          hide-details
        >
          <template v-slot:append-inner>周</template>
        </v-text-field>
        <v-text-field class="ma-1" v-if="cronObj.year"
          label="year"
          color="primary"
          density="compact"
          variant="outlined"
          v-model="cronObj.year"
          readOnly
          hide-details
        >
          <template v-slot:append-inner>年</template>
        </v-text-field>
      </v-sheet>
    </v-footer>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const exsample = [
  {
    value: "*/5 * * * * ?",
    name: "每隔 5 秒执行一次",
    class: 'bg-primary'
  },
  {
    value: "0 */1 * * * ?",
    name: "每隔 1 分钟执行一次"
  },
  {
    value: "0 0 2 1 * ?",
    name: "每月 1 日的凌晨 2 点执行一次"
  },
  {
    value: "0 15 10 ? 6L ? 2002-2006",
    name: "2002 年至 2006 年的每个月的最后一个星期五上午 10:15 执行作业"
  },
  {
    value: "0 0 23 * * ?",
    name: "每天 23 点执行一次"
  },
  {
    value: "0 0 1 * * ?",
    name: "每天凌晨 1 点执行一次"
  },
  {
    value: "0 0 1 1 * ?",
    name: "每月 1 日凌晨 1 点执行一次"
  },
  {
    value: "0 0 23 L * ?",
    name: "每月最后一天 23 点执行一次"
  },
  {
    value: "0 0 1 ? * L",
    name: "每周星期天凌晨 1 点执行一次"
  },
  {
    value: "0 26,29,33 * * * ?",
    name: "在 26 分、29 分、33 分执行一次"
  },
  {
    value: "0 0 0,13,18,21 * * ?",
    name: "每天的 0 点、13 点、18 点、21 点都执行一次"
  },
  {
    value: "0 15 10 * * ?",
    name: "每天上午 10:15 触发"
  },
  {
    value: "0 15 10 * * ? 2005",
    name: "2005 年的每天上午 10:15 触发"
  },
  {
    value: "0 10,44 14 ? 3 WED",
    name: "每年三月的星期三的下午 2:10 和 2:44 触发"
  },
  {
    value: "0 15 10 ? * MON-FRI",
    name: "周一至周五的上午 10:15 触发"
  },
  {
    value: "0 15 10 15 * ?",
    name: "每月 15 日上午 10:15 触发"
  },
  {
    value: "0 15 10 L * ?",
    name: "每月最后一日的上午 10:15 触发"
  },
  {
    value: "0 15 10 ? * 6L",
    name: "每月的最后一个星期五上午 10:15 触发"
  },
  {
    value: "0 15 10 ? * 6L 2002-2005",
    name: "2002 年至 2005 年的每月的最后一个星期五上午 10:15 触发"
  },
  {
    value: "0 15 10 ? * 6#3",
    name: "每月的第三个星期五上午 10:15 触发"
  },
  {
    name: '每天中午12:00执行任务', value: '0 0 12 * * ?'
  },
  {
    name: '每天上午10:00点、下午14:00以及下午16:00执行任务',
    value: '0 0 10,14,16 * * ?'
  },
  {
    name: '每天上午09:00到下午17:00时间段内每隔半小时执行任务',
    value: '0 0/30 9-17 * * ?'
  },
  {
    name: '每天下午14:00到下午14:59时间段内每隔1分钟执行任务',
    value: '0 * 14 * * ?'
  },
  {
    name: '每天下午14:00到下午14:05时间段内每隔1分钟执行任务',
    value: '0 0-5 14 * * ?'
  },
  {
    name: '每天下午14:00到下午14:55时间段内每隔5分钟执行任务',
    value: '0 0/5 14 * * ?'
  },
  {
    name: '每天下午14:00到下午14:55、下午18:00到下午18:55时间段内每隔5分钟执行任务',
    value: '0 0/5 14,18 * * ?'
  },
  {
    name: '每个星期三中午12:00执行任务',
    value: '0 0 12 ? * WED'
  },
  {
    name: '2022年每天上午10:15执行任务',
    value: '0 15 10 ? * * 2022'
  },
  {
    name: '2022年每天下午14:00到下午14:55、下午18:00到下午18:55时间段内每隔5分钟执行任务',
    value: '0 0/5 14,18 * * ? 2022'
  },
  {
    name: '2022年至2023年每月第三个星期六上午10:15执行任务',
    value: '0 15 10 ? * 6#3 2022,2023'
  },
  {
    name: '2022年至2025年每天上午09:00到下午17:30时间段内每隔半小时执行任务',
    value: '0 0/30 9-17 * * ? 2022-2025'
  },
  {
    name: '从2022年开始，每隔两年3月的每个星期三下午14:10和14:44执行任务',
    value: '0 10,44 14 ? 3 WED 2022/2'
  }
];

const tab = ref('秒');
const radios = ref('');

const tabItems = [
  '秒', '分钟', '小时', '日', '月', '周'
];

const isActive = (value) => {
  const arr = value.split(' ');
  if (arr.length == 6) arr[6] = '*';
  return Object.values(cronObj.value).join(' ') === arr.join(' ');
};

const cronObj = ref({
  second: '*',
  minute: '*',
  hour: '*',
  dayOfMonth: '*',
  month: '*',
  dayOfWeek: '*',
  year: '*'
})

onMounted(() => {
})

const clickItem = (item) => {
  const arr = item.value.split(' ');
  if (arr.length == 6) arr[6] = '*';
  cronObj.value.second = arr[0];
  cronObj.value.minute = arr[1];
  cronObj.value.hour = arr[2];
  cronObj.value.dayOfMonth = arr[3];
  cronObj.value.month = arr[4];
  cronObj.value.dayOfWeek = arr[5];
  cronObj.value.year = arr[6];
}

const dateToCron = (date: Date) => {
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const days = date.getDate();
  const months = date.getMonth() + 1;
  const dayOfWeek = date.getDay();

  return `${minutes} ${hours} ${days} ${months} ${dayOfWeek}`;
};

const dateText = '2017-05-09T01:30:00.123Z';
const date = new Date(dateText);

const cron = dateToCron(date);
// console.log(cron); //30 5 9 5 2

function getCreateWeeklyFromStartDate(startDate: Date): string {
  const startWeekday = startDate.getDay();
  const startHour = startDate.getHours();
  const startMinute = startDate.getMinutes();
  const cronExpression = `${startMinute} ${startHour} * * ${startWeekday}`;
  return cronExpression; 
}

function getCreateMonthlyFromStartDate(startDate: Date): string {
  const startDayOfMonth = startDate.getDate();
  const startHour = startDate.getHours();
  const startMinute = startDate.getMinutes();
  const cronExpression = `${startMinute} ${startHour} ${startDayOfMonth} * *`;
  return cronExpression;
}

function getCreateAnnualFromStartDate(startDate: Date): string {
  const startMonth = startDate.getMonth() + 1;
  const startDayOfMonth = startDate.getDate();
  const startHour = startDate.getHours();
  const startMinute = startDate.getMinutes();
  const cronExpression = `${startMinute} ${startHour} ${startDayOfMonth} ${startMonth} *`;
  return cronExpression;
}
</script>