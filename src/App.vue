<template>
  <Tree class="tree" :root="node" @select="select" :selected="selected" />
</template>

<script setup>
import { ref } from 'vue'

import equal from 'fast-deep-equal'

import Tree from './components/Tree.vue'

const node_a = {
  name: 'lol',
  children: [],
}

const node_b = {
  name: 'magique',
  children: [node_a],
}

const node_c = {
  name: 'celeste',
  children: [node_b, node_a],
}

const node = {
  name: 'licorne',
  children: [node_c, node_b, node_a],
}

let selected = ref(null)

function select(path) {
  if (equal(selected.value, path)) selected.value = null
  else selected.value = path
}
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  display: flex;
}
</style>

<style scoped>
.tree {
  width: 100%;
  height: 100%;
  background-color: #269;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.5) 2px,
      transparent 2px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.5) 2px, transparent 2px),
    linear-gradient(rgba(255, 255, 255, 0.28) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.28) 1px, transparent 1px);
  background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
  background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
}
</style>
