<template>
  <component :is="node.component" :node="node" />
  <template v-for="(child, i) in node.children" :key="i">
    <path
      stroke="black"
      fill="none"
      stroke-width="2"
      :d="connector(node, child)"
    />
    <ConnectedNode :is="child.component" :node="child" />
  </template>
</template>

<script setup>
import { defineProps } from 'vue'

const { node } = defineProps({
  node: Object,
})

function connector(first, second) {
  const from_x = first.x + first.width
  const from_y = first.y + first.height / 2
  const to_x = second.x
  const to_y = second.y + second.height / 2

  const margin = to_x - from_x

  return `M ${from_x},${from_y} h ${margin / 2} V ${to_y} h ${margin / 2}`
}
</script>
