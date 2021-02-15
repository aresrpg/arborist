<template>
  <Tree class="tree" :root="tree" />
</template>

<script setup>
import Tree from '../components/Tree.vue'

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

const tree = parseNode(
  new DOMParser().parseFromString(trees[0].tree, 'text/xml').documentElement
)
</script>

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
