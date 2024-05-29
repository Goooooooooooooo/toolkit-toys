<template>
    <v-sheet style="overflow: auto;" class="d-flex"
      border
      height="'auto'"
      :min-height="minHeight"
      :max-height="maxHeight"
      rounded
    >
      <textarea
        :id="`code-editor-${currentTimeStamp}`"
        v-model="currentCode"
      >
      </textarea>
      <v-btn 
        class="ma-1 v-field_clearable" 
        color="primary" 
        width="20"
        height="20" 
        icon="mdi-close" 
        variant="text"
        @click="clearEditor"
      >
      </v-btn>
    </v-sheet>
</template>

<script setup>
import { onMounted, ref, watch, toRefs } from 'vue'
import '@/cm5/lib/codemirror.js'
import '@/cm5/lib/codemirror.css'
import '@/cm5/mode/sql/sql.js'
import '@/cm5/mode/javascript/javascript.js'
import '@/cm5/theme/funtoolkits.css'
import '@/cm5/addon/hint/sql-hint.js'
import '@/cm5/addon/hint/show-hint.js'
import '@/cm5/addon/hint/show-hint.css'
import '@/cm5/addon/edit/matchbrackets.js'
import '@/cm5/addon/comment/comment.js'
import '@/cm5/addon/selection/active-line.js'
import '@/cm5/addon/hint/javascript-hint.js'

const modes = {
  'json' : 'application/json',
  'javascript': 'javascript',
  'sql': 'text/x-sql'
}

let cme = null
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: 'javascript'
  },
  readOnly: {
    type: Boolean,
    default: false
  },
  needWatch: {
    type: Boolean,
    default: true
  }, // 此处是为了解决多个codemirror来回显示，值错乱问题；设置成false，不会自动更新值，需要父组件手动赋值
  lineNumbers: {
    type: Boolean,
    default: true
  }, // 缩进
  indentUnit: {
    type: Number,
    default: 2
  },
  minHeight: {
    type: String,
    default: 'auto'
  },
  maxHeight: {
    type: String,
    default: 'auto'
  }
})
const emit = defineEmits(['onBlur', 'update:modelValue']);
const { minHeight, maxHeight } = toRefs(props);
const currentCode = ref('');

// 确保codemirror唯一
const currentTimeStamp = new Date().getTime()

watch(props, (newProps) => {
  if (cme && props.needWatch) {
    if (newProps.modelValue !== currentCode.value) {
      currentCode.value = newProps.modelValue
      cme.setValue(newProps.modelValue)
    }
  }
});

onMounted(() => {
  cme = CodeMirror.fromTextArea(
    document.getElementById(`code-editor-${currentTimeStamp}`),
    {
      lineNumbers: props.lineNumbers,
      mode: modes[props.language],
      lineWrapping: true,
      readOnly: props.readOnly,
      autoRefresh: true,
      //设置主题
      theme: "funtoolkits",
      indentUnit: props.indentUnit,
      styleActiveLine: true, // 当前行高亮
      matchBrackets: true,
    }
  );
  // console.log("🚀 ~ codeEditor.on ~ codeEditor:", cme)

  // 失去焦点监听
  cme.on('blur', (instance, event) => {
    emit('onBlur')
  })

  cme.on("beforeChange", function(instance, change) {
    if (change.origin === "paste") {
      // 在这里处理粘贴事件
      // console.log("粘贴事件触发了！");
      emit('update:modelValue');
    }
  });

  if (props.needWatch) {
    currentCode.value = props.modelValue
    cme.setValue(props.modelValue || '')
  }
})

// 获取codemirror值
const getValue = () => {
  if (cme) {
    return cme.getValue();
  }
  return '';
}

// 给codemirror赋值
const setValue = (newValue) => {
  if (cme) {
    currentCode.value = newValue;
    cme.setValue(newValue);
  }
}

// 获取codemirror选中
const getSelection = () => {
  if (cme) {
    return cme.getSelection();
  }
  return null;
}

// 手动刷新codemirror
const refresh = () => {
  if (cme) {
    cme.refresh();
  }
}

const clearEditor = () => {
  if (cme) {
    cme.setValue('');
  }
}

defineExpose({
  setValue,
  getValue,
  getSelection,
  refresh,
  clearEditor
});

/**
在构造editor时相关的属性大多数都可以动态的指定。如设置显示行号可以不在构造editor时指出，
只需构造出editor之后，调用editor.setOption("lineNumbers",true)
即可，更改主题也类似的用editor.setOption("theme","seti")
即可，非常方便。
可以用 editor.getOption("属性名")

来获取editor某属性的值，在本例中editor.getOption("theme")
将返回"seti"

无法用js的DOM操作获取编辑器中的值，但可以用editor.getValeu()
获得其中的值，editor.setValue("value")
来设置其中的值

可以自定义编辑器的大小，只需设置如下样式即可：
<style type="text/css">
  .CodeMirror{border:1px solid black;font- size:15px;width:100px;height:100px}
</style>
在extra中可绑定函数到按键上，例如：
  var editor=CodeMirror.fromTextArea(document.getElementById("code"),{
        mode:"text/x-java",
    extraKeys:{
    "Ctrl-Space":"autocomplete",
    "Ctrl-F7":function () {
      alert("绑定了Ctrl-F7");
    },
    "Shift-Alt-Enter": function (cm) {
      cm.setOption("fullScreen", !cm.getOption("fullScreen"));
    }
  }
});

*/

</script>
<style>
.v-field_clearable {
  opacity: 0;
}
.CodeMirror:hover + .v-field_clearable,
.v-field_clearable:hover {
  opacity: 1;
}
</style>