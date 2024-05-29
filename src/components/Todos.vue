<template>
  <v-container class="todoapp">
    <v-text-field
      v-model="newTodo"
      label="What needs to be done?"
      variant="solo"
      @keydown.enter="addTodo"
    >
      <template v-slot:append-inner>
        <v-fade-transition>
          <v-btn
            v-show="newTodo"
            icon="mdi-plus-circle"
            variant="text"
            @click="addTodo"
          ></v-btn>
        </v-fade-transition>
      </template>
    </v-text-field>

    <h2 class="text-h4 text-success ps-4">
      Todos:&nbsp;
      <v-fade-transition leave-absolute>
        <span :key="`todos-${todos.length}`">
          {{ todos.length }}
        </span>
      </v-fade-transition>
    </h2>
    <v-divider class="mt-2"></v-divider>
    <v-row
      align="center"
      class="my-1 ml-5"
    >
      <v-chip-group
        column
        selected-class="text-primary"
      >
        <v-chip class="ma-1" label @click="onHashChange('all')">
          All
        </v-chip>
        <v-chip class="ma-1" label @click="onHashChange('active')">
          Active
        </v-chip>
        <v-chip class="ma-1" label @click="onHashChange('completed')">
          Completed
        </v-chip>
        <v-chip class="ma-1" label 
          v-show="todos.length > remainingtodos"
          @click="removeCompleted"
        >
          Clear
        </v-chip>
      </v-chip-group>
    </v-row>

    <v-divider></v-divider>

    <v-row
      align="center"
      class="my-1"
    >
      <v-checkbox-btn class="ml-7" v-show="todos.length > 0" 
        color="info"
        label="全选"
        :checked="remainingtodos === 0"
        @change="toggleAll"
      ></v-checkbox-btn>
      <strong class="mx-4 text-info-darken-2">
        Remaining: {{ remainingtodos }}
      </strong>

      <v-divider vertical></v-divider>

      <strong class="mx-4 text-success-darken-2">
        Completed: {{ completedtodos }}
      </strong>
      <v-progress-circular
        v-model="progress"
        class="me-2"
      ></v-progress-circular>
    </v-row>

    <v-divider class="mb-2"></v-divider>

    <v-card v-if="todos.length > 0">
      <v-slide-y-transition
        class="py-0"
        tag="v-list"
        group
      >
        <template v-for="(todo, i) in filteredTodos" :key="todo.id">
            <v-divider
              v-if="i !== 0"
              :key="`${i}-divider`"
            ></v-divider>
            <v-list-item class="v-todo_item" @click="todo.completed = !todo.completed">
              <template v-slot:prepend>
                <v-checkbox-btn v-model="todo.completed" color="primary"></v-checkbox-btn>
              </template>

              <v-list-item-title>
                <span :class="todo.completed ? 'text-grey completed' : 'text-primary'"
                >{{ todo.text }}</span>
              </v-list-item-title>

              <template v-slot:append>
                  <v-icon v-if="todo.completed" color="success">
                    mdi-check
                  </v-icon>
                <v-icon class="v-todo_delete" icon="mdi-close" @click="removeTodo(todo)" />
              </template>
            </v-list-item>
        </template>
      </v-slide-y-transition>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, onUnmounted } from 'vue'
import { toolkitsHelper, TodoType } from '@/config/toolkitsHelper'
import eventBus from '@/utils/event-bus';

// 状态
const todos = ref([]);
const visibility = ref('all')
const editedTodo = ref()
const newTodo = ref(null)

onMounted(() => {
  const { todoList } = toolkitsHelper.getTodos();
  if (todoList && todoList.length > 0) {
    todos.value = todoList;
  }

  const stop = watchEffect(() => {
    localStorage.setItem(toolkitsHelper._todo_stora_key, JSON.stringify(todos.value))
    // console.log("🚀 ~ watchEffect ~ localStorage:", JSON.stringify(todos.value))
    eventBus.$emit('update-todo-size', remainingtodos.value) // 更新未完成代办事项件数
  });

  // 在组件卸载时停止监听
  onUnmounted(stop);
});

const completedtodos = computed(() => {
  return todos.value.filter(todo => todo.completed).length
})
const progress = computed(() => {
  return completedtodos.value / todos.value.length * 100
})
const remainingtodos = computed(() => {
  return todos.value.length - completedtodos.value
})

const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.completed),
  completed: (todos) => todos.filter((todo) => todo.completed)
}

// 获取的状态
const filteredTodos = computed(() => filters[visibility.value](todos.value))

function addTodo(): void {
  todos.value.push({
    id: Date.now(),
    text: newTodo.value,
    completed: false,
  })
  newTodo.value = null
}

function toggleAll(e) {
  todos.value.forEach((todo) => (todo.completed = e.target.checked))
}

function removeTodo(todo) {
  todos.value.splice(todos.value.indexOf(todo), 1)
}

let beforeEditCache = ''
function editTodo(todo) {
  beforeEditCache = todo.title
  editedTodo.value = todo
}

function cancelEdit(todo) {
  editedTodo.value = null
  todo.title = beforeEditCache
}

function doneEdit(todo) {
  if (editedTodo.value) {
    editedTodo.value = null
    todo.title = todo.title.trim()
    if (!todo.title) removeTodo(todo)
  }
}

function removeCompleted() {
  todos.value = filters.active(todos.value)
}

function onHashChange(route: string) {
  // const route = window.location.hash.replace(/#\/?/, '')
  if (filters[route]) {
    visibility.value = route
  } else {
    // window.location.hash = ''
    visibility.value = 'all'
  }
}
</script>

<style scoped>
.v-todo_delete {
  opacity: 0;
}
.v-list-item:hover .v-todo_delete,
.v-todo_delete:hover {
  opacity: 1;
}
.v-todo_delete:hover {
  color: rgb(var(--v-theme-primary));
}
.completed {
  text-decoration: line-through;
}
a {
  color: rgb(var(--v-theme-on-code));
  text-decoration: none;
}

.v-list-item-title {
  white-space: normal;
}
</style>