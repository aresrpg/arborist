<template>
  <Suspense>
    <template #default>
      <Editor />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script setup>
import Editor from './views/Editor.vue'
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  display: flex;
}
</style>
