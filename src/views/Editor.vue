<template>
  <main class="w-full flex flex-row">
    <Sidebar
      class="w-2/12"
      :items="trees.map(({ name }) => name)"
      :selected="selectedTree"
      @select="(i) => (selectedTree = i)"
    />
    <div class="w-full flex flex-col">
      <Toolbar :instances="trees[selectedTree].instances" />
      <Tree
        class="w-full h-full tree bg-green-700"
        :root="tree"
        @select="select"
        :selected="selected"
      />
    </div>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import equal from 'fast-deep-equal'

import Tree from '../components/Tree.vue'
import Sidebar from '../components/Sidebar.vue'
import Toolbar from '../components/Toolbar.vue'

const trees = await fetch('http://127.0.0.1:4242/behavior').then((res) =>
  res.json()
)

function parseNode(node) {
  return {
    name: node.tagName,
    children: Array.from(node.childNodes)
      .filter((child) => child.nodeType === Node.ELEMENT_NODE)
      .map(parseNode),
  }
}

let selectedTree = ref(0)

const tree = computed(() => ({
  name: `Root (${trees[selectedTree.value].id})`,
  children: [
    parseNode(
      new DOMParser().parseFromString(
        trees[selectedTree.value].tree,
        'text/xml'
      ).documentElement
    ),
  ],
}))

let selected = ref(null)

function select(path) {
  if (equal(selected.value, path)) selected.value = null
  else selected.value = path
}
</script>

<style scoped>
.tree {
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
