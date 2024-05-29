<template>
  <v-container>
    <v-date-picker color="primary" 
      :class="['rounded rounded-md w-100']" 
      show-adjacent-months
      show-week
      elevation="24"
      height="95vh"
      landscape
    >
    </v-date-picker>
  </v-container>
</template>

<script setup>
import { ref, shallowRef, reactive, onMounted } from 'vue'
onMounted(async () => {

});
</script>