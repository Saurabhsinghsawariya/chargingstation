<template>
  <div :class="darkMode ? 'dark' : ''" class="min-h-screen bg-gray-900 text-white relative overflow-hidden">
    <router-view />
  </div>
</template>

<script>
import { provide, ref } from 'vue';

export default {
  setup() {
    const darkMode = ref(true);
    provide('darkMode', darkMode);
    return { darkMode };
  }
};
</script>
