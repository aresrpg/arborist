<template>
  <Suspense>
    <template #default>
      <router-view></router-view>
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script setup></script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  display: flex;
}
</style>
